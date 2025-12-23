
"use client";

import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useHomeContent } from "@/hooks/useHomeContent";
import { usePerks } from "@/hooks/usePerks";
import { useJournals } from "@/hooks/useJournals";
import { setMetaTags } from "@/lib/meta-tags";

function HomeContent() {
  const { content, isLoading } = useHomeContent();
  const { data: allPerks = [] } = usePerks();
  const { data: allJournals = [] } = useJournals("published", 3);

  // Set meta tags when content loads
  useEffect(() => {
    if (content.seo) {
      setMetaTags(content.seo.metaTitle, content.seo.metaDescription);
    }
  }, [content.seo]);

  // Get first 4 perks as featured deals
  const featuredDeals = allPerks.slice(0, 4);
  
  // Get first 3 published journals as articles
  const journalArticles = allJournals.slice(0, 3);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="bg-[#fcfaf7] min-h-screen flex items-center justify-center">
          <div className="text-[#6b6f76]">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Hero Section */}
      <section className="bg-[#fcfaf7] py-12 sm:py-16 lg:py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Images - Hidden on mobile */}
            <div className="hidden lg:grid lg:col-span-3 gap-4 items-start">
              {/* Top Left Image */}
              <img 
                src={content.hero.heroImages[0]} 
                alt="Team work" 
                className="w-32 h-24 object-cover rounded-2xl shadow-lg transform -rotate-3 ml-4"
              />
              {/* Middle Left Image */}
              <img 
                src={content.hero.heroImages[1]} 
                alt="Workspace" 
                className="w-28 h-32 object-cover rounded-2xl shadow-lg transform rotate-2"
              />
              {/* Bottom Left Image */}
              <img 
                src={content.hero.heroImages[2]} 
                alt="Collaboration" 
                className="w-32 h-28 object-cover rounded-2xl shadow-lg transform -rotate-2 ml-4"
              />
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">
                <span className="bg-[#f8eac7] text-[#b48a1e] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold font-display">{content.hero.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#23272f] mb-4 sm:mb-6 leading-tight font-display">
                {content.hero.title.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <br className="hidden sm:block" />}
                    {idx === content.hero.title.split('\n').length - 1 && (
                      <span className="relative inline-block">
                        <span className="z-10 relative">{line}</span>
                        <span className="absolute left-0 right-0 bottom-0 h-2 bg-[#f8eac7] -z-10 rounded"></span>
                      </span>
                    )}
                    {idx < content.hero.title.split('\n').length - 1 && line}
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#6b6f76] mb-6 sm:mb-8 max-w-2xl">
                {content.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
                <Link href="/perks" className="w-full sm:w-auto">
                  <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:bg-[#f5d488] flex items-center justify-center gap-2 w-full">
                    {content.hero.buttonText1} <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base w-full sm:w-auto">{content.hero.buttonText2}</Button>
              </div>
            </div>

            {/* Right Images - Hidden on mobile */}
            <div className="hidden lg:grid lg:col-span-3 gap-4 items-start">
              {/* Top Right Image */}
              <img 
                src={content.hero.heroImages[3]} 
                alt="Office space" 
                className="w-32 h-24 object-cover rounded-2xl shadow-lg transform rotate-3 ml-auto mr-4"
              />
              {/* Middle Right Image */}
              <img 
                src={content.hero.heroImages[4]} 
                alt="Creative workspace" 
                className="w-28 h-32 object-cover rounded-2xl shadow-lg transform -rotate-3 ml-auto"
              />
              {/* Bottom Right Image */}
              <img 
                src={content.hero.heroImages[5]} 
                alt="Remote work setup" 
                className="w-32 h-28 object-cover rounded-2xl shadow-lg transform rotate-2 ml-auto mr-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-12 sm:py-16 bg-[#f5f3f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#23272f] font-display">{content.featuredDeals.title}</h2>
          <Link href="/perks" className="w-full sm:w-auto">
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto text-sm sm:text-base">View all perks <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredDeals.map((perk: any) => (
            <div key={perk.id} className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5 flex flex-col h-full relative">
              <img src={perk.image_url || "/images/placeholder.jpg"} alt={perk.name} className="w-full h-28 sm:h-32 object-cover rounded-xl mb-3 sm:mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <img src={perk.logo_url || "/images/placeholder.jpg"} alt={perk.name} className="w-7 sm:w-8 h-7 sm:h-8 rounded-full border flex-shrink-0" />
                <span className="font-semibold text-[#23272f] font-display text-sm sm:text-base line-clamp-1">{perk.name}</span>
              </div>
              <div className="text-xs sm:text-sm text-[#6b6f76] mb-2">{perk.category}</div>
              <div className="text-sm sm:text-base text-[#23272f] mb-2 font-display line-clamp-2">{perk.description}</div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-2">
                <span className="text-xs text-[#6b6f76] flex items-center gap-1"><span className="bg-[#f8eac7] text-[#b48a1e] px-2 py-0.5 rounded-full font-semibold text-xs">{perk.discount}</span></span>
                <span className="text-xs text-[#6b6f76]">{perk.expiry}</span>
              </div>
              <Link href="/perks" className="absolute right-3 sm:right-4 bottom-3 sm:bottom-4 text-[#e6b756] font-semibold font-display text-sm">Get deal →</Link>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#faf8f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#23272f] text-center mb-3 sm:mb-4 font-display">{content.howItWorks.title}</h2>
        <p className="text-[#6b6f76] text-center mb-8 sm:mb-10 text-sm sm:text-base">{content.howItWorks.subtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.howItWorks.steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center font-bold text-[#1a2233] mb-4 font-display">0{idx + 1}</div>
              <div className="text-lg sm:text-xl font-semibold mb-2 font-display">{step.title}</div>
              <div className="text-[#6b6f76] text-center text-sm sm:text-base">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Insights for founders */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f5f3f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#23272f] font-display">{content.insights.title}</h2>
          <Link href="/journal" className="w-full sm:w-auto">
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto text-sm sm:text-base">Read all articles <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {journalArticles.map((article) => (
            <Link key={article.id} href={`/journal/${article.slug}`} className="block">
              <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-5 flex flex-col h-full relative hover:shadow-md transition-shadow">
                <img src={article.featured_image_url || "/images/placeholder.jpg"} alt={article.title} className="w-full h-28 sm:h-32 object-cover rounded-xl mb-3 sm:mb-4" />
                <span className="absolute left-3 sm:left-4 top-3 sm:top-4 bg-[#f8eac7] text-[#b48a1e] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold font-display">{article.category || "Insights"}</span>
                <div className="text-base sm:text-lg font-semibold text-[#23272f] mb-2 font-display line-clamp-2">{article.title}</div>
                <div className="text-[#6b6f76] mb-2 text-xs sm:text-sm line-clamp-2">{article.excerpt || article.content?.substring(0, 100)}</div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6b6f76] mt-auto">
                  <span className="truncate">{article.author || "Admin"}</span>
                  <span>•</span>
                  <span>{article.read_time || "5 min read"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </section>

      {/* CTA Cards */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-[#1a2233] rounded-2xl p-8 sm:p-10 flex flex-col justify-between text-white shadow-md">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#e6b756] text-[#1a2233] rounded-full p-2"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 7a4 4 0 1 0-8 0v2a4 4 0 1 0 8 0V7Z" stroke="#1a2233" strokeWidth="1.5"/><path d="M12 17v2m-6 0h12" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
              <span className="text-base sm:text-lg font-semibold font-display">{content.ctaCards.card1.title}</span>
            </div>
            <div className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold font-display text-[#e6b756]">{content.ctaCards.card1.buttonText}</div>
            <div className="text-sm sm:text-base text-[#c7c9d1] mb-6 font-display">{content.ctaCards.card1.description}</div>
          </div>
          <Link href="/perks">
            <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 py-2 rounded-full hover:bg-[#f5d488] font-display w-full sm:w-auto">{content.ctaCards.card1.buttonText}</Button>
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-2"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 7a4 4 0 1 0-8 0v2a4 4 0 1 0 8 0V7Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M12 17v2m-6 0h12" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
              <span className="text-base sm:text-lg font-semibold text-[#23272f] font-display">{content.ctaCards.card2.title}</span>
            </div>
            <div className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold font-display text-[#23272f]">{content.ctaCards.card2.buttonText}</div>
            <div className="text-sm sm:text-base text-[#6b6f76] mb-6 font-display">{content.ctaCards.card2.description}</div>
          </div>
          <Link href="/partner">
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full font-semibold font-display w-full sm:w-auto">{content.ctaCards.card2.buttonText}</Button>
          </Link>
        </div>
      </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="bg-[#fcfaf7] min-h-screen flex items-center justify-center">
          <div className="text-[#6b6f76]">Loading...</div>
        </main>
        <Footer />
      </>
    }>
      <HomeContent />
    </Suspense>
  );
}
