"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setMetaTags } from "@/lib/meta-tags";
import StaticPrivacyHero from "@/components/StaticPrivacyHero";

interface Section {
  id: string;
  heading: string;
  slug: string;
  content: string;
}

interface ContentData {
  sections: Section[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

export default function Privacy() {
  const [privacyContent, setPrivacyContent] = useState<ContentData | null>(null);
  const [termsContent, setTermsContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [privacyRes, termsRes] = await Promise.all([
          fetch("/api/privacy-content"),
          fetch("/api/terms-content"),
        ]);

        if (privacyRes.ok) {
          const privacyData = await privacyRes.json();
          setPrivacyContent(privacyData);
        }

        if (termsRes.ok) {
          const termsData = await termsRes.json();
          setTermsContent(termsData);
        }
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const currentContent = activeTab === "privacy" ? privacyContent : termsContent;
    if (currentContent?.seo) {
      setMetaTags(
        currentContent.seo.metaTitle,
        currentContent.seo.metaDescription
      );
    }
  }, [activeTab, privacyContent, termsContent]);

  const currentContent = activeTab === "privacy" ? privacyContent : termsContent;

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-[#fcfaf7] min-h-screen">
          <StaticPrivacyHero />
          <section className="py-12 sm:py-16 bg-[#f5f3f0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#6b6f76]">
              Loading privacy information...
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <StaticPrivacyHero />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Legal & Privacy Center
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Understand how we protect your information and your rights
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Choose a policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex gap-3 mb-8">
              {/* Terms of Service Tab */}
              <button
                onClick={() => setActiveTab("terms")}
                className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === "terms"
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white"
                }`}
              >
                Terms of Service
              </button>

              {/* Privacy Policy Tab */}
              <button
                onClick={() => setActiveTab("privacy")}
                className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === "privacy"
                    ? "bg-yellow-400 text-gray-900 shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-gray-900"
                }`}
              >
                Privacy Policy
              </button>
            </div>

            {/* Content Card */}
            {currentContent?.sections && currentContent.sections.length > 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Content */}
                <div className="p-8 md:p-12">
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wider mb-2">
                      {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {activeTab === "privacy" 
                        ? "Your Privacy Matters"
                        : "Our Terms & Conditions"
                      }
                    </h2>
                    <p className="text-lg text-gray-600">
                      {activeTab === "privacy"
                        ? "Learn how we collect, use, and protect your personal information"
                        : "Please review these terms carefully before using our services"
                      }
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-8">
                    {currentContent.sections.map((section, index) => (
                      <div key={section.id} className="scroll-mt-20">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-yellow-100">
                              <span className="text-yellow-600 font-bold">{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {section.heading}
                            </h3>
                            {section.slug && (
                              <p className="text-base text-gray-600 mb-4 font-medium">
                                {section.slug}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="ml-14 text-gray-700 whitespace-pre-wrap leading-relaxed space-y-4">
                          {section.content}
                        </div>
                        {index < currentContent.sections.length - 1 && (
                          <div className="mt-8 pt-8 border-t border-gray-100" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer Info */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleDateString()} • If you have any questions, please contact us
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <p className="text-muted-foreground">
                  No {activeTab === "privacy" ? "privacy policy" : "terms of service"} content available.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
