
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
  { id: "gen-7", name: "Chills", category: "General", description: "Feeling of cold with shivering" },
  { id: "gen-8", name: "Night sweats", category: "General", description: "Excessive sweating during sleep" },
  { id: "gen-9", name: "Loss of appetite", category: "General", description: "Reduced desire to eat" },
  
  // Respiratory symptoms
  { id: "resp-1", name: "Cough", category: "Respiratory", description: "Sudden expulsion of air from the lungs" },
  { id: "resp-2", name: "Shortness of breath", category: "Respiratory", description: "Difficulty breathing or dyspnea" },
  { id: "resp-3", name: "Wheezing", category: "Respiratory", description: "High-pitched whistling sound during breathing" },
  { id: "resp-4", name: "Chest congestion", category: "Respiratory", description: "Feeling of tightness or mucus in chest" },
  { id: "resp-5", name: "Sore throat", category: "Respiratory", description: "Pain or irritation in the throat" },
  { id: "resp-6", name: "Runny nose", category: "Respiratory", description: "Excess discharge of fluid from the nose" },
  { id: "resp-7", name: "Nasal congestion", category: "Respiratory", description: "Blockage in nasal passages" },
  { id: "resp-8", name: "Sneezing", category: "Respiratory", description: "Sudden, forceful expulsion of air through nose and mouth" },
  { id: "resp-9", name: "Hoarseness", category: "Respiratory", description: "Rough or harsh voice quality" },
  
  // Cardiovascular symptoms
  { id: "cardio-1", name: "Chest pain", category: "Cardiovascular", description: "Discomfort or pain in the chest area" },
  { id: "cardio-2", name: "Palpitations", category: "Cardiovascular", description: "Sensation of rapid or irregular heartbeat" },
  { id: "cardio-3", name: "Swelling in legs", category: "Cardiovascular", description: "Edema in the lower extremities" },
  { id: "cardio-4", name: "High blood pressure", category: "Cardiovascular", description: "Elevated blood pressure readings" },
  { id: "cardio-5", name: "Low blood pressure", category: "Cardiovascular", description: "Decreased blood pressure readings" },
  { id: "cardio-6", name: "Chest tightness", category: "Cardiovascular", description: "Sensation of pressure or constriction in chest" },
  
  // Neurological symptoms
  { id: "neuro-1", name: "Headache", category: "Neurological", description: "Pain in any region of the head" },
  { id: "neuro-2", name: "Dizziness", category: "Neurological", description: "Feeling of lightheadedness or imbalance" },
  { id: "neuro-3", name: "Confusion", category: "Neurological", description: "Inability to think clearly or understand" },
  { id: "neuro-4", name: "Memory problems", category: "Neurological", description: "Difficulty in recalling information" },
  { id: "neuro-5", name: "Numbness", category: "Neurological", description: "Loss of sensation in a body part" },
  { id: "neuro-6", name: "Seizures", category: "Neurological", description: "Sudden, uncontrolled electrical disturbance in the brain" },
  { id: "neuro-7", name: "Tingling", category: "Neurological", description: "Pins and needles sensation" },
  { id: "neuro-8", name: "Slurred speech", category: "Neurological", description: "Unclear or mumbled speech" },
  { id: "neuro-9", name: "Loss of balance", category: "Neurological", description: "Difficulty maintaining stability when standing or walking" },
  { id: "neuro-10", name: "Drowsiness", category: "Neurological", description: "Excessive sleepiness or desire to sleep" },
  
  // Gastrointestinal symptoms
  { id: "gi-1", name: "Nausea", category: "Gastrointestinal", description: "Feeling of sickness with an inclination to vomit" },
  { id: "gi-2", name: "Vomiting", category: "Gastrointestinal", description: "Forceful expulsion of stomach contents" },
  { id: "gi-3", name: "Diarrhea", category: "Gastrointestinal", description: "Loose, watery stools" },
  { id: "gi-4", name: "Constipation", category: "Gastrointestinal", description: "Difficulty in passing stool" },
  { id: "gi-5", name: "Abdominal pain", category: "Gastrointestinal", description: "Pain in the abdomen or stomach area" },
  { id: "gi-6", name: "Bloating", category: "Gastrointestinal", description: "Feeling of fullness or swelling in the abdomen" },
  { id: "gi-7", name: "Heartburn", category: "Gastrointestinal", description: "Burning sensation in the chest, usually after eating" },
  { id: "gi-8", name: "Blood in stool", category: "Gastrointestinal", description: "Presence of blood in feces" },
  
  // Musculoskeletal symptoms
  { id: "ms-1", name: "Joint pain", category: "Musculoskeletal", description: "Pain in one or more joints" },
  { id: "ms-2", name: "Muscle pain", category: "Musculoskeletal", description: "Pain in one or more muscles" },
  { id: "ms-3", name: "Back pain", category: "Musculoskeletal", description: "Pain in the back" },
  { id: "ms-4", name: "Neck pain", category: "Musculoskeletal", description: "Pain in the neck area" },
  { id: "ms-5", name: "Stiffness", category: "Musculoskeletal", description: "Reduced range of motion" },
  { id: "ms-6", name: "Joint swelling", category: "Musculoskeletal", description: "Inflammation or fluid in joints" },
  
  // Dermatological symptoms
  { id: "derm-1", name: "Rash", category: "Dermatological", description: "Abnormal change in skin color or texture" },
  { id: "derm-2", name: "Itching", category: "Dermatological", description: "Irritating sensation causing desire to scratch" },
  { id: "derm-3", name: "Dry skin", category: "Dermatological", description: "Skin that lacks moisture" },
  { id: "derm-4", name: "Excessive sweating", category: "Dermatological", description: "Hyperhidrosis or abnormal sweating" },
  { id: "derm-5", name: "Hair loss", category: "Dermatological", description: "Loss of hair from the scalp or body" },
  { id: "derm-6", name: "Bruising easily", category: "Dermatological", description: "Tendency to develop bruises from minor trauma" },
  { id: "derm-7", name: "Pale skin", category: "Dermatological", description: "Unusually light skin color" },
  { id: "derm-8", name: "Jaundice", category: "Dermatological", description: "Yellowing of skin and eyes" },
  
  // Urinary and Reproductive symptoms
  { id: "uro-1", name: "Painful urination", category: "Urinary", description: "Discomfort during urination" },
  { id: "uro-2", name: "Frequent urination", category: "Urinary", description: "Need to urinate more often than usual" },
  { id: "uro-3", name: "Blood in urine", category: "Urinary", description: "Presence of blood in urine" },
  { id: "repro-1", name: "Irregular periods", category: "Reproductive", description: "Menstrual cycles that vary in timing" },
  { id: "repro-2", name: "Vaginal discharge", category: "Reproductive", description: "Fluid released from the vagina" },
  { id: "repro-3", name: "Erectile dysfunction", category: "Reproductive", description: "Inability to maintain erection for sexual activity" },
  
  // Psychological symptoms
  { id: "psych-1", name: "Anxiety", category: "Psychological", description: "Feeling of worry, nervousness, or unease" },
  { id: "psych-2", name: "Depression", category: "Psychological", description: "Persistent feeling of sadness and loss of interest" },
  { id: "psych-3", name: "Mood swings", category: "Psychological", description: "Rapid, unexplained changes in mood" },
  { id: "psych-4", name: "Insomnia", category: "Psychological", description: "Difficulty falling or staying asleep" },
  { id: "psych-5", name: "Irritability", category: "Psychological", description: "Easily annoyed or provoked to anger" },
  { id: "psych-6", name: "Hallucinations", category: "Psychological", description: "Sensing things that aren't actually present" }
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
