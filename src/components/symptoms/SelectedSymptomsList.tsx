
import { Label } from "@/components/ui/label";
import { Symptom } from "@/data/symptoms";

interface SelectedSymptomsListProps {
  selectedSymptoms: Symptom[];
  onRemoveSymptom: (id: string) => void;
}

const SelectedSymptomsList = ({ selectedSymptoms, onRemoveSymptom }: SelectedSymptomsListProps) => {
  // Group selected symptoms by category
  const groupedSymptoms: Record<string, Symptom[]> = {};
  
  selectedSymptoms.forEach(symptom => {
    if (!groupedSymptoms[symptom.category]) {
      groupedSymptoms[symptom.category] = [];
    }
    groupedSymptoms[symptom.category].push(symptom);
  });
  
  const categories = Object.keys(groupedSymptoms);

  return (
    <div className="space-y-3">
      <Label>Selected Symptoms ({selectedSymptoms.length})</Label>
      
      {selectedSymptoms.length > 0 ? (
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {groupedSymptoms[category].map((symptom) => (
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-sm p-3 border rounded-md bg-muted/30">
          No symptoms selected yet. Search or browse the symptom list above.
        </div>
      )}
    </div>
  );
};

export default SelectedSymptomsList;
