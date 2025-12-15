import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface PageSection {
  id: string;
  type: "hero" | "text" | "features" | "cta" | "testimonials";
  title: string;
  content: string;
  imageUrl: string;
  ctaButtonText: string;
  ctaLink: string;
  isExpanded: boolean;
}

const sectionTypes = [
  { value: "hero", label: "Hero Section" },
  { value: "text", label: "Text Section" },
  { value: "features", label: "Features Section" },
  { value: "cta", label: "Call to Action" },
  { value: "testimonials", label: "Testimonials" },
];

export default function Homepage() {
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: "1",
      type: "hero",
      title: "Welcome to PerksAdmin",
      content: "Discover exclusive perks and benefits designed specifically for founders and startups. Access premium tools, services, and resources at discounted rates.",
      imageUrl: "",
      ctaButtonText: "Get Started",
      ctaLink: "/perks",
      isExpanded: true,
    },
    {
      id: "2", 
      type: "features",
      title: "Why Choose Us?",
      content: "We provide curated perks from trusted partners to help your startup grow and succeed.",
      imageUrl: "",
      ctaButtonText: "",
      ctaLink: "",
      isExpanded: false,
    },
  ]);

  const addSection = () => {
    const newSection: PageSection = {
      id: Date.now().toString(),
      type: "text",
      title: "New Section",
      content: "Enter your content here...",
      imageUrl: "",
      ctaButtonText: "",
      ctaLink: "",
      isExpanded: true,
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, field: keyof PageSection, value: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const toggleSection = (id: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, isExpanded: !section.isExpanded } : section
    ));
  };

  const savePage = () => {
    // Here you would save to your backend/database
    console.log("Saving page sections:", sections);
    // Show success message
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Homepage Management</h1>
          <p className="text-muted-foreground">Configure and manage the public homepage content sections.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={addSection}>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
          <Button onClick={savePage}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Page Sections</span>
              <span className="text-sm text-muted-foreground">({sections.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section, index) => (
              <Card key={section.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {index + 1}.
                      </span>
                      <span className="font-medium">{section.title}</span>
                      <span className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                        {sectionTypes.find(type => type.value === section.type)?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSection(section.id)}
                      >
                        {section.isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {section.isExpanded && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`section-type-${section.id}`}>Section Type</Label>
                        <Select
                          value={section.type}
                          onValueChange={(value) => updateSection(section.id, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sectionTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`section-title-${section.id}`}>Title</Label>
                        <Input
                          id={`section-title-${section.id}`}
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          placeholder="Section title"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`section-content-${section.id}`}>Content</Label>
                      <Textarea
                        id={`section-content-${section.id}`}
                        value={section.content}
                        onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                        placeholder="Enter your content here..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`section-image-${section.id}`}>Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`section-image-${section.id}`}
                          value={section.imageUrl}
                          onChange={(e) => updateSection(section.id, 'imageUrl', e.target.value)}
                          placeholder="Paste image URL or upload"
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`section-cta-text-${section.id}`}>CTA Button Text</Label>
                        <Input
                          id={`section-cta-text-${section.id}`}
                          value={section.ctaButtonText}
                          onChange={(e) => updateSection(section.id, 'ctaButtonText', e.target.value)}
                          placeholder="e.g., Get Started"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`section-cta-link-${section.id}`}>CTA Link</Label>
                        <Input
                          id={`section-cta-link-${section.id}`}
                          value={section.ctaLink}
                          onChange={(e) => updateSection(section.id, 'ctaLink', e.target.value)}
                          placeholder="/perks"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Section
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
            
            {sections.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No sections added yet</p>
                <Button onClick={addSection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Section
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {sections.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 border rounded-lg p-4 bg-muted/20">
                {sections.map((section, index) => (
                  <div key={section.id} className="bg-background p-4 rounded border">
                    <div className="flex items-start gap-3">
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{section.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{section.content}</p>
                        {section.ctaButtonText && (
                          <Button size="sm" variant="outline">
                            {section.ctaButtonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}