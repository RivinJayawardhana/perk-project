"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setMetaTags } from "@/lib/meta-tags";

interface PrivacySection {
  id: string;
  heading: string;
  slug: string;
  content: string;
}

interface PrivacyContent {
  sections: PrivacySection[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

export default function Privacy() {
  const [content, setContent] = useState<PrivacyContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/privacy-content");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContent(data);
        // Set meta tags when content loads
        if (data.seo) {
          setMetaTags(data.seo.metaTitle, data.seo.metaDescription);
        }
      } catch (error) {
        console.error("Error loading privacy content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-amber-50 to-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Privacy Policy & Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy and trust are important to us. Please read our policies carefully.
              </p>
            </div>

            <div className="space-y-12">
              {content?.sections && content.sections.length > 0 ? (
                content.sections.map((section) => (
                  <div key={section.id} className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {section.heading}
                    </h2>
                    <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No privacy policy content available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
