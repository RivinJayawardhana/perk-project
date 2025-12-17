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
  stats: Array<{ label: string; value: string }>;
}

export default function EditAboutPage() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      type: "Hero",
      title: "Empowering founders to build faster",
      subtitle: "About VentureNext",
      content: "We believe every founder deserves access to premium tools and services without breaking the bank. That's why we built VentureNext.",
      imageUrl: "",
      iconUrl: "",
      stats: [
        { label: "Exclusive Perks", value: "500+" },
        { label: "Active Users", value: "50K+" },
        { label: "Saved by Users", value: "$2M+" },
        { label: "Partner Brands", value: "200+" },
      ],
    },
    {
      id: "2",
      type: "What We Do",
      title: "Connecting founders with value",
      subtitle: "What we do",
      content: "VentureNext is the marketplace where ambition meets opportunity.",
      imageUrl: "",
      iconUrl: "",
      stats: [],
    },
    {
      id: "3",
      type: "Who We Serve",
      title: "Built for builders",
      subtitle: "Who we serve",
      content: "Our community includes the most ambitious people creating the future of work.",
      imageUrl: "",
      iconUrl: "",
      stats: [],
    },
    {
      id: "4",
      type: "CTA Section",
      title: "Ready to start saving?",
      subtitle: "",
      content: "Join thousands of founders getting exclusive deals.",
      imageUrl: "",
      iconUrl: "",
      stats: [],
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
      stats: [],
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit About Page</h1>
        <p className="text-muted-foreground">Manage sections, content, images, icons, and text for your about page</p>
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
                <label className="text-sm font-medium mb-1 block">Icon URL</label>
                <Input
                  value={section.iconUrl}
                  placeholder="https://example.com/icon.svg"
                  onChange={(e) => updateSection(section.id, { iconUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Content / Description</label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  className="min-h-24"
                />
              </div>

              {section.stats.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Statistics</label>
                  <div className="space-y-2">
                    {section.stats.map((stat, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Label"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...section.stats];
                            newStats[idx].label = e.target.value;
                            updateSection(section.id, { stats: newStats });
                          }}
                        />
                        <Input
                          placeholder="Value"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...section.stats];
                            newStats[idx].value = e.target.value;
                            updateSection(section.id, { stats: newStats });
                          }}
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
