import { useState } from "react";
import { Plus, Trash2, GripVertical, Image as ImageIcon, Type, Megaphone, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface PageSection {
  id: string;
  type: "hero" | "text" | "cta" | "features";
  title: string;
  content: string;
  ctaText: string;
  ctaLink: string;
}

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const sectionTypes = [
  { 
    type: "hero", 
    label: "Hero Section", 
    icon: ImageIcon, 
    description: "Large banner section with title and CTA" 
  },
  { 
    type: "text", 
    label: "Text Block", 
    icon: Type, 
    description: "Rich text content section" 
  },
  { 
    type: "cta", 
    label: "Call to Action", 
    icon: Megaphone, 
    description: "Prominent action button section" 
  },
  { 
    type: "features", 
    label: "Features", 
    icon: Grid3X3, 
    description: "Feature grid or list section" 
  },
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("content");
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: "1",
      type: "hero",
      title: "About Founder Perks",
      content: "We are dedicated to helping founders and startups succeed by providing exclusive access to premium tools and services at discounted rates.",
      ctaText: "Button text",
      ctaLink: "/contact",
    },
  ]);

  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: "About Us - PerksAdmin",
    metaDescription: "Learn more about PerksAdmin and our mission to help founders succeed with exclusive perks and benefits.",
    keywords: "about us, founder perks, startup benefits, company information",
    ogTitle: "About PerksAdmin - Founder Perks Platform",
    ogDescription: "Discover our story and mission to support startup founders with curated perks and benefits.",
    ogImage: "",
  });

  const addSection = (type: string) => {
    const newSection: PageSection = {
      id: Date.now().toString(),
      type: type as PageSection["type"],
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: "Enter your content here...",
      ctaText: type === "cta" || type === "hero" ? "Button text" : "",
      ctaLink: type === "cta" || type === "hero" ? "/" : "",
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, field: keyof PageSection, value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const updateSEO = (field: keyof SEOSettings, value: string) => {
    setSeoSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    // Here you would save to your backend/database
    console.log("Saving About Us page:", { sections, seoSettings });
    // Show success message
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Edit About Us</h1>
          <p className="text-muted-foreground">Customize content and SEO for /about</p>
        </div>
        <Button onClick={saveChanges} className="bg-yellow-600 hover:bg-yellow-700">
          <span className="mr-2">💾</span>
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="seo" className="text-muted-foreground">SEO Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Section:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sectionTypes.map((sectionType) => (
                  <Button
                    key={sectionType.type}
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                    onClick={() => addSection(sectionType.type)}
                  >
                    <sectionType.icon className="w-5 h-5" />
                    <span className="text-sm">{sectionType.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <Card key={section.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                    <span className="font-medium capitalize">{section.type} Section</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSection(section.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${section.id}`}>Title</Label>
                      <Input
                        id={`title-${section.id}`}
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        placeholder="Section title"
                        className="bg-gray-50"
                      />
                    </div>
                    
                    {(section.type === "hero" || section.type === "cta") && (
                      <div className="space-y-2">
                        <Label htmlFor={`cta-text-${section.id}`}>CTA Text</Label>
                        <Input
                          id={`cta-text-${section.id}`}
                          value={section.ctaText}
                          onChange={(e) => updateSection(section.id, 'ctaText', e.target.value)}
                          placeholder="Button text"
                          className="bg-gray-50"
                        />
                      </div>
                    )}
                  </div>

                  {section.type !== "hero" && (
                    <div className="space-y-2">
                      <Label htmlFor={`content-${section.id}`}>Content</Label>
                      <Textarea
                        id={`content-${section.id}`}
                        value={section.content}
                        onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                        placeholder="Enter your content here..."
                        rows={4}
                        className="bg-gray-50"
                      />
                    </div>
                  )}

                  {(section.type === "hero" || section.type === "cta") && (
                    <div className="space-y-2">
                      <Label htmlFor={`cta-link-${section.id}`}>CTA Link</Label>
                      <Input
                        id={`cta-link-${section.id}`}
                        value={section.ctaLink}
                        onChange={(e) => updateSection(section.id, 'ctaLink', e.target.value)}
                        placeholder="/contact"
                        className="bg-gray-50"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={seoSettings.metaTitle}
                    onChange={(e) => updateSEO('metaTitle', e.target.value)}
                    placeholder="Page title for search engines"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={seoSettings.keywords}
                    onChange={(e) => updateSEO('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoSettings.metaDescription}
                  onChange={(e) => updateSEO('metaDescription', e.target.value)}
                  placeholder="Brief description for search engine results"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Open Graph (Social Media)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="og-title">OG Title</Label>
                    <Input
                      id="og-title"
                      value={seoSettings.ogTitle}
                      onChange={(e) => updateSEO('ogTitle', e.target.value)}
                      placeholder="Title when shared on social media"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="og-image">OG Image URL</Label>
                    <Input
                      id="og-image"
                      value={seoSettings.ogImage}
                      onChange={(e) => updateSEO('ogImage', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og-description">OG Description</Label>
                  <Textarea
                    id="og-description"
                    value={seoSettings.ogDescription}
                    onChange={(e) => updateSEO('ogDescription', e.target.value)}
                    placeholder="Description when shared on social media"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}