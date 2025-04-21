
import { Symptom } from './symptoms';

export type Disease = {
  id: string;
  name: string;
  description: string;
  specialist: string;
  commonSymptoms: string[]; // IDs of symptoms
  probabilityCalculation: (symptoms: string[]) => number;
};

export type DoctorInfo = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  address: string;
  contact: string;
  mapsLink?: string;
};

// Disease definitions with probability calculation functions
export const DISEASES: Disease[] = [
  {
    id: "common-cold",
    name: "Common Cold",
    description: "A viral infection of the upper respiratory tract that primarily affects the nose and throat.",
    specialist: "General Physician",
    commonSymptoms: ["resp-1", "resp-5", "resp-6", "gen-1"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["resp-1", "resp-5", "resp-6", "gen-1", "resp-2"];
      return calculateProbability(symptoms, relevantSymptoms, 0.8);
    }
  },
  {
    id: "flu",
    name: "Influenza",
    description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.",
    specialist: "General Physician",
    commonSymptoms: ["gen-1", "gen-2", "resp-1", "resp-2", "ms-2"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["gen-1", "gen-2", "resp-1", "resp-2", "ms-2"];
      return calculateProbability(symptoms, relevantSymptoms, 0.85);
    }
  },
  {
    id: "allergies",
    name: "Seasonal Allergies",
    description: "An immune system response to allergens like pollen, dust, or pet dander.",
    specialist: "Allergist",
    commonSymptoms: ["resp-6", "resp-5", "resp-3", "derm-2"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["resp-6", "resp-5", "resp-3", "derm-2", "resp-1"];
      return calculateProbability(symptoms, relevantSymptoms, 0.7);
    }
  },
  {
    id: "migraine",
    name: "Migraine",
    description: "A neurological condition that causes severe, recurring headaches, often with other symptoms.",
    specialist: "Neurologist",
    commonSymptoms: ["neuro-1", "neuro-2", "gi-1"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["neuro-1", "neuro-2", "gi-1"];
      return calculateProbability(symptoms, relevantSymptoms, 0.9);
    }
  },
  {
    id: "gerd",
    name: "Gastroesophageal Reflux Disease (GERD)",
    description: "A digestive disorder that affects the ring of muscle between the esophagus and stomach.",
    specialist: "Gastroenterologist",
    commonSymptoms: ["gi-1", "gi-5", "cardio-1"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["gi-1", "gi-5", "cardio-1"];
      return calculateProbability(symptoms, relevantSymptoms, 0.75);
    }
  },
  {
    id: "asthma",
    name: "Asthma",
    description: "A condition in which airways narrow and swell and may produce extra mucus.",
    specialist: "Pulmonologist",
    commonSymptoms: ["resp-2", "resp-3", "resp-1"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["resp-2", "resp-3", "resp-1", "resp-4"];
      return calculateProbability(symptoms, relevantSymptoms, 0.8);
    }
  },
  {
    id: "arthritis",
    name: "Arthritis",
    description: "Inflammation of one or more joints, causing pain and stiffness.",
    specialist: "Rheumatologist",
    commonSymptoms: ["ms-1", "ms-5", "gen-2"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["ms-1", "ms-5", "gen-2"];
      return calculateProbability(symptoms, relevantSymptoms, 0.7);
    }
  },
  {
    id: "hypertension",
    name: "Hypertension",
    description: "High blood pressure is a common condition that can lead to serious health problems.",
    specialist: "Cardiologist",
    commonSymptoms: ["cardio-4", "neuro-1", "cardio-3"],
    probabilityCalculation: (symptoms) => {
      const relevantSymptoms = ["cardio-4", "neuro-1", "cardio-3"];
      return calculateProbability(symptoms, relevantSymptoms, 0.7);
    }
  }
];

// Helper function to calculate disease probability based on matching symptoms
function calculateProbability(userSymptoms: string[], diseaseSymptoms: string[], maxProbability: number): number {
  // If no symptoms, return minimal probability
  if (userSymptoms.length === 0) return 10;
  
  // Count matching symptoms
  const matchingSymptoms = userSymptoms.filter(s => diseaseSymptoms.includes(s));
  
  // Calculate basic probability
  let probability = (matchingSymptoms.length / diseaseSymptoms.length) * 100;
  
  // Apply weighted calculation based on how many symptoms overlap
  if (matchingSymptoms.length >= diseaseSymptoms.length * 0.7) {
    probability *= maxProbability; // Increase probability if many matches
  } else if (matchingSymptoms.length <= 1) {
    probability *= 0.3; // Decrease probability if minimal matches
  }
  
  // Apply penalty if user has many symptoms not associated with this disease
  const irrelevantSymptoms = userSymptoms.filter(s => !diseaseSymptoms.includes(s));
  if (irrelevantSymptoms.length > diseaseSymptoms.length) {
    probability *= 0.8;
  }
  
  return Math.min(Math.round(probability), 99); // Cap at 99%
}

