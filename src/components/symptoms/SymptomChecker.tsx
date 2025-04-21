
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import SymptomResults from "./SymptomResults";
import SymptomSearchInput from "./SymptomSearchInput";
import SelectedSymptomsList from "./SelectedSymptomsList";
import AdditionalInfoTextarea from "./AdditionalInfoTextarea";

const SYMPTOMS = [
  "Fever", "Cough", "Fatigue", "Shortness of breath", "Headache", 
  "Sore throat", "Nausea", "Vomiting", "Diarrhea", "Muscle pain",
  "Joint pain", "Chest pain", "Abdominal pain", "Dizziness", "Confusion"
];

type SymptomData = {
  id: number;
  name: string;
};

type Results = {
  diseases: Array<{
    name: string;
    probability: number;
    description: string;
  }>;
  precautions: string[];
  diet: string[];
};

const SymptomChecker = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const filteredSymptoms = SYMPTOMS.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSymptom = (symptom: string) => {
    const existingSymptom = selectedSymptoms.find(s => 
      s.name.toLowerCase() === symptom.toLowerCase()
    );

    if (existingSymptom) {
      toast({
        title: "Symptom Already Added",
        description: `${symptom} is already in your list.`,
        duration: 2000,
      });
      return;
    }

    const newSymptom = {
      id: Date.now(),
      name: symptom
    };
    setSelectedSymptoms([...selectedSymptoms, newSymptom]);
    setSearchTerm("");

    toast({
      title: "Symptom Added",
      description: `${symptom} has been added to your list.`,
      duration: 2000,
    });
  };

  const handleVoiceInput = (text: string) => {
    // Check if the spoken text matches any known symptoms
    const matchedSymptom = SYMPTOMS.find(
      symptom => symptom.toLowerCase() === text.toLowerCase()
    );

    if (matchedSymptom) {
      handleAddSymptom(matchedSymptom);
    } else {
      // If no exact match, set as search term to show closest matches
      setSearchTerm(text);
      toast({
        title: "Searching for symptom",
        description: `Looking for symptoms similar to "${text}"`,
        duration: 2000,
      });
    }
  };

  const handleRemoveSymptom = (id: number) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom.id !== id));
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please add at least one symptom to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockResults: Results = {
        diseases: [
          {
            name: "Common Cold",
            probability: 85,
            description: "A mild viral infection of the nose and throat."
          },
          {
            name: "Seasonal Allergies",
            probability: 65,
            description: "An immune system response to allergens like pollen."
          },
          {
            name: "Influenza",
            probability: 40,
            description: "A contagious respiratory illness caused by influenza viruses."
          }
        ],
        precautions: [
          "Get plenty of rest",
          "Stay hydrated",
          "Take over-the-counter pain relievers if needed",
          "Use a humidifier to add moisture to the air"
        ],
        diet: [
          "Chicken soup",
          "Herbal tea with honey",
          "Citrus fruits",
          "Leafy green vegetables",
          "Foods rich in zinc"
        ]
      };

      setResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setResults(null);
    setSelectedSymptoms([]);
    setAdditionalInfo("");
  };

  if (results) {
    return <SymptomResults results={results} onBack={handleReset} />;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Symptom Checker</CardTitle>
        <CardDescription>
          Add your symptoms and provide additional information for a more accurate analysis.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <SymptomSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredSymptoms={filteredSymptoms}
          onAddSymptom={handleAddSymptom}
          onVoiceInput={handleVoiceInput}
        />
        <SelectedSymptomsList
          selectedSymptoms={selectedSymptoms}
          onRemoveSymptom={handleRemoveSymptom}
        />
        <AdditionalInfoTextarea
          value={additionalInfo}
          onChange={setAdditionalInfo}
        />
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full gradient-btn"
          onClick={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze Symptoms"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomChecker;
