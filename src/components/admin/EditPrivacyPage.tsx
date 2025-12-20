"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Section {
  id: string;
  heading: string;
  slug: string;
  content: string;
}

export default function EditPrivacyPage() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      heading: "Privacy Policy",
      slug: "privacy-policy",
      content: "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.",
    },
    {
      id: "2",
      heading: "Information We Collect",
      slug: "information-we-collect",
      content: "We collect information you provide directly to us, such as when you create an account or contact us.",
    },
    {
      id: "3",
      heading: "How We Use Your Information",
      slug: "how-we-use-your-information",
      content: "We use the information we collect to provide, maintain, and improve our services.",
    },
    {
      id: "4",
      heading: "Data Security",
      slug: "data-security",
      content: "We take reasonable measures to protect your personal information from unauthorized access.",
    },
  ]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      heading: "New Section",
      slug: "",
      content: "",
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Privacy Policy Page</h1>
        <p className="text-muted-foreground">Manage sections and content for your privacy policy page</p>
      </div>

      <div className="space-y-4 mb-6">
        {sections.map((section) => (
          <Card key={section.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{section.heading}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSection(section.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Section Heading</label>
                <Input
                  value={section.heading}
                  onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">URL Slug</label>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      placeholder="section-slug"
                      value={section.slug}
                      onChange={(e) => updateSection(section.id, { slug: e.target.value })}
                      className="mb-1"
                    />
                    <p className="text-xs text-muted-foreground">Edit manually or auto-generate from heading</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateSection(section.id, { slug: generateSlug(section.heading) })}
                    className="whitespace-nowrap"
                  >
                    Auto-generate
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Content</label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-32"
                />
              </div>
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
