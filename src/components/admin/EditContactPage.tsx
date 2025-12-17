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
  formTitle: string;
  formDescription: string;
}

export default function EditContactPage() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      type: "Hero",
      title: "We'd love to hear from you",
      subtitle: "Contact us",
      content: "Whether you have a question about perks, partnerships, or anything else—our team is ready to help.",
      imageUrl: "",
      formTitle: "Send us a message",
      formDescription: "Fill out the form below and we'll get back to you shortly.",
    },
    {
      id: "2",
      type: "Support Section",
      title: "Multiple ways to get support",
      subtitle: "",
      content: "Choose the best way to reach us.",
      imageUrl: "",
      formTitle: "",
      formDescription: "",
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
      formTitle: "",
      formDescription: "",
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Contact Page</h1>
        <p className="text-muted-foreground">Manage sections, text, and images for your contact page</p>
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
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-20"
                />
              </div>

              {section.formTitle && (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Form Title</label>
                    <Input
                      value={section.formTitle}
                      onChange={(e) => updateSection(section.id, { formTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Form Description</label>
                    <Textarea
                      value={section.formDescription}
                      onChange={(e) => updateSection(section.id, { formDescription: e.target.value })}
                      className="min-h-16"
                    />
                  </div>
                </>
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
