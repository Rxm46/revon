
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { Button } from "@/components/ui/button";
import { Symptom, getSymptomsByCategory } from "@/data/symptoms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SymptomSearchInputProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  onAddSymptom: (symptom: Symptom) => void;
  onVoiceInput: (text: string) => void;
  filteredSymptoms: Symptom[];
  showAllSymptoms: boolean;
  setShowAllSymptoms: (show: boolean) => void;
}

const SymptomSearchInput = ({
  searchTerm,
  setSearchTerm,
  filteredSymptoms,
  onAddSymptom,
  onVoiceInput,
  showAllSymptoms,
  setShowAllSymptoms,
}: SymptomSearchInputProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const symptomsByCategory = getSymptomsByCategory();
  const categories = Object.keys(symptomsByCategory).sort();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleToggleAllSymptoms = () => {
    setShowAllSymptoms(!showAllSymptoms);
    if (!showAllSymptoms) {
      setSearchTerm("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label htmlFor="symptom-search">Search and add symptoms</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleToggleAllSymptoms}
          className="flex items-center text-sm"
        >
          {showAllSymptoms ? (
            <>Hide All <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Show All <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </div>
      
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="symptom-search"
            placeholder="Type to search symptoms..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <VoiceInput onResult={onVoiceInput} />
      </div>
      
      <div className="text-xs text-muted-foreground mt-1">
        Try using voice input 🎤 to add symptoms or search
      </div>
      
      {showAllSymptoms && (
        <div className="mt-4 border rounded-md overflow-hidden">
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full flex overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="max-h-60 overflow-y-auto p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    className="w-full text-left px-3 py-2 hover:bg-muted transition-colors rounded-md flex justify-between items-center"
                    onClick={() => onAddSymptom(symptom)}
                    type="button"
                  >
                    <div>
                      <span className="font-medium">{symptom.name}</span>
                      <div className="text-xs text-muted-foreground">{symptom.description}</div>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{symptom.category}</span>
                  </button>
                ))}
              </div>
            </TabsContent>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="max-h-60 overflow-y-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {symptomsByCategory[category]
                    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm)
                    .map((symptom) => (
                    <button
                      key={symptom.id}
                      className="w-full text-left px-3 py-2 hover:bg-muted transition-colors rounded-md"
                      onClick={() => onAddSymptom(symptom)}
                      type="button"
                    >
                      <span className="font-medium">{symptom.name}</span>
                      <div className="text-xs text-muted-foreground">{symptom.description}</div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
      
      {searchTerm && !showAllSymptoms && (
        <div className="mt-2 border rounded-md max-h-60 overflow-y-auto">
          {filteredSymptoms.length > 0 ? (
            filteredSymptoms.map((symptom) => (
              <button
                key={symptom.id}
                className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex justify-between items-center"
                onClick={() => onAddSymptom(symptom)}
                type="button"
              >
                <span>{symptom.name}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">{symptom.category}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground">No symptoms found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomSearchInput;
