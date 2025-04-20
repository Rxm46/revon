
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import SymptomResults from "./SymptomResults";

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
        <div className="space-y-2">
          <Label htmlFor="symptom-search">Search and add symptoms</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="symptom-search"
              placeholder="Type to search symptoms..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {searchTerm && (
            <div className="mt-2 border rounded-md max-h-60 overflow-y-auto">
              {filteredSymptoms.length > 0 ? (
                filteredSymptoms.map((symptom, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                    onClick={() => handleAddSymptom(symptom)}
                  >
                    {symptom}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-muted-foreground">No symptoms found</div>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Selected Symptoms</Label>
          
          {selectedSymptoms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="bg-revon-primary/10 text-revon-primary rounded-full px-3 py-1 text-sm flex items-center"
                >
                  {symptom.name}
                  <button
                    className="ml-2 text-revon-primary/70 hover:text-revon-primary focus:outline-none"
                    onClick={() => handleRemoveSymptom(symptom.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">No symptoms selected yet</div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additional-info">Additional Information (Optional)</Label>
          <Textarea
            id="additional-info"
            placeholder="Provide any additional information about your symptoms..."
            className="min-h-[100px]"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </div>
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
