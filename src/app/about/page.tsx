
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Hero Section */}
      <section className="py-20 bg-[#faf8f6]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-4 text-[#e6b756] font-semibold">About VentureNext</div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#23272f] mb-6 font-display">Empowering founders to build faster</h1>
        <p className="text-lg text-[#6b6f76] max-w-2xl mx-auto">We believe every founder deserves access to premium tools and services without breaking the bank. That's why we built VentureNext.</p>
      </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1a2233] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
       
              <div className="text-3xl md:text-4xl font-bold text-[#e6b756] mb-2 font-display">500+</div>
            <div className="text-[#e6b756] text-opacity-80">Exclusive Perks</div>
          </div>
          <div>
           
              <div className="text-3xl md:text-4xl font-bold text-[#e6b756] mb-2 font-display">50K+</div>
            <div className="text-[#e6b756] text-opacity-80">Active Users</div>
          </div>
          <div>
          
              <div className="text-3xl md:text-4xl font-bold text-[#e6b756] mb-2 font-display">$2M+</div>
            <div className="text-[#e6b756] text-opacity-80">Saved by Users</div>
          </div>
          <div>
           
              <div className="text-3xl md:text-4xl font-bold text-[#e6b756] mb-2 font-display">200+</div>
            <div className="text-[#e6b756] text-opacity-80">Partner Brands</div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 bg-[#f5f3f0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4 text-[#e6b756] font-semibold text-center">What we do</div>

          <h2 className="text-3xl font-bold text-[#23272f] text-center mb-2 font-display">Connecting founders with value</h2>
        <p className="text-[#6b6f76] text-center mb-10">VentureNext is the marketplace where ambition meets opportunity.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#b48a1e" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>

              <div className="text-lg font-semibold mb-2 font-display">Curate Premium Perks</div>
            <div className="text-[#6b6f76] text-center">We handpick and negotiate exclusive deals with top-tier brands across B2B services, SaaS/AI tools, and lifestyle categories.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M8.5 11.5a3.5 3.5 0 0 1 7 0c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5Z" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
     
              <div className="text-lg font-semibold mb-2 font-display">Build Partnerships</div>
            <div className="text-[#6b6f76] text-center">We connect ambitious founders with brands that want to support the next generation of businesses.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
      
              <div className="text-lg font-semibold mb-2 font-display">Deliver Instant Value</div>
            <div className="text-[#6b6f76] text-center">No complicated sign-ups. Find a perk, click, and start saving immediately on tools you actually need.</div>
          </div>
        </div>
      </div>
      </section>

      {/* Who we serve */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-4 text-[#e6b756] font-semibold text-center">Who we serve</div>
       
          <h2 className="text-3xl font-bold text-[#23272f] text-center mb-2 font-display">Built for builders</h2>
        <p className="text-[#6b6f76] text-center mb-10">Our community includes the most ambitious people creating the future of work.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
      
              <div className="text-lg font-semibold mb-2 font-display">Startup Founders</div>
            <div className="text-[#6b6f76] text-center">Early-stage to growth-stage founders looking for tools to scale without breaking the budget.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#b48a1e" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>

              <div className="text-lg font-semibold mb-2 font-display">Freelancers</div>
            <div className="text-[#6b6f76] text-center">Independent professionals seeking premium services at discounted rates.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" stroke="#b48a1e" strokeWidth="1.5"/><path d="M8.5 11.5a3.5 3.5 0 0 1 7 0c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5Z" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
           
              <div className="text-lg font-semibold mb-2 font-display">Solopreneurs</div>
            <div className="text-[#6b6f76] text-center">Solo business owners who need enterprise-level tools at startup-friendly prices.</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center">
            <span className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3 mb-4"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#b48a1e" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="#b48a1e" strokeWidth="1.5"/></svg></span>
    
              <div className="text-lg font-semibold mb-2 font-display">Remote Teams</div>
            <div className="text-[#6b6f76] text-center">Distributed teams looking for coworking spaces, coliving, and productivity tools.</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-[#1a2233] rounded-2xl p-10 flex flex-col items-center text-white text-center">
         
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Ready to start saving?</h2>
          <p className="mb-6 text-[#e6b756]">Join thousands of founders already using VentureNext to unlock exclusive perks.</p>
          <Link href="/perks">
            <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 py-2 rounded-full hover:bg-[#f5d488]">Explore Perks</Button>
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
