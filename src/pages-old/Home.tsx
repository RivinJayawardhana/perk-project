import { ArrowRight, Search, CheckCircle, Sparkles, Clock, Calendar, Users, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const featuredPerks = [
  {
    id: 1,
    name: "HubFlow CRM",
    category: "SaaS & AI Tools",
    discount: "50% off",
    description: "Get 50% off your first year of premium CRM software designed for startups.",
    expiry: "Until Jan 2025",
    image: "/api/placeholder/300/200",
    logo: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "WriteAI Pro",
    category: "SaaS & AI Tools",
    discount: "3 months free",
    description: "Three months free access to AI-powered writing and content generation tools.",
    expiry: "Until May 2025",
    image: "/api/placeholder/300/200",
    logo: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "WorkHub Spaces",
    category: "Lifestyle",
    discount: "30% off",
    description: "Discounted hot desk and dedicated desk memberships across 200+ locations.",
    expiry: "Until Dec 2025",
    image: "/api/placeholder/300/200",
    logo: "/api/placeholder/40/40"
  },
  {
    id: 4,
    name: "LegalEase",
    category: "B2B Services",
    discount: "40% off",
    description: "Startup-friendly legal packages for incorporation, contracts, and IP...",
    expiry: "Until Sep 2025",
    image: "/api/placeholder/300/200",
    logo: "/api/placeholder/40/40"
  },
];

const journalPosts = [
  {
    id: 1,
    category: "Remote Work",
    author: "Sarah Chen",
    readTime: "5 min read",
    title: "The Rise of Remote Work: What Founders Need to Know",
    excerpt: "How distributed teams are reshaping the startup landscape and what tools you need to thrive.",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    category: "Lifestyle",
    author: "Marcus Johnson",
    readTime: "8 min read",
    title: "Best Coworking Spaces for Startups in 2025",
    excerpt: "We visited 50+ coworking spaces to find the best ones for growing teams.",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    category: "Technology",
    author: "Emma Watson",
    readTime: "6 min read",
    title: "AI Tools That Actually Save Founders Time",
    excerpt: "Cutting through the hype to find AI solutions that deliver real productivity gains.",
    image: "/api/placeholder/400/250"
  },
];

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-semibold">VentureNext</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">Home</a>
            <a href="/perks" className="text-gray-300 hover:text-white transition-colors">Perks</a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="/partner" className="text-gray-300 hover:text-white transition-colors">Partner</a>
            <a href="/journal" className="text-gray-300 hover:text-white transition-colors">Journal</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 text-sm">
              Explore Perks
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors px-4 py-2">Home</a>
              <a href="/perks" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Perks</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors px-4 py-2">About</a>
              <a href="/partner" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Partner</a>
              <a href="/journal" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Journal</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Contact</a>
              <div className="px-4 pt-2 flex flex-col space-y-3">
                <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full">
                  Explore Perks
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center relative">
            {/* Decorative images - left side */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 space-y-4">
              <div className="w-36 h-28 bg-white rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=144&h=112&fit=crop&crop=faces" alt="Modern workspace" className="w-full h-full object-cover" />
              </div>
              <div className="w-44 h-32 bg-white rounded-2xl overflow-hidden ml-6 shadow-lg">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=176&h=128&fit=crop&crop=faces" alt="Team collaboration" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Decorative images - right side */}
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 space-y-4">
              <div className="w-44 h-32 bg-white rounded-2xl overflow-hidden mr-6 shadow-lg">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=176&h=128&fit=crop&crop=faces" alt="Startup workspace" className="w-full h-full object-cover" />
              </div>
              <div className="w-36 h-28 bg-white rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=144&h=112&fit=crop&crop=faces" alt="Office meeting" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">500+ exclusive perks for founders</span>
            </div>
            
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight text-gray-900">
              Perks that fuel<br />
              <span className="font-display">your growth</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 px-4">
              Exclusive deals on the tools, services, and experiences that help founders, freelancers, and remote teams thrive.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-3 rounded-lg w-full sm:w-auto">
                Explore All Perks <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg w-full sm:w-auto">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10 text-center md:text-left">
            <div>
              <span className="text-yellow-600 font-medium text-sm">Featured deals</span>
              <h2 className="font-display text-2xl md:text-4xl font-bold mt-2 text-gray-900">Top picks this month</h2>
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg mt-4 md:mt-0 w-full md:w-auto">
              View all perks <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredPerks.map((perk) => (
              <div key={perk.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                {/* Image */}
                <div className="relative h-32 md:h-40">
                  <img src={perk.image} alt={perk.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 md:top-3 right-2 md:right-3 bg-yellow-500 text-black text-xs font-medium px-2 md:px-3 py-1 rounded-full">
                    {perk.discount}
                  </span>
                </div>
                
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img src={perk.logo} alt={perk.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900">{perk.name}</h3>
                      <p className="text-xs text-gray-500">{perk.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{perk.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {perk.expiry}
                    </span>
                    <Button variant="link" className="text-yellow-600 hover:text-yellow-700 p-0 h-auto font-medium">
                      Get deal <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-4 text-gray-900">How it works</h2>
            <p className="text-gray-600 text-sm md:text-base">Get exclusive perks in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: "01",
                icon: Search,
                title: "Discover perks",
                description: "Browse hundreds of exclusive deals curated for founders and remote teams.",
                color: "bg-yellow-500"
              },
              {
                step: "02",
                icon: CheckCircle,
                title: "Unlock your discount",
                description: "Click to reveal the deal and get instant access to partner offers.",
                color: "bg-yellow-500"
              },
              {
                step: "03",
                icon: Sparkles,
                title: "Save & grow",
                description: "Apply your savings to fuel growth with premium tools and services.",
                color: "bg-yellow-500"
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto`}>
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="font-display text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10 text-center md:text-left">
            <div>
              <span className="text-yellow-600 font-medium text-sm">From our journal</span>
              <h2 className="font-display text-2xl md:text-4xl font-bold mt-2 text-gray-900">Insights for founders</h2>
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg mt-4 md:mt-0 w-full md:w-auto">
              Read all articles <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {journalPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative h-56 rounded-xl overflow-hidden mb-4">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-medium px-3 py-1 rounded-full text-gray-700">
                    {post.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-yellow-600 transition-colors text-gray-900">
                  {post.title}
                </h3>
                <p className="font-display text-gray-600">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* For Founders */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center mb-4 md:mb-6">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3">For Founders & Teams</h3>
              <p className="font-display text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                Access hundreds of exclusive perks to save money and grow your business faster.
              </p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg w-full md:w-auto">
                Explore Perks <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            {/* For Partners */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-4 md:mb-6">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-gray-900">Become a Partner</h3>
              <p className="font-display text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Reach thousands of decision-makers at startups and growing businesses.
              </p>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg w-full md:w-auto">
                Partner With Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-semibold">VentureNext</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                Empowering entrepreneurs with exclusive perks and resources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="/perks" className="hover:text-white transition-colors">Perks</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/partner" className="hover:text-white transition-colors">Partner</a></li>
                <li><a href="/journal" className="hover:text-white transition-colors">Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 VentureNext. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
