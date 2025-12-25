
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { setMetaTags } from "@/lib/meta-tags";
import StaticAboutHero from "@/components/StaticAboutHero";

interface AboutContent {
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
}

export default function About() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/about-content");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContent(data);
        // Set meta tags when content loads
        if (data.seo) {
          setMetaTags(data.seo.metaTitle, data.seo.metaDescription);
        }
      } catch (error) {
        console.error("Error loading about content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading || !content) {
    return (
      <>
        <Header />
        <main className="bg-[#fcfaf7] min-h-screen">
          <StaticAboutHero />
          <div className="text-center py-10 text-[#6b6f76]">Loading about content...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7]">
      {/* Hero Section */}
      <StaticAboutHero />

      {/* Stats Section */}
      <section className="bg-[#1a2233] py-10 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center px-4 sm:px-6 lg:px-8">
          {content.stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e6b756] mb-1 sm:mb-2 font-display">{stat.value}</div>
            <div className="text-[#e6b756] text-opacity-80 text-xs sm:text-sm">{stat.label}</div>
          </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f5f3f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-2 sm:mb-3 text-[#e6b756] font-semibold text-center text-sm sm:text-base font-display">{content.whatWeDo.subtitle}</div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#23272f] text-center mb-2 sm:mb-4 font-display">{content.whatWeDo.title}</h2>
        <p className="text-[#6b6f76] text-center mb-8 sm:mb-10 text-sm sm:text-base">{content.whatWeDo.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {content.whatWeDo.features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-2 sm:p-3 mb-3 sm:mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#b48a1e" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>

              <div className="text-base sm:text-lg font-semibold mb-2 font-display">{feature.title}</div>
            <div className="text-[#6b6f76] text-center text-sm sm:text-base">{feature.description}</div>
          </div>
          ))}
        </div>
      </div>
      </section>

      {/* Who we serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-2 sm:mb-3 text-[#e6b756] font-semibold text-center text-sm sm:text-base font-display">{content.whoWeServe.subtitle}</div>
       
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#23272f] text-center mb-2 sm:mb-4 font-display">{content.whoWeServe.title}</h2>
        <p className="text-[#6b6f76] text-center mb-8 sm:mb-10 text-sm sm:text-base">{content.whoWeServe.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {content.whoWeServe.audiences.map((audience, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-2 sm:p-3 mb-3 sm:mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M8.5 11.5a3.5 3.5 0 0 1 7 0c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5Z" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
      
              <div className="text-base sm:text-lg font-semibold mb-2 font-display">{audience.title}</div>
            <div className="text-[#6b6f76] text-center text-sm sm:text-base">{audience.description}</div>
          </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-[#1a2233] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-white text-center">
         
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display">{content.cta.title}</h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base text-[#e6b756]">{content.cta.description}</p>
          <Link href="/perks">
            <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#f5d488] w-full sm:w-auto">{content.cta.buttonText}</Button>
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
