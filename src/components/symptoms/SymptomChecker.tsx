
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import SymptomResults from "./SymptomResults";
import SymptomSearchInput from "./SymptomSearchInput";
import SelectedSymptomsList from "./SelectedSymptomsList";
import AdditionalInfoTextarea from "./AdditionalInfoTextarea";
import { Symptom, searchSymptoms, SYMPTOMS } from "@/data/symptoms";
import { predictDiseases, getDoctorsBySpecialty } from "@/data/diseases";

const SymptomChecker = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);

  // Get filtered symptoms based on search term
  const filteredSymptoms = searchTerm 
    ? searchSymptoms(searchTerm)
    : SYMPTOMS;

  const handleAddSymptom = (symptom: Symptom) => {
    const existingSymptom = selectedSymptoms.find(s => 
      s.id === symptom.id
    );

    if (existingSymptom) {
      toast({
        title: "Symptom Already Added",
        description: `${symptom.name} is already in your list.`,
        duration: 2000,
      });
      return;
    }

    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchTerm("");

    toast({
      title: "Symptom Added",
      description: `${symptom.name} has been added to your list.`,
      duration: 2000,
    });
  };

  const handleVoiceInput = (text: string) => {
    // Check if the spoken text matches any known symptoms
    const matchedSymptom = SYMPTOMS.find(
      symptom => symptom.name.toLowerCase() === text.toLowerCase()
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

  const handleRemoveSymptom = (id: string) => {
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

    // Get the symptom IDs
    const symptomIds = selectedSymptoms.map(s => s.id);
    
    // Predict diseases based on symptoms
    const predictedDiseases = predictDiseases(symptomIds);
    
    // If we have at least one disease prediction
    if (predictedDiseases.length > 0) {
      // Get the specialist from the top disease prediction
      const primarySpecialist = predictedDiseases[0].specialist;
      
      // Get doctors for that specialty
      const recommendedDoctors = getDoctorsBySpecialty(primarySpecialist);
      
      // Generate precautions and diet based on top disease
      let precautions: string[] = [];
      let diet: string[] = [];
      
      // Common precautions based on disease
      if (predictedDiseases[0].name.includes("Cold") || predictedDiseases[0].name.includes("Flu")) {
        precautions = [
          "Get plenty of rest",
          "Stay hydrated",
          "Take over-the-counter pain relievers if needed",
          "Use a humidifier to add moisture to the air",
          "Wash hands frequently"
        ];
        diet = [
          "Chicken soup",
          "Herbal tea with honey",
          "Citrus fruits",
          "Leafy green vegetables",
          "Foods rich in zinc"
        ];
      } else if (predictedDiseases[0].name.includes("Allergies")) {
        precautions = [
          "Avoid known allergens",
          "Keep windows closed during high pollen seasons",
          "Use air purifiers",
          "Shower after being outdoors",
          "Consider over-the-counter antihistamines"
        ];
        diet = [
          "Foods with quercetin (apples, berries)",
          "Foods with omega-3 fatty acids (salmon, walnuts)",
          "Probiotics (yogurt, fermented foods)",
          "Turmeric (anti-inflammatory properties)",
          "Avoid dairy if sensitive"
        ];
      } else if (predictedDiseases[0].name.includes("Migraine")) {
        precautions = [
          "Identify and avoid triggers",
          "Maintain regular sleep schedule",
          "Manage stress through relaxation techniques",
          "Consider preventive medications if frequent",
          "Stay in a quiet, dark room during attacks"
        ];
        diet = [
          "Stay hydrated",
          "Avoid processed foods",
          "Limit caffeine",
          "Avoid aged cheeses and processed meats",
          "Maintain regular meal times"
        ];
      } else if (predictedDiseases[0].name.includes("GERD")) {
        precautions = [
          "Avoid lying down after eating",
          "Elevate head while sleeping",
          "Avoid tight-fitting clothes",
          "Maintain healthy weight",
          "Avoid trigger foods"
        ];
        diet = [
          "Non-citrus fruits",
          "Vegetables",
          "Lean proteins",
          "Whole grains",
          "Avoid spicy and fatty foods"
        ];
      } else {
        // Generic precautions and diet for other conditions
        precautions = [
          "Get regular check-ups",
          "Maintain a healthy lifestyle",
          "Get adequate sleep",
          "Exercise regularly",
          "Manage stress effectively"
        ];
        diet = [
          "Balanced diet with fruits and vegetables",
          "Adequate protein intake",
          "Whole grains",
          "Limit processed foods",
          "Stay hydrated"
        ];
      }
      
      // Set the results
      setTimeout(() => {
        setResults({
          diseases: predictedDiseases,
          precautions,
          diet,
          doctors: recommendedDoctors
        });
        setIsLoading(false);
      }, 1500);
    } else {
      // No diseases match the symptoms
      setTimeout(() => {
        toast({
          title: "Analysis Inconclusive",
          description: "We couldn't determine a likely condition from your symptoms. Please add more symptoms or consult a healthcare professional.",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleReset = () => {
    setResults(null);
    setSelectedSymptoms([]);
    setAdditionalInfo("");
    setShowAllSymptoms(false);
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
          showAllSymptoms={showAllSymptoms}
          setShowAllSymptoms={setShowAllSymptoms}
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
