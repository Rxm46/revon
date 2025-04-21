
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoTextareaProps {
  value: string;
  onChange: (v: string) => void;
}

const AdditionalInfoTextarea = ({ value, onChange }: AdditionalInfoTextareaProps) => (
  <div className="space-y-2">
    <Label htmlFor="additional-info">Additional Information (Optional)</Label>
    <Textarea
      id="additional-info"
      placeholder="Provide any additional information about your symptoms..."
      className="min-h-[100px]"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default AdditionalInfoTextarea;
