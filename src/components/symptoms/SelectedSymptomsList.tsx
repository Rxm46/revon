
import { Label } from "@/components/ui/label";

type SymptomData = {
  id: number;
  name: string;
};

interface SelectedSymptomsListProps {
  selectedSymptoms: SymptomData[];
  onRemoveSymptom: (id: number) => void;
}

const SelectedSymptomsList = ({ selectedSymptoms, onRemoveSymptom }: SelectedSymptomsListProps) => (
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
              type="button"
              onClick={() => onRemoveSymptom(symptom.id)}
              aria-label={`Remove symptom ${symptom.name}`}
              title="Remove symptom"
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
);

export default SelectedSymptomsList;
