"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react";

interface AboutPageContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
  };
  stats: Array<{ value: string; label: string }>;
  whatWeDo: {
    subtitle: string;
    title: string;
    description: string;
    features: Array<{ title: string; description: string }>;
  };
  whoWeServe: {
    subtitle: string;
    title: string;
    description: string;
    audiences: Array<{ title: string; description: string }>;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  seo?: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
    ogType?: string;
  };
}

type SectionType = "hero" | "stats" | "whatWeDo" | "whoWeServe" | "cta";

export default function EditAboutPage() {
  const { toast } = useToast();
  const { upload, isUploading } = useImageUpload();
  const ogImageInputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType | "seo">("seo");

  const sections: { id: SectionType | "seo"; label: string }[] = [
    { id: "seo", label: "SEO" },
    { id: "hero", label: "Hero" },
    { id: "stats", label: "Statistics" },
    { id: "whatWeDo", label: "What We Do" },
    { id: "whoWeServe", label: "Who We Serve" },
    { id: "cta", label: "Call to Action" },
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/about-content");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContent(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [toast]);

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    try {
      const res = await fetch("/api/about-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error("Failed to save");

      // Trigger immediate cache revalidation
      await fetch("/api/revalidate?path=/about", { method: "POST" });

      toast({
        title: "Success",
        description: "About page updated successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#e6b756]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Selection Tabs */}
      <div className="border-b border-[#e5e7eb] bg-white rounded-t-xl">
        <div className="flex gap-0">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 font-medium text-sm transition-all border-b-2 ${
                activeSection === section.id
                  ? "text-[#23272f] border-b-[#23272f]"
                  : "text-[#9ca3af] border-b-transparent hover:text-[#6b7280]"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEO Section Content */}
      {activeSection === "seo" && (
        <div className="bg-white rounded-b-xl shadow-sm p-6 border border-t-0">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6">SEO Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Meta Title</label>
              <Input
                value={content.seo?.metaTitle || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    seo: { ...content.seo, metaTitle: e.target.value } as any,
                  })
                }
                placeholder="e.g., About VentureNext - Empowering Founders"
              />
              <p className="text-xs text-[#6b7280] mt-1">Recommended: 30-60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Meta Description</label>
              <Textarea
                value={content.seo?.metaDescription || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    seo: { ...content.seo, metaDescription: e.target.value } as any,
                  })
                }
                placeholder="e.g., Learn about VentureNext and how we're connecting founders..."
                rows={3}
              />
              <p className="text-xs text-[#6b7280] mt-1">Recommended: 120-160 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">OG Image</label>
              {content.seo?.ogImage && (
                <div className="mb-3 relative w-full max-w-xs">
                  <img src={content.seo.ogImage} alt="OG Preview" className="w-full h-32 object-cover rounded-lg border border-[#e5e7eb]" />
                  <button
                    onClick={() => setContent({ ...content, seo: { ...content.seo, ogImage: "" } as any })}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <input
                ref={ogImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    toast({ title: "Uploading...", description: "Please wait" });
                    const url = await upload(file, "seo-images");
                    if (url) {
                      setContent({ ...content, seo: { ...content.seo, ogImage: url } as any });
                      toast({ title: "Success", description: "OG image uploaded" });
                    }
                  } catch (error) {
                    toast({ title: "Error", description: "Upload failed", variant: "destructive" });
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => ogImageInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {isUploading ? "Uploading..." : "Upload OG Image (1200x630)"}
              </Button>
              <p className="text-xs text-[#6b7280] mt-1">Recommended: 1200x630 px</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">OG Type</label>
              <select
                value={content.seo?.ogType || "website"}
                onChange={(e) =>
                  setContent({
                    ...content,
                    seo: { ...content.seo, ogType: e.target.value } as any,
                  })
                }
                className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e6b756]"
              >
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
              </select>
              <p className="text-xs text-[#6b7280] mt-1">Select the Open Graph type for this page</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section Content */}
      {activeSection === "hero" && (
        <div className="bg-white rounded-b-xl shadow-sm p-6 border border-t-0">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6 font-display">Hero Section</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Subtitle</label>
              <Input
                value={content.hero.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value },
                  })
                }
                placeholder="e.g., About VentureNext"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Title</label>
              <Input
                value={content.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value },
                  })
                }
                placeholder="e.g., Empowering founders to build faster"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Description</label>
              <Textarea
                value={content.hero.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, description: e.target.value },
                  })
                }
                placeholder="Hero section description"
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section Content */}
      {activeSection === "stats" && (
        <div className="bg-white rounded-b-xl shadow-sm p-6 border border-t-0">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6 font-display">Statistics Section</h2>

          <div className="space-y-4">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#f5f3f0] p-4 rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#23272f] mb-2">Value</label>
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const stats = [...content.stats];
                        stats[idx].value = e.target.value;
                        setContent({ ...content, stats });
                      }}
                      placeholder="e.g., 500+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#23272f] mb-2">Label</label>
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const stats = [...content.stats];
                        stats[idx].label = e.target.value;
                        setContent({ ...content, stats });
                      }}
                      placeholder="e.g., Exclusive Perks"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What We Do Section Content */}
      {activeSection === "whatWeDo" && (
        <div className="bg-white rounded-b-xl shadow-sm p-6 border border-t-0">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6 font-display">What We Do Section</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Subtitle</label>
              <Input
                value={content.whatWeDo.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whatWeDo: { ...content.whatWeDo, subtitle: e.target.value },
                  })
                }
                placeholder="e.g., What we do"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Title</label>
              <Input
                value={content.whatWeDo.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whatWeDo: { ...content.whatWeDo, title: e.target.value },
                  })
                }
                placeholder="e.g., Connecting founders with value"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Description</label>
              <Textarea
                value={content.whatWeDo.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whatWeDo: { ...content.whatWeDo, description: e.target.value },
                  })
                }
                placeholder="Section description"
                rows={2}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-[#23272f] mb-4">Features</h3>
            {content.whatWeDo.features.map((feature, idx) => (
              <div key={idx} className="bg-[#f5f3f0] p-4 rounded-lg mb-3 border">
                <Input
                  value={feature.title}
                  onChange={(e) => {
                    const features = [...content.whatWeDo.features];
                    features[idx].title = e.target.value;
                    setContent({
                      ...content,
                      whatWeDo: { ...content.whatWeDo, features },
                    });
                  }}
                  placeholder="Feature title"
                  className="mb-2"
                />
                <Textarea
                  value={feature.description}
                  onChange={(e) => {
                    const features = [...content.whatWeDo.features];
                    features[idx].description = e.target.value;
                    setContent({
                      ...content,
                      whatWeDo: { ...content.whatWeDo, features },
                    });
                  }}
                  placeholder="Feature description"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Who We Serve Section Content */}
      {activeSection === "whoWeServe" && (
        <div className="bg-white rounded-b-xl shadow-sm p-6 border border-t-0">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6 font-display">Who We Serve Section</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Subtitle</label>
              <Input
                value={content.whoWeServe.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whoWeServe: { ...content.whoWeServe, subtitle: e.target.value },
                  })
                }
                placeholder="e.g., Who we serve"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Title</label>
              <Input
                value={content.whoWeServe.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whoWeServe: { ...content.whoWeServe, title: e.target.value },
                  })
                }
                placeholder="e.g., Built for builders"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Description</label>
              <Textarea
                value={content.whoWeServe.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whoWeServe: { ...content.whoWeServe, description: e.target.value },
                  })
                }
                placeholder="Section description"
                rows={2}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-[#23272f] mb-4">Audiences</h3>
            {content.whoWeServe.audiences.map((audience, idx) => (
              <div key={idx} className="bg-[#f5f3f0] p-4 rounded-lg mb-3 border">
                <Input
                  value={audience.title}
                  onChange={(e) => {
                    const audiences = [...content.whoWeServe.audiences];
                    audiences[idx].title = e.target.value;
                    setContent({
                      ...content,
                      whoWeServe: { ...content.whoWeServe, audiences },
                    });
                  }}
                  placeholder="Audience title"
                  className="mb-2"
                />
                <Textarea
                  value={audience.description}
                  onChange={(e) => {
                    const audiences = [...content.whoWeServe.audiences];
                    audiences[idx].description = e.target.value;
                    setContent({
                      ...content,
                      whoWeServe: { ...content.whoWeServe, audiences },
                    });
                  }}
                  placeholder="Audience description"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section Content */}
      {activeSection === "cta" && (
        <div className="bg-white rounded-b-xl shadow-sm p-6 border border-t-0">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6 font-display">Call to Action Section</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Title</label>
              <Input
                value={content.cta.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    cta: { ...content.cta, title: e.target.value },
                  })
                }
                placeholder="e.g., Ready to start saving?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Description</label>
              <Textarea
                value={content.cta.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    cta: { ...content.cta, description: e.target.value },
                  })
                }
                placeholder="CTA description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-2">Button Text</label>
              <Input
                value={content.cta.buttonText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    cta: { ...content.cta, buttonText: e.target.value },
                  })
                }
                placeholder="e.g., Explore Perks"
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          className="bg-[#e6b756] text-[#1a2233]"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
