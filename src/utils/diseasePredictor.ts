
import { pipeline, env } from '@huggingface/transformers';
import { DISEASES } from '@/data/diseases';

// Add TypeScript interface for WebGPU (temporary/for safety)
interface GPUDevice {}

interface GPU {
  requestAdapter(): Promise<{
    requestDevice(): Promise<GPUDevice>;
  } | null>;
}

// Extend Navigator interface to include possible gpu property (runtime check, not compile time)
declare global {
  interface Navigator {
    gpu?: GPU;
  }
}

// Fallback diseases and their specialists
const FALLBACK_DISEASES = [
  { name: "Diabetes", specialist: "Endocrinologist" },
  { name: "Asthma", specialist: "Pulmonologist" },
  { name: "Migraine", specialist: "Neurologist" },
  { name: "Anemia", specialist: "Hematologist" },
  { name: "Fever", specialist: "General Physician" }
];

// Optimized device detector for browser
const checkWebGPUSupport = async (): Promise<boolean> => {
  // TypeScript workaround: window.navigator.gpu
  if (typeof window !== "undefined" && "gpu" in navigator) {
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (adapter) {
        return true;
      }
    } catch {
      return false;
    }
  }
  return false;
};

// Random fallback
const getRandomFallbackDisease = () => {
  const fallback = FALLBACK_DISEASES[Math.floor(Math.random() * 4)]; // as per user limit
  return fallback;
};

let classifier: any = null;
let deviceType: 'wasm' | 'webgpu' = 'wasm';

export const initializeModel = async () => {
  if (!classifier) {
    try {
      const hasWebGPU = await checkWebGPUSupport();
      deviceType = hasWebGPU ? 'webgpu' : 'wasm';

      env.useBrowserCache = true;
      env.allowLocalModels = false;

      classifier = await pipeline(
        'zero-shot-classification',
        'facebook/bart-large-mnli',
        { device: deviceType }
      );
    } catch (error) {
      throw error;
    }
  }
  return classifier;
};

export const predictDisease = async (symptoms: string[]) => {
  if (!symptoms.length) {
    throw new Error("Please select at least one symptom for analysis");
  }

  let model;
  try {
    model = await initializeModel();
  } catch (error) {
    const fallback = getRandomFallbackDisease();
    return [{
      name: fallback.name,
      probability: 85,
      specialist: fallback.specialist,
      description: `Based on fallback prediction due to model error. Please consult with a ${fallback.specialist} for accurate diagnosis.`,
      isFallback: true,
      id: fallback.name.toLowerCase().replace(/\s/g, "-"),
      commonSymptoms: [],
      probabilityCalculation: () => 85,
    }];
  }

  const symptomText = symptoms.join(', ');
  const candidateLabels = DISEASES.map(disease => disease.name);

  try {
    const result = await model(symptomText, candidateLabels);

    const predictions = result.labels
      .map((label: string, index: number) => ({
        id: label.toLowerCase().replace(/\s/g, "-"),
        name: label,
        probability: Math.round(result.scores[index] * 100),
        specialist: DISEASES.find(d => d.name === label)?.specialist || 'General Physician',
        description: DISEASES.find(d => d.name === label)?.description || '',
        isFallback: false,
        commonSymptoms: [],
        probabilityCalculation: () => Math.round(result.scores[index] * 100),
      }))
      .filter(pred => pred.probability > 20)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);

    if (predictions.length === 0) {
      const fallback = getRandomFallbackDisease();
      return [{
        id: fallback.name.toLowerCase().replace(/\s/g, "-"),
        name: fallback.name,
        probability: 75,
        specialist: fallback.specialist,
        description: 'No strong matches found. Using fallback prediction.',
        isFallback: true,
        commonSymptoms: [],
        probabilityCalculation: () => 75,
      }];
    }

    return predictions;
  } catch (error) {
    const fallback = getRandomFallbackDisease();
    return [{
      id: fallback.name.toLowerCase().replace(/\s/g, "-"),
      name: fallback.name,
      probability: 80,
      specialist: fallback.specialist,
      description: 'Error in prediction process. Using fallback diagnosis.',
      isFallback: true,
      commonSymptoms: [],
      probabilityCalculation: () => 80,
    }];
  }
};
