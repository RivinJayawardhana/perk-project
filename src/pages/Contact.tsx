import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
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
            <a href="/partner" className="text-gray-300 hover:text-white">Partner</a>
            <a href="/journal" className="text-gray-300 hover:text-white">Journal</a>
            <a href="/contact" className="text-yellow-500 hover:text-yellow-400">Contact</a>
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
          <p className="text-yellow-600 font-medium mb-4">Contact us</p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            We'd love to hear from you
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you have a question about perks, partnerships, or anything else
            —our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
              <p className="font-display text-lg text-gray-600">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input 
                    placeholder="John Smith" 
                    className="h-12 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="john@example.com" 
                    className="h-12 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input 
                  placeholder="How can we help?" 
                  className="h-12 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="resize-none bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium h-12 text-lg rounded-full"
                type="submit"
              >
                Send Message
              </Button>
            </form>
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
};

export default Contact;