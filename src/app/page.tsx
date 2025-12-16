
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const featuredDeals = [
  {
    id: 1,
    name: "HubFlow CRM",
    category: "SaaS & AI Tools",
    discount: "50% off",
    description: "Get 50% off your first year of premium CRM software designed for startups.",
    expiry: "Until Jun 2025",
    image: "/images/crm.jpg",
    logo: "/images/crm-logo.png"
  },
  {
    id: 2,
    name: "WriteAI Pro",
    category: "SaaS & AI Tools",
    discount: "3 months free",
    description: "Three months free access to AI-powered writing and content generation tools.",
    expiry: "Until May 2025",
    image: "/images/ai.jpg",
    logo: "/images/ai-logo.png"
  },
  {
    id: 3,
    name: "WorkHub Spaces",
    category: "Lifestyle",
    discount: "30% off",
    description: "Discounted hot desk and dedicated desk memberships across 200+ locations.",
    expiry: "Until Dec 2025",
    image: "/images/cowork.jpg",
    logo: "/images/cowork-logo.png"
  },
  {
    id: 4,
    name: "LegalEase",
    category: "B2B Services",
    discount: "40% off",
    description: "Startup-friendly legal packages for incorporation, contracts, and IP.",
    expiry: "Until Sep 2025",
    image: "/images/legal.jpg",
    logo: "/images/legal-logo.png"
  },
];

