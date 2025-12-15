import { ArrowRight, Target, Heart, Zap, Rocket, Users, Briefcase, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const stats = [
  { value: "500+", label: "Exclusive Perks" },
  { value: "50K+", label: "Active Users" },
  { value: "$2M+", label: "Saved by Users" },
  { value: "200+", label: "Partner Brands" },
];

const whatWeDo = [
  {
    icon: Target,
    title: "Curate Premium Perks",
    description: "We handpick and negotiate exclusive deals with top-tier brands across B2B services, SaaS/AI tools, and lifestyle categories.",
  },
  {
    icon: Heart,
    title: "Build Partnerships",
    description: "We connect ambitious founders with brands that want to support the next generation of businesses.",
  },
  {
    icon: Zap,
    title: "Deliver Instant Value",
    description: "No complicated sign-ups. Find a perk, click, and start saving immediately on tools you actually need.",
  },
];

const whoWeServe = [
  {
    icon: Rocket,
    title: "Startup Founders",
    description: "Early-stage to growth-stage founders looking for tools to scale without breaking the budget.",
  },
  {
    icon: Users,
    title: "Freelancers",
    description: "Independent professionals seeking premium services at discounted rates.",
  },
  {
    icon: Briefcase,
    title: "Solopreneurs",
    description: "Solo business owners who need enterprise-level tools at startup-friendly prices.",
  },
  {
    icon: Globe,
    title: "Remote Teams",
    description: "Distributed teams looking for coworking spaces, coliving, and productivity tools.",
  },
];

const About = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/perks" className="text-gray-300 hover:text-white transition-colors">Perks</a>
            <a href="/about" className="text-yellow-500 hover:text-yellow-400 transition-colors">About</a>
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
              <a href="/" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Home</a>
              <a href="/perks" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Perks</a>
              <a href="/about" className="text-yellow-500 hover:text-yellow-400 transition-colors px-4 py-2">About</a>
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
      <section className="py-12 md:py-20 px-4 md:px-6 text-center bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <p className="text-yellow-600 font-medium mb-4 text-sm md:text-base">About VentureNext</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight">
            Empowering founders to build faster
          </h1>
          <p className="font-display text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We believe every founder deserves access to premium tools and services without breaking the bank. That's why we built VentureNext.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-yellow-600 font-medium mb-4 text-sm md:text-base">What we do</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-800 mb-4">
              Connecting founders with value
            </h2>
            <p className="font-display text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              VentureNext is the marketplace where ambition meets opportunity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whatWeDo.map((item, index) => (
              <div key={index} className="text-center p-6 md:p-8 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <item.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">
                  {item.title}
                </h3>
                <p className="font-display text-slate-600 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-yellow-600 font-medium mb-4 text-sm md:text-base">Who we serve</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-800 mb-4">
              Built for builders
            </h2>
            <p className="font-display text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Our community includes the most ambitious people creating the future of work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whoWeServe.map((item, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to start saving?
          </h2>
          <p className="font-display text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of founders already using VentureNext to unlock exclusive perks.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-semibold px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto">
            Explore Perks
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2" />
          </Button>
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

export default About;