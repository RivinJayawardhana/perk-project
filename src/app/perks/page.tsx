"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
  import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Perk {
  id: string;
  company: string;
  logo: string;
  image: string;
  category: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  location: string;
  featured?: boolean;
}
const mockPerks: Perk[] = Array.from({ length: 48 }).map((_, i) => ({
  id: (i + 1).toString(),
  company: ["HubFlow CRM", "WriteAI Pro", "WorkHub Spaces"][i % 3],
  logo: "/api/placeholder/40/40",
  image: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  ][i % 3],
  category: ["SaaS & AI Tools", "SaaS & AI Tools", "Lifestyle"][i % 3],
  title: ["50% off first year", "Free 3 months", "30% off coworking"][i % 3],
  description: [
    "Get 50% off your first year of premium CRM software designed for startups.",
    "Three months free access to AI-powered writing and content generation tools.",
    "Discounted hot desk and dedicated desk memberships across 200+ locations."
  ][i % 3],
  discount: ["50% off", "3 months free", "30% off"][i % 3],
  validUntil: ["Jun 30, 2025", "May 15, 2025", "Dec 31, 2025"][i % 3],
  location: ["Global", "Global", "European Union"][i % 3],
  featured: i % 3 === 0,
}));

export default function Perks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>(mockPerks);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterPerks(value, selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterPerks(searchTerm, value);
  };

  const filterPerks = (search: string, category: string) => {
    let filtered = mockPerks;
    if (search) {
      filtered = filtered.filter(p => 
        p.company.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category && category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }
    setFilteredPerks(filtered);
  };

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Hero Section */}
      <section className="py-16 bg-[#f7f5f1] border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#23272f] mb-4">Discover your next perk</h1>
          <p className="text-[#6b6f76] text-lg">Browse 8+ exclusive deals on tools, services, and experiences for founders and teams.</p>
        </div>
      </section>

      {/* Perks Grid with Filters */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex gap-8">
        {/* Filters Sidebar */}
        <aside className="w-72 bg-white rounded-2xl shadow-sm p-6 h-fit hidden md:block">
          <div className="font-semibold text-[#23272f] mb-4">Filters</div>
          <div className="mb-4">
            <Input
              placeholder="Search perks..."
              value={searchTerm}
              onChange={e => { handleSearch(e.target.value); }}
              className="rounded-lg border-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-[#6b6f76] mb-1">Category</label>
            <select
              className="w-full rounded-lg border-gray-200 px-3 py-2"
              value={selectedCategory}
              onChange={e => { handleCategoryChange(e.target.value); }}
            >
              <option value="all">All Categories</option>
              <option value="SaaS & AI Tools">SaaS & AI Tools</option>
              <option value="B2B Services">B2B Services</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-[#6b6f76] mb-1">Location</label>
            <select
              className="w-full rounded-lg border-gray-200 px-3 py-2"
              value={"all"}
              disabled
            >
              <option value="all">All Locations</option>
            </select>
          </div>
          <div className="text-[#6b6f76] text-sm mt-8">{filteredPerks.length} perks found</div>
        </aside>

        {/* Perks Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPerks.slice(0, 8).map((perk, idx) => (
              <div key={perk.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="relative">
                  <img src={perk.image} alt={perk.title} className="w-full h-40 object-cover" />
                  <span className="absolute top-3 right-3 bg-[#e6b756] text-[#1a2233] text-xs font-semibold px-3 py-1 rounded-full">{perk.discount}</span>
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">{perk.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-4 px-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-7 h-7 rounded-full border" />
                  <span className="text-xs text-[#6b6f76]">{perk.company}</span>
                </div>
                <div className="px-4 pt-2 pb-4 flex-1 flex flex-col">
                  <div className="font-semibold text-[#23272f] mb-1">{perk.title}</div>
                  <div className="text-[#6b6f76] text-sm mb-3 flex-1">{perk.description}</div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-[#6b6f76] flex items-center gap-1">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 2v2M16 2v2M3 8.5h18M4 21h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Z" stroke="#b48a1e" strokeWidth="1.5"/></svg>
                      Valid until {perk.validUntil}
                    </span>
                    <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-[#f5d488]">Get Deal</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
