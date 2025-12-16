import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#181c23] text-[#e6e6e6] pt-12 pb-6 px-4 mt-16">
      {/* Newsletter Section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Never Miss a <span className="text-[#ff4ecd]">Gift Moment</span>
        </h2>
        <div className="text-[#b0b4bb] mb-4">
          Get exclusive offers, new experience alerts, and gifting inspiration delivered to your inbox.
        </div>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-2 rounded-full bg-[#23272f] text-white border border-[#23272f] focus:outline-none focus:ring-2 focus:ring-[#ff4ecd]"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, #a259ff 0%, #ff6a00 100%)' }}
          >
            Subscribe
          </button>
        </form>
      </div>
      {/* ...existing code... */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 border-b border-[#23272f] pb-8">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#e6b756] flex items-center justify-center text-lg font-bold text-[#1a2233]">V</div>
            <span className="text-xl font-bold text-white">
              enture<span className="text-[#e6b756]">Next</span>
            </span>
          </div>
          <div className="text-[#b0b4bb] text-sm">Perks for founders & remote teams.</div>
        </div>
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-semibold text-white mb-3">Product</div>
            <ul className="space-y-2">
              <li><Link href="/perks" className="hover:text-[#e6b756]">Explore Perks</Link></li>
              <li><Link href="/perks" className="hover:text-[#e6b756]">For Teams</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Company</div>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#e6b756]">About Us</Link></li>
              <li><Link href="/journal" className="hover:text-[#e6b756]">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-[#e6b756]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Partners</div>
            <ul className="space-y-2">
              <li><Link href="/partner" className="hover:text-[#e6b756]">Become a Partner</Link></li>
              <li><Link href="/partner" className="hover:text-[#e6b756]">Partner Login</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Legal</div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-[#e6b756]">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#e6b756]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center mt-6 text-xs text-[#b0b4bb] gap-4">
        <div>© 2025 VentureNext. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#e6b756]">Twitter</a>
          <a href="#" className="hover:text-[#e6b756]">LinkedIn</a>
          <a href="#" className="hover:text-[#e6b756]">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
