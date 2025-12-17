"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Section {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  filterOptions: string[];
}

export default function EditPerksPage() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      type: "Hero",
      title: "Explore 500+ founder perks",
      subtitle: "Our Perks",
      content: "Handpicked deals on tools, services, and experiences for founders at every stage.",
      imageUrl: "",
      filterOptions: ["SaaS & AI Tools", "B2B Services", "Design", "Marketing", "Lifestyle"],
    },
    {
      id: "2",
      type: "Features",
      title: "Find the perfect perk for your startup",
      subtitle: "",
      content: "Filter by category, deal type, and what's right for your business.",
      imageUrl: "",
      filterOptions: [],
    },
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      type: "Custom",
      title: "New Section",
      subtitle: "",
      content: "",
      imageUrl: "",
      filterOptions: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Perks Page</h1>
        <p className="text-muted-foreground">Manage sections, text, images, and filters for your perks page</p>
      </div>

      <div className="space-y-4 mb-6">
        {sections.map((section) => (
          <Card key={section.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{section.type}</h3>
                  <p className="text-sm text-muted-foreground">{section.title}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSection(section.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Section Type</label>
                  <Input
                    value={section.type}
                    onChange={(e) => updateSection(section.id, { type: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Subtitle</label>
                  <Input
                    value={section.subtitle}
                    onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Image URL</label>
                  <Input
                    value={section.imageUrl}
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Content</label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-20"
                />
              </div>

              {section.filterOptions.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Filter Categories</label>
                  <div className="space-y-2">
                    {section.filterOptions.map((option, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...section.filterOptions];
                            newOptions[idx] = e.target.value;
                            updateSection(section.id, { filterOptions: newOptions });
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newOptions = section.filterOptions.filter((_, i) => i !== idx);
                            updateSection(section.id, { filterOptions: newOptions });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      const newOptions = [...section.filterOptions, "New Category"];
                      updateSection(section.id, { filterOptions: newOptions });
                    }}
                  >
                    Add Category
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={addSection} className="gap-2 mb-8">
        <Plus className="w-4 h-4" />
        Add Section
      </Button>

      <div className="flex gap-3">
        <Button variant="outline">Save as Draft</Button>
        <Button className="bg-amber-400 hover:bg-amber-500 text-black">
          Publish Changes
        </Button>
      </div>
    </div>
  );
}
