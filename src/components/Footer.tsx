import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#181c23] text-[#e6e6e6] pt-12 pb-6 px-4 mt-16">
      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Never Miss a <span className="text-[#e6b756]">Gift Moment</span>
        </h2>
        <div className="text-[#b0b4bb] mb-6">
          Get exclusive offers, new experience alerts, and gifting inspiration delivered to your inbox.
        </div>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 w-full sm:w-auto px-4 py-3 rounded-lg bg-[#23272f] text-white border border-[#23272f] focus:outline-none focus:ring-2 focus:ring-[#ff4ecd]"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-semibold text-white whitespace-nowrap"
            style={{ background: 'linear-gradient(90deg, #e6b756 0%, #7d5f0aff 100%)' }}
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto border-t border-[#23272f] my-10"></div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#e6b756] flex items-center justify-center text-lg font-bold text-[#1a2233]">V</div>
              <span className="text-xl font-bold text-white">
                enture<span className="text-[#e6b756]">Next</span>
              </span>
            </div>
            <p className="text-[#b0b4bb] text-sm">Perks for founders & remote teams.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/perks" className="text-[#b0b4bb] hover:text-[#e6b756]">Explore Perks</Link></li>
              <li><Link href="/perks" className="text-[#b0b4bb] hover:text-[#e6b756]">For Teams</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-[#b0b4bb] hover:text-[#e6b756]">About Us</Link></li>
              <li><Link href="/journal" className="text-[#b0b4bb] hover:text-[#e6b756]">Journal</Link></li>
              <li><Link href="/contact" className="text-[#b0b4bb] hover:text-[#e6b756]">Contact</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="font-semibold text-white mb-4">Partners</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partner" className="text-[#b0b4bb] hover:text-[#e6b756]">Become a Partner</Link></li>
              <li><Link href="/partner" className="text-[#b0b4bb] hover:text-[#e6b756]">Partner Login</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[#b0b4bb] hover:text-[#e6b756]">Privacy Policy</Link></li>
              <li><Link href="#" className="text-[#b0b4bb] hover:text-[#e6b756]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto border-t border-[#23272f] my-8"></div>

      {/* Social & Copyright */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 mb-6">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center text-[#1a2233] hover:opacity-80 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center text-[#1a2233] hover:opacity-80 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#e6b756] flex items-center justify-center text-[#1a2233] hover:opacity-80 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Copyright & Links */}
        <div className="flex flex-col items-center gap-4 text-xs text-[#b0b4bb]">
          <div>© 2025 VentureNext. All rights reserved.</div>
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="#" className="hover:text-[#e6b756]">Privacy Policy</a>
            <a href="#" className="hover:text-[#e6b756]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
