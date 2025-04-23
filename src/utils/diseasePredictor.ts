
import { pipeline, env } from '@huggingface/transformers';
import { DISEASES } from '@/data/diseases';

// Add TypeScript interface for WebGPU
interface GPUDevice {}

interface GPU {
  requestAdapter(): Promise<{
    requestDevice(): Promise<GPUDevice>;
  } | null>;
}

// Extend Navigator interface to include gpu property
declare global {
  interface Navigator {
    gpu?: GPU;
  }
}

// Available models for disease prediction
export const AI_MODELS = {
  GENERAL: {
    name: "General Purpose Model",
    id: "facebook/bart-large-mnli",
    description: "A general-purpose language model for text classification"
  },
  MEDICAL: {
    name: "Medical Specialized Model",
    id: "medicalai/ClinicalBERT", // example - would need to be replaced with an actual medical model
    description: "A model fine-tuned on medical text for better diagnosis accuracy"
  }
};

type ModelType = keyof typeof AI_MODELS;

let classifier: any = null;
let deviceType: 'wasm' | 'webgpu' = 'wasm';
let currentModelType: ModelType = 'GENERAL';

// Fallback diseases and their specialists
const FALLBACK_DISEASES = [
  { name: "Diabetes", specialist: "Endocrinologist" },
  { name: "Asthma", specialist: "Pulmonologist" },
  { name: "Migraine", specialist: "Neurologist" },
  { name: "Anemia", specialist: "Hematologist" },
  { name: "Fever", specialist: "General Physician" }
];

// Check for WebGPU support
const checkWebGPUSupport = async (): Promise<boolean> => {
  if (!navigator.gpu) {
    console.log('WebGPU is not supported in this browser');
    return false;
  }

  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      console.log('No WebGPU adapter found');
      return false;
    }
    console.log('WebGPU is supported');
    return true;
  } catch (error) {
    console.log('Error checking WebGPU support:', error);
    return false;
  }
};

// Get a random fallback disease when prediction fails
const getRandomFallbackDisease = () => {
  const randomIndex = Math.floor(Math.random() * FALLBACK_DISEASES.length);
  return FALLBACK_DISEASES[randomIndex];
};

export const initializeModel = async (modelType: ModelType = 'GENERAL') => {
  // If we're trying to use the same model that's already loaded, return it
  if (classifier && currentModelType === modelType) {
    return classifier;
  }
  
  try {
    // Check for WebGPU support
    const hasWebGPU = await checkWebGPUSupport();
    deviceType = hasWebGPU ? 'webgpu' : 'wasm';
    
    console.log(`Initializing ${AI_MODELS[modelType].name} on ${deviceType}`);
    
    // Configure transformers.js
    env.useBrowserCache = true;
    env.allowLocalModels = false;

    // Load the selected model
    classifier = await pipeline(
      'zero-shot-classification',
      AI_MODELS[modelType].id,
      { device: deviceType }
    );
    
    currentModelType = modelType;
    console.log(`Model ${AI_MODELS[modelType].name} initialized successfully`);
  } catch (error) {
    console.error('Error initializing model:', error);
    throw error;
  }
  
  return classifier;
};

export const predictDisease = async (symptoms: string[], modelType: ModelType = 'GENERAL') => {
  if (!symptoms.length) {
    throw new Error("Please select at least one symptom for analysis");
  }

  console.log(`Running prediction with ${AI_MODELS[modelType].name} on ${deviceType}`);
  let model;
  
  try {
    model = await initializeModel(modelType);
  } catch (error) {
    console.error('Model initialization failed, using fallback:', error);
    const fallback = getRandomFallbackDisease();
    return [{
      name: fallback.name,
      probability: 85,
      specialist: fallback.specialist,
      description: `Based on fallback prediction due to model error. Please consult with a ${fallback.specialist} for accurate diagnosis.`,
      isFallback: true
    }];
  }
  
  const symptomText = symptoms.join(', ');
  console.log('Processing symptoms:', symptomText);
  
  const candidateLabels = DISEASES.map(disease => disease.name);

  try {
    console.log('Starting prediction...');
    const result = await model(symptomText, candidateLabels);
    console.log('Raw prediction results:', result);
    
    const predictions = result.labels
      .map((label: string, index: number) => ({
        name: label,
        probability: Math.round(result.scores[index] * 100),
        specialist: DISEASES.find(d => d.name === label)?.specialist || 'General Physician',
        description: DISEASES.find(d => d.name === label)?.description || '',
        isFallback: false
      }))
      .filter(pred => pred.probability > 20)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);

    if (predictions.length === 0) {
      const fallback = getRandomFallbackDisease();
      return [{
        name: fallback.name,
        probability: 75,
        specialist: fallback.specialist,
        description: 'No strong matches found. Using fallback prediction.',
        isFallback: true
      }];
    }

    console.log('Final predictions:', predictions);
    return predictions;
  } catch (error) {
    console.error('Prediction error:', error);
    const fallback = getRandomFallbackDisease();
    return [{
      name: fallback.name,
      probability: 80,
      specialist: fallback.specialist,
      description: 'Error in prediction process. Using fallback diagnosis.',
      isFallback: true
    }];
  }
};

// Function to get currently active model info
export const getCurrentModelInfo = () => {
  return {
    name: AI_MODELS[currentModelType].name,
    id: AI_MODELS[currentModelType].id,
    description: AI_MODELS[currentModelType].description,
    deviceType: deviceType
  };
};
