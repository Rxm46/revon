import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import SymptomResults from "./SymptomResults";
import SymptomSearchInput from "./SymptomSearchInput";
import SelectedSymptomsList from "./SelectedSymptomsList";
import AdditionalInfoTextarea from "./AdditionalInfoTextarea";
import { Symptom, searchSymptoms, SYMPTOMS } from "@/data/symptoms";
import { getDoctorsBySpecialty } from "@/data/diseases";
import { predictDisease, initializeModel } from "@/utils/diseasePredictor";

const SymptomChecker = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const initModel = async () => {
      try {
        await initializeModel();
      } catch (error) {
        toast({
          title: "Model Initialization Error",
          description: "Error loading the analysis model. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsModelLoading(false);
      }
    };
    
    initModel();
  }, []);

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
    const matchedSymptom = SYMPTOMS.find(
      symptom => symptom.name.toLowerCase() === text.toLowerCase()
    );

    if (matchedSymptom) {
      handleAddSymptom(matchedSymptom);
    } else {
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

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please add at least one symptom to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const symptomNames = selectedSymptoms.map(s => s.name);
      const predictions = await predictDisease(symptomNames);
      
      if (predictions && predictions.length > 0) {
        const recommendedDoctors = getDoctorsBySpecialty(predictions[0].specialist);
        
        setResults({
          diseases: predictions,
          precautions: [
            "Consult with a healthcare professional",
            "Get adequate rest",
            "Stay hydrated",
            "Monitor your symptoms",
            "Follow prescribed medications if any"
          ],
          diet: [
            "Maintain a balanced diet",
            "Include fresh fruits and vegetables",
            "Stay hydrated with water",
            "Avoid processed foods",
            "Consider supplements as recommended by your doctor"
          ],
          doctors: recommendedDoctors
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while analyzing your symptoms";
      toast({
        title: "Analysis Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          {isModelLoading 
            ? "Initializing analysis model..."
            : "Add your symptoms and provide additional information for a more accurate analysis."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {isModelLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-revon-primary"></div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full gradient-btn"
          onClick={handleAnalyze}
          disabled={isLoading || isModelLoading}
        >
          {isModelLoading ? "Initializing..." : isLoading ? "Analyzing..." : "Analyze Symptoms"}
          {!isLoading && !isModelLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomChecker;
