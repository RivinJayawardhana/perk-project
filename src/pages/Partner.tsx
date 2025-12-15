import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Heart, Globe } from "lucide-react";

const Partner = () => {
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
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-300 hover:text-white">Home</a>
            <a href="/perks" className="text-gray-300 hover:text-white">Perks</a>
            <a href="/about" className="text-gray-300 hover:text-white">About</a>
            <a href="/partner" className="text-yellow-500 hover:text-yellow-400">Partner</a>
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
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-yellow-600 font-medium mb-4">Partner with us</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Reach the founders building tomorrow
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join 200+ brands offering exclusive perks to our community of 50,000+ 
            founders, freelancers, and remote teams.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium text-lg px-8 py-3">
            Become a Partner →
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-medium mb-4">Why partner with us</p>
            <h2 className="font-display text-4xl font-bold text-white">Benefits for your brand</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">Reach Decision Makers</h3>
                <p className="font-display text-gray-400">
                  Connect with founders, CTOs and team leads actively looking for solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">Drive Conversions</h3>
                <p className="font-display text-gray-400">
                  Our audience is ready to buy—they just need the right incentive.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">Build Brand Loyalty</h3>
                <p className="font-display text-gray-400">
                  Create lasting relationships with high-growth companies from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">Global Exposure</h3>
                <p className="font-display text-gray-400">
                  Reach a worldwide audience of remote workers and digital nomads.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-red-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-red-500 font-medium mb-4">How it works</p>
            <h2 className="font-display text-4xl font-bold text-gray-900">Simple partnership process</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                01
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Apply</h3>
              <p className="font-display text-gray-600">
                Fill out the form with your offer details.
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                02
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Review</h3>
              <p className="font-display text-gray-600">
                We review within 24 hours.
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                03
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Launch</h3>
              <p className="font-display text-gray-600">
                Your perk goes live to our audience.
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                04
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Grow</h3>
              <p className="font-display text-gray-600">
                Track and optimize performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-600 font-medium mb-4">Get started</p>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Apply to become a partner</h2>
            <p className="font-display text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <Input 
                  placeholder="Acme Inc." 
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name
                </label>
                <Input 
                  placeholder="John Smith" 
                  className="h-12"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input 
                  type="email"
                  placeholder="john@acme.com" 
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <Input 
                  placeholder="https://acme.com" 
                  className="h-12"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your offer
              </label>
              <Textarea 
                placeholder="Describe your product and the perk you'd like to offer..."
                rows={6}
                className="resize-none"
              />
            </div>
            
            <Button 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium h-12 text-lg"
              type="submit"
            >
              Submit Application
            </Button>
          </form>
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
};

export default Partner;