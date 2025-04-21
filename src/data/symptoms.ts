
// Comprehensive list of symptoms categorized by medical specialty
export type Symptom = {
  id: string;
  name: string;
  category: string;
  description?: string;
};

// Categorized symptoms with descriptions
export const SYMPTOMS: Symptom[] = [
  // General symptoms
  { id: "gen-1", name: "Fever", category: "General", description: "Elevated body temperature above 98.6°F (37°C)" },
  { id: "gen-2", name: "Fatigue", category: "General", description: "Feeling of tiredness or exhaustion" },
  { id: "gen-3", name: "Weakness", category: "General", description: "Lack of physical or muscle strength" },
  { id: "gen-4", name: "Sweating", category: "General", description: "Excessive perspiration" },
  { id: "gen-5", name: "Weight loss", category: "General", description: "Unintentional decrease in body weight" },
  { id: "gen-6", name: "Weight gain", category: "General", description: "Unintentional increase in body weight" },
  
  // Respiratory symptoms
  { id: "resp-1", name: "Cough", category: "Respiratory", description: "Sudden expulsion of air from the lungs" },
  { id: "resp-2", name: "Shortness of breath", category: "Respiratory", description: "Difficulty breathing or dyspnea" },
  { id: "resp-3", name: "Wheezing", category: "Respiratory", description: "High-pitched whistling sound during breathing" },
  { id: "resp-4", name: "Chest congestion", category: "Respiratory", description: "Feeling of tightness or mucus in chest" },
  { id: "resp-5", name: "Sore throat", category: "Respiratory", description: "Pain or irritation in the throat" },
  { id: "resp-6", name: "Runny nose", category: "Respiratory", description: "Excess discharge of fluid from the nose" },
  
  // Cardiovascular symptoms
  { id: "cardio-1", name: "Chest pain", category: "Cardiovascular", description: "Discomfort or pain in the chest area" },
  { id: "cardio-2", name: "Palpitations", category: "Cardiovascular", description: "Sensation of rapid or irregular heartbeat" },
  { id: "cardio-3", name: "Swelling in legs", category: "Cardiovascular", description: "Edema in the lower extremities" },
  { id: "cardio-4", name: "High blood pressure", category: "Cardiovascular", description: "Elevated blood pressure readings" },
  { id: "cardio-5", name: "Low blood pressure", category: "Cardiovascular", description: "Decreased blood pressure readings" },
  
  // Neurological symptoms
  { id: "neuro-1", name: "Headache", category: "Neurological", description: "Pain in any region of the head" },
  { id: "neuro-2", name: "Dizziness", category: "Neurological", description: "Feeling of lightheadedness or imbalance" },
  { id: "neuro-3", name: "Confusion", category: "Neurological", description: "Inability to think clearly or understand" },
  { id: "neuro-4", name: "Memory problems", category: "Neurological", description: "Difficulty in recalling information" },
  { id: "neuro-5", name: "Numbness", category: "Neurological", description: "Loss of sensation in a body part" },
  { id: "neuro-6", name: "Seizures", category: "Neurological", description: "Sudden, uncontrolled electrical disturbance in the brain" },
  
  // Gastrointestinal symptoms
  { id: "gi-1", name: "Nausea", category: "Gastrointestinal", description: "Feeling of sickness with an inclination to vomit" },
  { id: "gi-2", name: "Vomiting", category: "Gastrointestinal", description: "Forceful expulsion of stomach contents" },
  { id: "gi-3", name: "Diarrhea", category: "Gastrointestinal", description: "Loose, watery stools" },
  { id: "gi-4", name: "Constipation", category: "Gastrointestinal", description: "Difficulty in passing stool" },
  { id: "gi-5", name: "Abdominal pain", category: "Gastrointestinal", description: "Pain in the abdomen or stomach area" },
  { id: "gi-6", name: "Bloating", category: "Gastrointestinal", description: "Feeling of fullness or swelling in the abdomen" },
  
  // Musculoskeletal symptoms
  { id: "ms-1", name: "Joint pain", category: "Musculoskeletal", description: "Pain in one or more joints" },
  { id: "ms-2", name: "Muscle pain", category: "Musculoskeletal", description: "Pain in one or more muscles" },
  { id: "ms-3", name: "Back pain", category: "Musculoskeletal", description: "Pain in the back" },
  { id: "ms-4", name: "Neck pain", category: "Musculoskeletal", description: "Pain in the neck area" },
  { id: "ms-5", name: "Stiffness", category: "Musculoskeletal", description: "Reduced range of motion" },
  
  // Dermatological symptoms
  { id: "derm-1", name: "Rash", category: "Dermatological", description: "Abnormal change in skin color or texture" },
  { id: "derm-2", name: "Itching", category: "Dermatological", description: "Irritating sensation causing desire to scratch" },
  { id: "derm-3", name: "Dry skin", category: "Dermatological", description: "Skin that lacks moisture" },
  { id: "derm-4", name: "Excessive sweating", category: "Dermatological", description: "Hyperhidrosis or abnormal sweating" },
  { id: "derm-5", name: "Hair loss", category: "Dermatological", description: "Loss of hair from the scalp or body" }
];

// Group symptoms by category
export const getSymptomsByCategory = () => {
  const grouped: Record<string, Symptom[]> = {};
  
  SYMPTOMS.forEach(symptom => {
    if (!grouped[symptom.category]) {
      grouped[symptom.category] = [];
    }
    grouped[symptom.category].push(symptom);
  });
  
  return grouped;
};

// Get all unique categories
export const getCategories = (): string[] => {
  return [...new Set(SYMPTOMS.map(symptom => symptom.category))];
};

// Search symptoms by term
export const searchSymptoms = (term: string): Symptom[] => {
  if (!term) return SYMPTOMS;
  
  const lowerTerm = term.toLowerCase();
  return SYMPTOMS.filter(
    symptom => 
      symptom.name.toLowerCase().includes(lowerTerm) || 
      symptom.description?.toLowerCase().includes(lowerTerm)
  );
};
