"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ContactPageContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
  };
}

export default function EditContactPage() {
  const { toast } = useToast();
  const [content, setContent] = useState<ContactPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact-content");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContent(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    try {
      setSaving(true);
      const res = await fetch("/api/contact-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error("Failed to save content");

      toast({
        title: "Success",
        description: "Contact page updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-[#e6b756]" />
          <p className="text-[#6b6f76]">Loading contact page content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border">
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
              placeholder="e.g., Contact us"
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
              placeholder="e.g., We'd love to hear from you"
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
              placeholder="e.g., Whether you have a question about perks, partnerships, or anything else—our team is ready to help."
              rows={3}
            />
          </div>
        </div>
      </div>

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
