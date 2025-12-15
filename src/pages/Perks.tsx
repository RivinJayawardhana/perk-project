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
import { Link } from "react-router-dom";

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

const mockPerks: Perk[] = [
  {
    id: "1",
    company: "HubFlow CRM",
    logo: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    category: "SaaS & AI Tools",
    title: "50% off first year",
    description: "Get 50% off your first year of premium CRM software designed for startups.",
    discount: "50% off",
    validUntil: "Jun 30, 2025",
    location: "Global",
    featured: true
  },
  {
    id: "2", 
    company: "WriteAI Pro",
    logo: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    category: "SaaS & AI Tools",
    title: "Free 3 months",
    description: "Three months free access to AI-powered writing and content generation tools.",
    discount: "3 months free",
    validUntil: "May 15, 2025",
    location: "Global"
  },
  {
    id: "3",
    company: "WorkHub Spaces",
    logo: "/api/placeholder/40/40", 
    image: "/api/placeholder/300/200",
    category: "Lifestyle & Coworking",
    title: "30% off coworking",
    description: "Discounted hot desk and dedicated desk memberships across 200+ locations.",
    discount: "30% off",
    validUntil: "Dec 31, 2025",
    location: "European Union"
  },
  {
    id: "4",
    company: "CloudScale Analytics", 
    logo: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    category: "SaaS & AI Tools",
    title: "$200 credit",
    description: "Get $200 in credits for advanced analytics and data visualization platform.",
    discount: "$200 credit",
    validUntil: "Aug 15, 2025",
    location: "Global"
  },
  {
    id: "5",
    company: "LegalEase",
    logo: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200", 
    category: "B2B Services",
    title: "40% off legal packages",
    description: "Startup-friendly legal packages for incorporation, contracts, and IP protection.",
    discount: "40% off",
    validUntil: "Sep 30, 2025",
    location: "Global"
  }
];

const categories = [
  "All Categories",
  "SaaS & AI Tools", 
  "B2B Services",
  "Lifestyle & Coworking",
  "Productivity",
  "Marketing & Sales"
];

const locations = [
  "All Locations",
  "Global",
  "European Union", 
  "United States",
  "Asia Pacific",
  "Remote"
];

export default function Perks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const filteredPerks = mockPerks.filter(perk => {
    const matchesSearch = perk.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perk.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || perk.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || perk.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gray-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-semibold">VentureNext</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-300 hover:text-white">Home</a>
            <a href="/perks" className="text-yellow-500 hover:text-yellow-400">Perks</a>
            <a href="/about" className="text-gray-300 hover:text-white">About</a>
            <a href="/partner" className="text-gray-300 hover:text-white">Partner</a>
            <a href="/journal" className="text-gray-300 hover:text-white">Journal</a>
            <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/admin" className="text-gray-300 hover:text-white">Admin</a>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Explore Perks
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Discover your next perk
          </h1>
          <p className="font-display text-lg text-slate-600">
            Browse 51 exclusive deals on tools, services, and experiences for founders and teams.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-6">Filters</h3>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search perks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="text-sm text-gray-500">
                    {filteredPerks.length} perks found
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Perks Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPerks.map((perk) => (
                  <Card key={perk.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group rounded-2xl">"
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img 
                          src={perk.image} 
                          alt={perk.company}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-yellow-500 text-slate-800 font-semibold">
                            {perk.discount}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="outline" className="bg-white/90 text-slate-700 text-xs">
                            {perk.location}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <img 
                          src={perk.logo} 
                          alt={`${perk.company} logo`}
                          className="w-10 h-10 rounded-lg border"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-slate-800 truncate">{perk.company}</h3>
                          <p className="font-display text-sm text-gray-500">{perk.category}</p>
                        </div>
                      </div>

                      <h4 className="font-display font-semibold text-lg mb-2">{perk.title}</h4>
                      <p className="font-display text-sm text-gray-600 mb-4 line-clamp-2">{perk.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Valid until {perk.validUntil}
                        </div>
                        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-medium">
                          Get Deal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results State */}
              {filteredPerks.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-gray-900 mb-2">No perks found</h3>
                  <p className="font-display text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All Categories");
                      setSelectedLocation("All Locations");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-semibold">VentureNext</span>
              </div>
              <p className="text-gray-400">
                Empowering entrepreneurs with exclusive perks and resources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/perks" className="hover:text-white">Perks</a></li>
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/partner" className="hover:text-white">Partner</a></li>
                <li><a href="/journal" className="hover:text-white">Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VentureNext. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}