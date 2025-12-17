"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Perk {
  id: string;
  company: string;
  logo: string;
  image: string;
  category: string;
  subcategory?: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  location: string;
  dealTypes: string[];
  bestFor: string[];
  featured?: boolean;
}

// Mock data with new fields
const mockPerks: Perk[] = Array.from({ length: 155 }).map((_, i) => ({
  id: (i + 1).toString(),
  company: ["HubFlow CRM", "WriteAI Pro", "WorkHub Spaces", "LegalEase", "DesignPro"][i % 5],
  logo: "/api/placeholder/40/40",
  image: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80"
  ][i % 5],
  category: ["B2B Services", "SaaS/AI Tools", "Lifestyle", "B2B Services", "SaaS/AI Tools"][i % 5],
  subcategory: ["Legal", "Marketing", "Workspace", "Legal", "Design"][i % 5],
  title: ["50% off first year", "Free 3 months", "30% off coworking", "Legal Consultation", "Design Package"][i % 5],
  description: [
    "Get 50% off your first year of premium CRM software designed for startups.",
    "Three months free access to AI-powered writing and content generation tools.",
    "Discounted hot desk and dedicated desk memberships across 200+ locations.",
    "Free initial consultation with legal experts specializing in startup law.",
    "Complete branding package with logo, website, and marketing materials."
  ][i % 5],
  discount: ["50% off", "3 months free", "30% off", "Free Consult", "20% off"][i % 5],
  validUntil: ["Jun 30, 2025", "May 15, 2025", "Dec 31, 2025", "Aug 15, 2025", "Oct 31, 2025"][i % 5],
  location: ["Malaysia", "Singapore", "Global", "Malaysia", "Singapore"][i % 5],
  dealTypes: [
    ["Discount"],
    ["Free trial", "Credits included"],
    ["Discount", "Bundle deal"],
    ["Free consultation"],
    ["Discount", "Exclusive deal"]
  ][i % 5],
  bestFor: [
    ["Startups", "SMEs"],
    ["Solopreneurs", "Startups", "Agencies"],
    ["Solopreneurs", "Remote teams"],
    ["SMEs", "Enterprises"],
    ["Agencies", "Startups"]
  ][i % 5],
  featured: i % 5 === 0,
}));

// Filter options
const dealTypeOptions = [
  { label: "Free trial / Trial", count: 45 },
  { label: "Discount", count: 67 },
  { label: "Credits included", count: 23 },
  { label: "Free consultation", count: 19 },
  { label: "Free perks / Add-ons", count: 28 },
  { label: "Bundle deal", count: 15 },
  { label: "Exclusive deal", count: 31 },
  { label: "Intro / First-time offer", count: 12 },
];

const categoryOptions = [
  { label: "B2B Services", count: 45 },
  { label: "SaaS/AI Tools", count: 72 },
  { label: "Lifestyle", count: 38 },
];

const locationOptions = [
  { label: "Malaysia", count: 52 },
  { label: "Singapore", count: 48 },
  { label: "Global", count: 155 },
];

const bestForOptions = [
  { label: "Solopreneurs", count: 89 },
  { label: "Startups", count: 76 },
  { label: "SMEs", count: 54 },
  { label: "Agencies", count: 32 },
  { label: "Enterprises", count: 18 },
];

// Subcategory options (shown when category is selected)
const subcategoryOptions: Record<string, Array<{label: string, count: number}>> = {
  "B2B Services": [
    { label: "Grow Your Reach", count: 11 },
    { label: "Handle Legal Stuff", count: 7 },
    { label: "Manage Your Books", count: 6 },
    { label: "Build Your Team", count: 8 },
    { label: "Get Expert Advice", count: 5 },
  ],
  "SaaS/AI Tools": [
    { label: "Design Your Brand", count: 4 },
    { label: "Tell Your Story", count: 3 },
    { label: "Find New Opportunities", count: 1 },
    { label: "Marketing Automation", count: 9 },
    { label: "Analytics & Insights", count: 7 },
  ],
  "Lifestyle": [
    { label: "Workspace", count: 15 },
    { label: "Health & Wellness", count: 8 },
    { label: "Travel", count: 6 },
    { label: "Food & Dining", count: 5 },
    { label: "Entertainment", count: 4 },
  ],
};

