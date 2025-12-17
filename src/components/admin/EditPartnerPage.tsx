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
  iconUrl: string;
  ctaText: string;
  ctaLink: string;
  items: Array<{ label: string; description: string }>;
}

export default function EditPartnerPage() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      type: "Hero",
      title: "Reach the founders building tomorrow",
      subtitle: "Partner with us",
      content: "Join 200+ brands offering exclusive perks to our community of 50,000+ founders, freelancers, and remote teams.",
      imageUrl: "",
      iconUrl: "",
      ctaText: "Become a Partner",
      ctaLink: "#apply",
      items: [],
    },
    {
      id: "2",
      type: "Benefits",
      title: "Benefits for your brand",
      subtitle: "Why partner with us",
      content: "Grow your business by reaching our engaged audience.",
      imageUrl: "",
      iconUrl: "",
      ctaText: "",
      ctaLink: "",
      items: [
        { label: "Reach Decision Makers", description: "Connect with founders and team leads." },
        { label: "Drive Conversions", description: "Our audience is ready to buy." },
        { label: "Build Brand Loyalty", description: "Create lasting relationships." },
        { label: "Global Exposure", description: "Reach a worldwide audience." },
      ],
    },
    {
      id: "3",
      type: "Process",
      title: "Simple partnership process",
      subtitle: "How it works",
      content: "Get started in 4 easy steps.",
      imageUrl: "",
      iconUrl: "",
      ctaText: "",
      ctaLink: "",
      items: [
        { label: "Apply", description: "Fill out the form with your offer details." },
        { label: "Review", description: "We review within 24 hours." },
        { label: "Launch", description: "Your perk goes live to our audience." },
        { label: "Grow", description: "Track and optimize performance." },
      ],
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
      iconUrl: "",
      ctaText: "",
      ctaLink: "",
      items: [],
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Partner Page</h1>
        <p className="text-muted-foreground">Manage sections, content, images, icons, and items for your partner page</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Icon URL</label>
                  <Input
                    value={section.iconUrl}
                    placeholder="https://example.com/icon.svg"
                    onChange={(e) => updateSection(section.id, { iconUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">CTA Button Text</label>
                  <Input
                    value={section.ctaText}
                    onChange={(e) => updateSection(section.id, { ctaText: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">CTA Link</label>
                <Input
                  value={section.ctaLink}
                  onChange={(e) => updateSection(section.id, { ctaLink: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-20"
                />
              </div>

              {section.items.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Items</label>
                  <div className="space-y-3">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="space-y-2 p-3 border rounded">
                        <Input
                          placeholder="Item Label"
                          value={item.label}
                          onChange={(e) => {
                            const newItems = [...section.items];
                            newItems[idx].label = e.target.value;
                            updateSection(section.id, { items: newItems });
                          }}
                        />
                        <Textarea
                          placeholder="Item Description"
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...section.items];
                            newItems[idx].description = e.target.value;
                            updateSection(section.id, { items: newItems });
                          }}
                          className="min-h-16"
                        />
                      </div>
                    ))}
                  </div>
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