const journalArticles = [
  {
    id: 1,
    title: "The Rise of Remote Work: What Founders Need to Know",
    tag: "Remote Work",
    author: "Sarah Chen",
    time: "5 min read",
    image: "/images/remote.jpg",
    description: "How distributed teams are reshaping the startup landscape and what tools you need to thrive."
  },
  {
    id: 2,
    title: "Best Coworking Spaces for Startups in 2025",
    tag: "Lifestyle",
    author: "Marcus Johnson",
    time: "8 min read",
    image: "/images/cowork2.jpg",
    description: "We visited 50+ coworking spaces to find the best ones for growing teams."
  },
  {
    id: 3,
    title: "AI Tools That Actually Save Founders Time",
    tag: "Technology",
    author: "Emma Watson",
    time: "6 min read",
    image: "/images/ai2.jpg",
    description: "Cutting through the hype to find AI solutions that deliver real productivity gains."
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center relative">
        <div className="flex flex-wrap gap-6 justify-center absolute left-0 right-0 -top-20 md:-top-24 z-0 opacity-80 pointer-events-none">
          {/* Example images, replace src with your own */}
          <img src="/images/remote.jpg" alt="remote" className="w-32 h-28 object-cover rounded-2xl shadow-md hidden md:block" />
          <img src="/images/ai.jpg" alt="ai" className="w-32 h-28 object-cover rounded-2xl shadow-md" />
          <img src="/images/cowork.jpg" alt="cowork" className="w-32 h-28 object-cover rounded-2xl shadow-md hidden md:block" />
          <img src="/images/legal.jpg" alt="legal" className="w-32 h-28 object-cover rounded-2xl shadow-md" />
        </div>
        <div className="relative z-10 pt-20 md:pt-32">
          <div className="mb-4 flex justify-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] px-4 py-1 rounded-full text-sm font-semibold">500+ exclusive perks for founders</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#23272f] mb-6 leading-tight">
            Perks that fuel <br className="hidden md:block" /> your <span className="relative inline-block"><span className="z-10 relative">growth</span><span className="absolute left-0 right-0 bottom-0 h-2 bg-[#f8eac7] -z-10 rounded"></span></span>
          </h1>
          <p className="text-lg md:text-xl text-[#6b6f76] mb-8 max-w-2xl mx-auto">
            Exclusive deals on the tools, services, and experiences that help founders, freelancers, and remote teams thrive.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/perks">
              <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-8 py-3 rounded-full text-lg hover:bg-[#f5d488] flex items-center gap-2">
                Explore All Perks <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-8 py-3 rounded-full text-lg">How It Works</Button>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#23272f]">Top picks this month</h2>
          <Link href="/perks">
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full flex items-center gap-2">View all perks <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDeals.map((perk) => (
            <div key={perk.id} className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col h-full relative">
              <img src={perk.image} alt={perk.name} className="w-full h-32 object-cover rounded-xl mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <img src={perk.logo} alt={perk.name} className="w-8 h-8 rounded-full border" />
                <span className="font-semibold text-[#23272f]">{perk.name}</span>
              </div>
              <div className="text-sm text-[#6b6f76] mb-2">{perk.category}</div>
              <div className="text-base text-[#23272f] mb-2">{perk.description}</div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[#6b6f76] flex items-center gap-1"><span className="bg-[#f8eac7] text-[#b48a1e] px-2 py-0.5 rounded-full font-semibold">{perk.discount}</span></span>
                <span className="text-xs text-[#6b6f76]">{perk.expiry}</span>
              </div>
              <Link href="/perks" className="absolute right-4 bottom-4 text-[#e6b756] font-semibold">Get deal →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#23272f] text-center mb-4">How it works</h2>
        <p className="text-[#6b6f76] text-center mb-10">Get exclusive perks in three simple steps</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center font-bold text-[#1a2233] mb-4">01</div>
            <div className="text-xl font-semibold mb-2">Discover perks</div>
            <div className="text-[#6b6f76] text-center">Browse hundreds of exclusive deals curated for founders and remote teams.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center font-bold text-[#1a2233] mb-4">02</div>
            <div className="text-xl font-semibold mb-2">Unlock your discount</div>
            <div className="text-[#6b6f76] text-center">Click to reveal the deal and get instant access to partner offers.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center font-bold text-[#1a2233] mb-4">03</div>
            <div className="text-xl font-semibold mb-2">Save & grow</div>
            <div className="text-[#6b6f76] text-center">Apply your savings to fuel growth with premium tools and services.</div>
          </div>
        </div>
      </section>

      {/* Insights for founders */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#23272f]">Insights for founders</h2>
          <Link href="/journal">
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full flex items-center gap-2">Read all articles <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journalArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col h-full relative">
              <img src={article.image} alt={article.title} className="w-full h-32 object-cover rounded-xl mb-4" />
              <span className="absolute left-4 top-4 bg-[#f8eac7] text-[#b48a1e] px-3 py-1 rounded-full text-xs font-semibold">{article.tag}</span>
              <div className="text-lg font-semibold text-[#23272f] mb-2">{article.title}</div>
              <div className="text-[#6b6f76] mb-2 text-sm">{article.description}</div>
              <div className="flex items-center gap-2 text-xs text-[#6b6f76] mt-auto">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1a2233] rounded-2xl p-10 flex flex-col justify-between text-white shadow-md">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#e6b756] text-[#1a2233] rounded-full p-2"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 7a4 4 0 1 0-8 0v2a4 4 0 1 0 8 0V7Z" stroke="#1a2233" strokeWidth="1.5"/><path d="M12 17v2m-6 0h12" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
              <span className="text-lg font-semibold">For Founders & Teams</span>
            </div>
            <div className="mb-6 text-[#e6b756] text-2xl font-bold">Explore Perks</div>
            <div className="text-[#c7c9d1] mb-6">Access hundreds of exclusive perks to save money and grow your business faster.</div>
          </div>
          <Link href="/perks">
            <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 py-2 rounded-full hover:bg-[#f5d488]">Explore Perks</Button>
          </Link>
        </div>
        <div className="bg-white rounded-2xl p-10 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-2"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 7a4 4 0 1 0-8 0v2a4 4 0 1 0 8 0V7Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M12 17v2m-6 0h12" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
              <span className="text-lg font-semibold text-[#23272f]">Become a Partner</span>
            </div>
            <div className="mb-6 text-[#23272f] text-2xl font-bold">Partner With Us</div>
            <div className="text-[#6b6f76] mb-6">Reach thousands of decision-makers at startups and growing businesses.</div>
          </div>
          <Link href="/partner">
            <Button variant="outline" className="border-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full font-semibold">Partner With Us</Button>
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