export default function Perks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDealTypes, setSelectedDealTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedBestFor, setSelectedBestFor] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>(mockPerks);

  const handleFilter = () => {
    let filtered = mockPerks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Deal Type filter
    if (selectedDealTypes.length > 0) {
      filtered = filtered.filter(p => 
        p.dealTypes.some(type => selectedDealTypes.includes(type))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(p => selectedLocations.includes(p.location));
    }

    // Best For filter
    if (selectedBestFor.length > 0) {
      filtered = filtered.filter(p => 
        p.bestFor.some(best => selectedBestFor.includes(best))
      );
    }

    // Subcategory filter (only if category is selected)
    if (selectedSubcategories.length > 0 && selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        p.subcategory && selectedSubcategories.includes(p.subcategory)
      );
    }

    setFilteredPerks(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedDealTypes([]);
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedBestFor([]);
    setSelectedSubcategories([]);
    setFilteredPerks(mockPerks);
  };

  // Update filtered perks when any filter changes
  useState(() => {
    handleFilter();
  });

  const handleDealTypeChange = (dealType: string) => {
    setSelectedDealTypes(prev =>
      prev.includes(dealType)
        ? prev.filter(t => t !== dealType)
        : [...prev, dealType]
    );
    setTimeout(handleFilter, 0); // Trigger filter after state update
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    // Clear subcategories when category changes
    if (!selectedCategories.includes(category)) {
      setSelectedSubcategories([]);
    }
    setTimeout(handleFilter, 0);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
    setTimeout(handleFilter, 0);
  };

  const handleBestForChange = (bestFor: string) => {
    setSelectedBestFor(prev =>
      prev.includes(bestFor)
        ? prev.filter(b => b !== bestFor)
        : [...prev, bestFor]
    );
    setTimeout(handleFilter, 0);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
    setTimeout(handleFilter, 0);
  };

  // Get active filters count
  const activeFiltersCount = 
    selectedDealTypes.length + 
    selectedCategories.length + 
    selectedLocations.length + 
    selectedBestFor.length + 
    selectedSubcategories.length;

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#faf8f6] border-b">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#23272f] mb-3 sm:mb-4 font-display">Discover your next perk</h1>
            <p className="text-[#6b6f76] text-sm sm:text-base md:text-lg">Browse {mockPerks.length}+ exclusive deals on tools, services, and experiences for founders and teams.</p>
          </div>
        </section>

        {/* Perks Grid with Filters */}
        <section className="py-8 sm:py-12 bg-[#f5f3f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80 bg-white rounded-2xl shadow-sm p-4 sm:p-6 h-fit hidden lg:block">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="font-bold text-base sm:text-lg text-[#23272f] font-display">
                {filteredPerks.length} deals found
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-4 sm:mb-6">
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setTimeout(handleFilter, 0);
                }}
                className="rounded-lg border-gray-200"
              />
            </div>

            {/* Deal Type Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold text-[#23272f] mb-3 sm:mb-4 text-sm sm:text-base font-display">Deal Type</h3>
              <div className="space-y-3">
                {dealTypeOptions.map((option) => (
                  <label key={option.label} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedDealTypes.includes(option.label)}
                        onCheckedChange={() => handleDealTypeChange(option.label)}
                        className="rounded border-gray-300 data-[state=checked]:bg-[#e6b756] data-[state=checked]:border-[#e6b756]"
                      />
                      <span className="text-sm text-[#6b6f76] group-hover:text-[#23272f]">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs text-[#8a8e9a] bg-gray-100 px-2 py-0.5 rounded">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Category Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold text-[#23272f] mb-3 sm:mb-4 text-sm sm:text-base font-display">Category</h3>
              <div className="space-y-3">
                {categoryOptions.map((option) => (
                  <label key={option.label} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedCategories.includes(option.label)}
                        onCheckedChange={() => handleCategoryChange(option.label)}
                        className="rounded border-gray-300 data-[state=checked]:bg-[#e6b756] data-[state=checked]:border-[#e6b756]"
                      />
                      <span className="text-sm text-[#6b6f76] group-hover:text-[#23272f]">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs text-[#8a8e9a] bg-gray-100 px-2 py-0.5 rounded">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Section (only shown if category is selected) */}
            {selectedCategories.length > 0 && selectedCategories.map(category => (
              subcategoryOptions[category] && (
                <div key={category} className="mb-6 ml-4 border-l border-gray-200 pl-4">
                  <h4 className="font-medium text-sm text-[#6b6f76] mb-3 font-display">Goals</h4>
                  <div className="space-y-2">
                    {subcategoryOptions[category].map((subOption) => (
                      <label key={subOption.label} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedSubcategories.includes(subOption.label)}
                            onCheckedChange={() => handleSubcategoryChange(subOption.label)}
                            className="rounded border-gray-300 data-[state=checked]:bg-[#e6b756] data-[state=checked]:border-[#e6b756]"
                          />
                          <span className="text-xs text-[#6b6f76] group-hover:text-[#23272f]">
                            {subOption.label}
                          </span>
                        </div>
                        <span className="text-xs text-[#8a8e9a]">
                          {subOption.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            ))}

            {/* Location Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold text-[#23272f] mb-3 sm:mb-4 text-sm sm:text-base font-display">Location</h3>
              <div className="space-y-3">
                {locationOptions.map((option) => (
                  <label key={option.label} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedLocations.includes(option.label)}
                        onCheckedChange={() => handleLocationChange(option.label)}
                        className="rounded border-gray-300 data-[state=checked]:bg-[#e6b756] data-[state=checked]:border-[#e6b756]"
                      />
                      <span className="text-sm text-[#6b6f76] group-hover:text-[#23272f]">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs text-[#8a8e9a] bg-gray-100 px-2 py-0.5 rounded">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Best For Section */}
            <div className="mb-4">
              <h3 className="font-semibold text-[#23272f] mb-3 sm:mb-4 text-sm sm:text-base font-display">Best For (optional)</h3>
              <div className="space-y-3">
                {bestForOptions.map((option) => (
                  <label key={option.label} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedBestFor.includes(option.label)}
                        onCheckedChange={() => handleBestForChange(option.label)}
                        className="rounded border-gray-300 data-[state=checked]:bg-[#e6b756] data-[state=checked]:border-[#e6b756]"
                      />
                      <span className="text-sm text-[#6b6f76] group-hover:text-[#23272f]">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs text-[#8a8e9a] bg-gray-100 px-2 py-0.5 rounded">
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-4 w-full">
            <Button className="w-full bg-white border border-gray-200 text-[#23272f] hover:bg-gray-50">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters ({activeFiltersCount})
            </Button>
          </div>

          {/* Perks Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredPerks.slice(0, 12).map((perk) => (
                <div key={perk.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={perk.image} alt={perk.title} className="w-full h-40 sm:h-48 object-cover" />
                    <span className="absolute top-3 right-3 bg-[#e6b756] text-[#1a2233] text-xs font-semibold px-3 py-1 rounded-full font-display">
                      {perk.discount}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                      {perk.location}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    {/* Category & Deal Type Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {perk.category}
                      </Badge>
                      {perk.dealTypes.slice(0, 2).map((type, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                          {type}
                        </Badge>
                      ))}
                      {perk.dealTypes.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{perk.dealTypes.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Company & Title */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold font-display">
                        {perk.company.charAt(0)}
                      </div>
                      <span className="text-xs sm:text-sm text-[#6b6f76]">{perk.company}</span>
                    </div>
                    <h3 className="font-semibold text-[#23272f] mb-2 text-base sm:text-lg font-display">{perk.title}</h3>
                    <p className="text-[#6b6f76] text-xs sm:text-sm mb-3 sm:mb-4 flex-1">{perk.description}</p>

                    {/* Best For Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {perk.bestFor.slice(0, 3).map((best, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {best}
                        </Badge>
                      ))}
                      {perk.bestFor.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{perk.bestFor.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-gray-100">
                      <span className="text-xs text-[#6b6f76] flex items-center gap-1 flex-shrink-0">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <path d="M8 2v2M16 2v2M3 8.5h18M4 21h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Z" stroke="#b48a1e" strokeWidth="1.5"/>
                        </svg>
                        Valid until {perk.validUntil}
                      </span>
                      <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm hover:bg-[#f5d488] transition-colors font-display w-full sm:w-auto">
                        Get Deal
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPerks.length > 12 && (
              <div className="text-center mt-8 sm:mt-10">
                <Button className="bg-white border border-[#e6b756] text-[#e6b756] font-semibold px-6 sm:px-8 py-2 rounded-full hover:bg-[#fffbe6] transition-colors font-display text-sm sm:text-base">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </>
  );
}