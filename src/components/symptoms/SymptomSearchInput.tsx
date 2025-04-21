
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import VoiceInput from "./VoiceInput";

interface SymptomSearchInputProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filteredSymptoms: string[];
  onAddSymptom: (symptom: string) => void;
  onVoiceInput: (text: string) => void;
}

const SymptomSearchInput = ({
  searchTerm,
  setSearchTerm,
  filteredSymptoms,
  onAddSymptom,
  onVoiceInput,
}: SymptomSearchInputProps) => (
  <div className="space-y-2">
    <Label htmlFor="symptom-search">Search and add symptoms</Label>
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
    {searchTerm && (
      <div className="mt-2 border rounded-md max-h-60 overflow-y-auto">
        {filteredSymptoms.length > 0 ? (
          filteredSymptoms.map((symptom, idx) => (
            <button
              key={idx}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
              onClick={() => onAddSymptom(symptom)}
              type="button"
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
);

export default SymptomSearchInput;
