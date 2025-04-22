
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

let classifier: any = null;
let deviceType: 'cpu' | 'webgpu' = 'cpu';

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

export const initializeModel = async () => {
  if (!classifier) {
    try {
      // Check for WebGPU support
      const hasWebGPU = await checkWebGPUSupport();
      deviceType = hasWebGPU ? 'webgpu' : 'cpu';
      
      console.log(`Initializing model on ${deviceType}`);
      
      // Configure transformers.js
      env.useBrowserCache = true;
      env.allowLocalModels = false;

      classifier = await pipeline(
        'zero-shot-classification',
        'facebook/bart-large-mnli',
        { device: deviceType }
      );
      
      console.log('Model initialized successfully');
    } catch (error) {
      console.error('Error initializing model:', error);
      // Fallback to CPU if WebGPU initialization fails
      if (deviceType === 'webgpu') {
        console.log('Falling back to CPU');
        deviceType = 'cpu';
        classifier = await pipeline(
          'zero-shot-classification',
          'facebook/bart-large-mnli',
          { device: 'cpu' }
        );
      } else {
        throw error;
      }
    }
  }
  return classifier;
};

export const predictDisease = async (symptoms: string[]) => {
  if (!symptoms.length) {
    throw new Error("Please select at least one symptom for analysis");
  }

  console.log(`Running prediction on ${deviceType}`);
  const model = await initializeModel();
  
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
        description: DISEASES.find(d => d.name === label)?.description || ''
      }))
      .filter(pred => pred.probability > 20)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);

    if (predictions.length === 0) {
      throw new Error("No strong matches found for the provided symptoms");
    }

    console.log('Final predictions:', predictions);
    return predictions;
  } catch (error) {
    console.error('Prediction error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error analyzing symptoms");
  }
};
