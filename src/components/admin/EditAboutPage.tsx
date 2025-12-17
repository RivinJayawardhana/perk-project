"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
}

interface Stat {
  id: string;
  value: string;
  label: string;
}

interface SectionData {
  id: string;
  type: "hero" | "stats" | "features" | "audience" | "cta";
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  stats?: Stat[];
  features?: Feature[];
  backgroundImage?: string;
}

export default function EditAboutPage() {
  const [tab, setTab] = useState<"content" | "seo">("content");
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: "1",
      type: "hero",
      title: "Empowering founders to build faster",
      subtitle: "About VentureNext",
      description: "We believe every founder deserves access to premium tools and services without breaking the bank. That's why we built VentureNext.",
      backgroundImage: "",
    },
    {
      id: "2",
      type: "stats",
      title: "",
      subtitle: "",
      description: "",
      stats: [
        { id: "s1", value: "500+", label: "Exclusive Perks" },
        { id: "s2", value: "50K+", label: "Active Users" },
        { id: "s3", value: "$2M+", label: "Saved by Users" },
        { id: "s4", value: "200+", label: "Partner Brands" },
      ],
    },
    {
      id: "3",
      type: "features",
      title: "Connecting founders with value",
      subtitle: "What we do",
      description: "VentureNext is the marketplace where ambition meets opportunity.",
      features: [
        { id: "f1", title: "Curate Premium Perks", description: "We handpick and negotiate exclusive deals with top-tier brands.", iconUrl: "" },
        { id: "f2", title: "Build Partnerships", description: "We connect ambitious founders with brands that support growth.", iconUrl: "" },
        { id: "f3", title: "Deliver Instant Value", description: "No complicated sign-ups. Start saving immediately.", iconUrl: "" },
      ],
    },
    {
      id: "4",
      type: "audience",
      title: "Built for builders",
      subtitle: "Who we serve",
      description: "Our community includes the most ambitious people creating the future of work.",
      features: [
        { id: "a1", title: "Startup Founders", description: "Early-stage to growth-stage founders looking for tools to scale.", iconUrl: "" },
        { id: "a2", title: "Freelancers", description: "Independent professionals seeking premium services.", iconUrl: "" },
        { id: "a3", title: "Solopreneurs", description: "Solo business owners who need enterprise-level tools.", iconUrl: "" },
        { id: "a4", title: "Remote Teams", description: "Distributed teams looking for productivity tools.", iconUrl: "" },
      ],
    },
    {
      id: "5",
      type: "cta",
      title: "Ready to start saving?",
      subtitle: "",
      description: "Join thousands of founders already using VentureNext to unlock exclusive perks.",
      ctaText: "Explore Perks",
      ctaLink: "/perks",
    },
  ]);

  const [seoData, setSeoData] = useState({
    metaTitle: "About VentureNext | Empowering Founders",
    metaDescription: "Learn about VentureNext and how we help founders access premium tools and services.",
    keywords: "about, founders, perks, VentureNext",
    canonicalUrl: "/about",
  });

  const addSection = (type: SectionData["type"]) => {
    const newSection: SectionData = {
      id: Date.now().toString(),
      type,
      title: "New Section",
      subtitle: "",
      description: "",
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, updates: Partial<SectionData>) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const addFeature = (sectionId: string) => {
    setSections(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            features: [
              ...(s.features || []),
              { id: Date.now().toString(), title: "New Feature", description: "", iconUrl: "" },
            ],
          };
        }
        return s;
      })
    );
  };

  const updateFeature = (sectionId: string, featureId: string, updates: Partial<Feature>) => {
    setSections(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            features: s.features?.map((f) =>
              f.id === featureId ? { ...f, ...updates } : f
            ),
          };
        }
        return s;
      })
    );
  };

  const deleteFeature = (sectionId: string, featureId: string) => {
    setSections(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            features: s.features?.filter((f) => f.id !== featureId),
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background border-b z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit About Us</h1>
            <p className="text-sm text-muted-foreground">Customize content and SEO for /about</p>
          </div>
          <Button className="bg-black text-white hover:bg-black/90 gap-2">
            💾 Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "content" | "seo")} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="content">Page Content</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-foreground">Add Section:</span>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addSection("hero")}
              >
                🎨 Hero Section
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addSection("stats")}
              >
                📊 Stats Section
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addSection("features")}
              >
                ✨ Features
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addSection("audience")}
              >
                👥 Audience
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addSection("cta")}
              >
                🎯 Call to Action
              </Button>
            </div>

            <div className="space-y-6">
              {sections.map((section, idx) => (
                <Card key={section.id} className="p-6">
                  <div className="space-y-6">
                    {/* Section Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <GripVertical className="w-5 h-5 text-muted-foreground mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground capitalize">
                            {section.type === "cta" ? "Call to Action" : section.type} Section
                          </h3>
                          <p className="text-sm text-muted-foreground">{section.title}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>

                    {/* Common Fields */}
                    {section.type !== "stats" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Title</label>
                            <Input
                              value={section.title}
                              onChange={(e) => updateSection(section.id, { title: e.target.value })}
                              placeholder="Section title"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Subtitle</label>
                            <Input
                              value={section.subtitle}
                              onChange={(e) => updateSection(section.id, { subtitle: e.target.value })}
                              placeholder="Optional subtitle"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea
                            value={section.description}
                            onChange={(e) => updateSection(section.id, { description: e.target.value })}
                            placeholder="Section description"
                            className="min-h-20"
                          />
                        </div>
                      </>
                    )}

                    {/* Stats Fields */}
                    {section.type === "stats" && section.stats && (
                      <div>
                        <label className="text-sm font-medium mb-3 block">Statistics</label>
                        <div className="space-y-3">
                          {section.stats.map((stat) => (
                            <div key={stat.id} className="grid grid-cols-2 gap-3 p-3 border rounded bg-muted/30">
                              <div>
                                <label className="text-xs font-medium mb-1 block">Value</label>
                                <Input
                                  value={stat.value}
                                  onChange={(e) => {
                                    const newStats = section.stats?.map((s) =>
                                      s.id === stat.id ? { ...s, value: e.target.value } : s
                                    );
                                    updateSection(section.id, { stats: newStats });
                                  }}
                                  placeholder="500+"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium mb-1 block">Label</label>
                                <Input
                                  value={stat.label}
                                  onChange={(e) => {
                                    const newStats = section.stats?.map((s) =>
                                      s.id === stat.id ? { ...s, label: e.target.value } : s
                                    );
                                    updateSection(section.id, { stats: newStats });
                                  }}
                                  placeholder="Exclusive Perks"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features/Audience Fields */}
                    {(section.type === "features" || section.type === "audience") && section.features && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-medium">
                            {section.type === "features" ? "Features" : "Audience Types"}
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addFeature(section.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" /> Add Item
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {section.features.map((feature) => (
                            <div key={feature.id} className="p-4 border rounded space-y-3 bg-muted/30">
                              <div className="flex items-start justify-between">
                                <Input
                                  value={feature.title}
                                  onChange={(e) => updateFeature(section.id, feature.id, { title: e.target.value })}
                                  placeholder="Feature title"
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteFeature(section.id, feature.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                              <Textarea
                                value={feature.description}
                                onChange={(e) => updateFeature(section.id, feature.id, { description: e.target.value })}
                                placeholder="Feature description"
                                className="min-h-16"
                              />
                              <div>
                                <label className="text-xs font-medium mb-1 block">Icon URL</label>
                                <Input
                                  value={feature.iconUrl}
                                  onChange={(e) => updateFeature(section.id, feature.id, { iconUrl: e.target.value })}
                                  placeholder="https://example.com/icon.svg"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Fields */}
                    {section.type === "cta" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">CTA Text</label>
                          <Input
                            value={section.ctaText || ""}
                            onChange={(e) => updateSection(section.id, { ctaText: e.target.value })}
                            placeholder="Button text"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">CTA Link</label>
                          <Input
                            value={section.ctaLink || ""}
                            onChange={(e) => updateSection(section.id, { ctaLink: e.target.value })}
                            placeholder="/perks"
                          />
                        </div>
                      </div>
                    )}

                    {/* Background Image */}
                    {(section.type === "hero" || section.type === "cta") && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Background Image (Optional)</label>
                        <Input
                          value={section.backgroundImage || ""}
                          onChange={(e) => updateSection(section.id, { backgroundImage: e.target.value })}
                          placeholder="https://example.com/bg.jpg"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">SEO Settings</h3>
              <div>
                <label className="text-sm font-medium mb-2 block">Meta Title</label>
                <Input
                  value={seoData.metaTitle}
                  onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">{seoData.metaTitle.length}/60 characters</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Meta Description</label>
                <Textarea
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                  maxLength={160}
                  className="min-h-20"
                />
                <p className="text-xs text-muted-foreground mt-1">{seoData.metaDescription.length}/160 characters</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Keywords</label>
                <Input
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Canonical URL</label>
                <Input
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                  placeholder="/about"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
