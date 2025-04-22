
import { pipeline } from '@huggingface/transformers';

let classifier: any = null;

export const initializeModel = async () => {
  if (!classifier) {
    classifier = await pipeline(
      'zero-shot-classification',
      'facebook/bart-large-mnli',
      { device: 'cpu' }
    );
  }
  return classifier;
};

export const predictDisease = async (symptoms: string[]) => {
  const model = await initializeModel();
  
  // Convert symptoms array to a text description
  const symptomText = symptoms.join(', ');
  
  // Define possible diseases as candidate labels
  const candidateLabels = [
    'Common Cold',
    'Influenza',
    'Seasonal Allergies',
    'Migraine',
    'Gastroesophageal Reflux Disease',
    'Asthma',
    'Arthritis',
    'Hypertension'
  ];

  try {
    const result = await model(symptomText, candidateLabels);
    return result.labels.map((label: string, index: number) => ({
      name: label,
      probability: Math.round(result.scores[index] * 100)
    }));
  } catch (error) {
    console.error('Error predicting disease:', error);
    return [];
  }
};
