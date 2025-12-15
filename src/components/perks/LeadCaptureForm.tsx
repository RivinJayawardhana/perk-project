import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

const defaultFields: FormField[] = [
  { id: "1", label: "Full Name", type: "Text", placeholder: "Enter your name", required: true },
  { id: "2", label: "Company", type: "Text", placeholder: "Your company name", required: true },
  { id: "3", label: "Email", type: "Email", placeholder: "you@company.com", required: true },
  { id: "4", label: "Phone", type: "Phone", placeholder: "+60 123 456 789", required: false },
];

export function LeadCaptureForm() {
  const [fields, setFields] = useState<FormField[]>(defaultFields);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "New Field",
      type: "Text",
      placeholder: "Enter value",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Lead Capture Form Fields</h3>
        <Button variant="outline" size="sm" onClick={addField}>
          <Plus className="w-4 h-4 mr-1" />
          Add Field
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.id} className="flex items-center gap-3 p-3 border rounded-lg bg-background">
            <Input
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              className="max-w-[140px]"
            />
            <Select
              value={field.type}
              onValueChange={(value) => updateField(field.id, { type: value })}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Text">Text</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="Number">Number</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={field.placeholder}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              className="flex-1"
              placeholder="Placeholder text"
            />
            <div className="flex items-center gap-2">
              <Checkbox
                id={`required-${field.id}`}
                checked={field.required}
                onCheckedChange={(checked) =>
                  updateField(field.id, { required: checked as boolean })
                }
              />
              <label htmlFor={`required-${field.id}`} className="text-sm text-muted-foreground">
                Required
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => removeField(field.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <p className="text-sm text-primary">
        Configure fields to collect from users. Common fields: Budget, Purchase Timeline, etc.
      </p>
    </div>
  );
}