// List of doctors in Tamil Nadu, India
export const DOCTORS: DoctorInfo[] = [
  // Cardiologists
  {
    id: "doc-1",
    name: "Dr. Ramesh Kumar",
    specialty: "Cardiologist",
    hospital: "Apollo Hospital",
    location: "Chennai",
    address: "21, Greams Lane, Chennai, 600006",
    contact: "+91 44 2829 3333",
    mapsLink: "https://maps.app.goo.gl/5JKcLZX3bZX4LQyZ6"
  },
  {
    id: "doc-2",
    name: "Dr. Lakshmi Narayanan",
    specialty: "Cardiologist",
    hospital: "Fortis Malar Hospital",
    location: "Chennai",
    address: "52, 1st Main Rd, Gandhi Nagar, Chennai, 600020",
    contact: "+91 44 4289 2222",
    mapsLink: "https://maps.app.goo.gl/cQV9BdZp7xTnpzny8"
  },
  
  // Neurologists
  {
    id: "doc-3",
    name: "Dr. Priya Rajendran",
    specialty: "Neurologist",
    hospital: "Kauvery Hospital",
    location: "Chennai",
    address: "199, Luz Church Rd, Mylapore, Chennai, 600004",
    contact: "+91 44 4000 6000",
    mapsLink: "https://maps.app.goo.gl/iMU6VCDo7dxFYJtB6"
  },
  {
    id: "doc-4",
    name: "Dr. Srinivasan V",
    specialty: "Neurologist",
    hospital: "MIOT International",
    location: "Chennai",
    address: "4/112, Mount Poonamallee Rd, Manapakkam, Chennai, 600089",
    contact: "+91 44 4200 2288",
    mapsLink: "https://maps.app.goo.gl/EiYsFj6g8vCbpvr19"
  },
  
  // Pulmonologists
  {
    id: "doc-5",
    name: "Dr. Vijayalakshmi Thanasekaraan",
    specialty: "Pulmonologist",
    hospital: "Apollo Hospitals",
    location: "Chennai",
    address: "21, Greams Lane, Chennai, 600006",
    contact: "+91 44 2829 3333",
    mapsLink: "https://maps.app.goo.gl/5JKcLZX3bZX4LQyZ6"
  },
  
  // Gastroenterologists
  {
    id: "doc-6",
    name: "Dr. Mohamed Ali",
    specialty: "Gastroenterologist",
    hospital: "SIMS Hospital",
    location: "Chennai",
    address: "1, Jawaharlal Nehru Rd, Vadapalani, Chennai, 600026",
    contact: "+91 44 2476 5500",
    mapsLink: "https://maps.app.goo.gl/fKPpR5pDN7W9JdFH7"
  },
  
  // Rheumatologists
  {
    id: "doc-7",
    name: "Dr. Shanti Krishnan",
    specialty: "Rheumatologist",
    hospital: "Sri Ramachandra Medical Centre",
    location: "Chennai",
    address: "No.1, Ramachandra Nagar, Porur, Chennai, 600116",
    contact: "+91 44 2476 8027",
    mapsLink: "https://maps.app.goo.gl/j5CKoZScLSbwfQKM6"
  },
  
  // Allergists
  {
    id: "doc-8",
    name: "Dr. Anand Arputharaj",
    specialty: "Allergist",
    hospital: "Dr. Mehta's Hospitals",
    location: "Chennai",
    address: "2, McNichols Rd, Chetpet, Chennai, 600031",
    contact: "+91 44 4227 1500",
    mapsLink: "https://maps.app.goo.gl/KK1XZwpjLRwJ39SL6"
  },
  
  // General Physicians
  {
    id: "doc-9",
    name: "Dr. Shanmugam P",
    specialty: "General Physician",
    hospital: "Billroth Hospitals",
    location: "Chennai",
    address: "43, Lakshmi Talkies Road, Shenoy Nagar, Chennai, 600030",
    contact: "+91 44 2664 4000",
    mapsLink: "https://maps.app.goo.gl/1UZZFwJVXtVJKMfZ7"
  },
  {
    id: "doc-10",
    name: "Dr. Muthukumaran Jayaraman",
    specialty: "General Physician",
    hospital: "Government General Hospital",
    location: "Chennai",
    address: "3, EVR Periyar Salai, Park Town, Chennai, 600003",
    contact: "+91 44 2530 5000",
    mapsLink: "https://maps.app.goo.gl/KqRPBHihCQ4LZr4D9"
  }
];

// Get doctors by specialty
export const getDoctorsBySpecialty = (specialty: string): DoctorInfo[] => {
  return DOCTORS.filter(doctor => doctor.specialty === specialty);
};

// Predict diseases based on symptoms
export const predictDiseases = (symptomIds: string[]) => {
  if (symptomIds.length === 0) return [];
  
  // Calculate probability for each disease
  const predictions = DISEASES.map(disease => {
    const probability = disease.probabilityCalculation(symptomIds);
    return {
      ...disease,
      probability
    };
  });
  
  // Sort by probability (highest first)
  return predictions
    .filter(disease => disease.probability > 20) // Filter diseases with low probability
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3); // Return top 3 matches
};
