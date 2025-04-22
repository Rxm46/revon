
import { pipeline } from '@huggingface/transformers';
import { DISEASES } from '@/data/diseases';

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
  // If no symptoms provided, return early
  if (!symptoms.length) {
    throw new Error("Please select at least one symptom for analysis");
  }

  const model = await initializeModel();
  
  // Convert symptoms array to a text description
  const symptomText = symptoms.join(', ');
  
  // Get disease names as candidate labels
  const candidateLabels = DISEASES.map(disease => disease.name);

  try {
    const result = await model(symptomText, candidateLabels);
    
    // Filter predictions with score > 20%
    const predictions = result.labels
      .map((label: string, index: number) => ({
        name: label,
        probability: Math.round(result.scores[index] * 100),
        specialist: DISEASES.find(d => d.name === label)?.specialist || 'General Physician',
        description: DISEASES.find(d => d.name === label)?.description || ''
      }))
      .filter(pred => pred.probability > 20)
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3); // Top 3 predictions

    if (predictions.length === 0) {
      throw new Error("No strong matches found for the provided symptoms");
    }

    return predictions;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error analyzing symptoms");
  }
};
