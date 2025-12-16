"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Partner() {
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    website: "",
    offer: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate submission
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Hero Section */}
      <section className="py-20 bg-[#fcfaf7] border-b">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[#e6b756] font-semibold mb-2">Partner with us</div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#23272f] mb-6">Reach the founders building tomorrow</h1>
          <p className="text-[#6b6f76] text-lg mb-8">Join 200+ brands offering exclusive perks to our community of 50,000+ founders, freelancers, and remote teams.</p>
          <a href="#apply">
            <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-8 py-3 rounded-full hover:bg-[#f5d488]">Become a Partner &rarr;</Button>
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#1a2233] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-[#e6b756] font-semibold text-center mb-2">Why partner with us</div>
          <h2 className="text-3xl font-bold text-white text-center mb-10">Benefits for your brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#232b3b] rounded-2xl p-8 flex flex-col items-start">
              <span className="mb-4"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#e6b756" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
              <div className="text-lg font-semibold text-white mb-2">Reach Decision Makers</div>
              <div className="text-[#b3b8c5]">Connect with founders, CTOs, and team leads actively looking for solutions.</div>
            </div>
            <div className="bg-[#232b3b] rounded-2xl p-8 flex flex-col items-start">
              <span className="mb-4"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 12h18M12 3v18" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
              <div className="text-lg font-semibold text-white mb-2">Drive Conversions</div>
              <div className="text-[#b3b8c5]">Our audience is ready to buy—they just need the right incentive.</div>
            </div>
            <div className="bg-[#232b3b] rounded-2xl p-8 flex flex-col items-start">
              <span className="mb-4"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#e6b756" strokeWidth="1.5"/><path d="M8 12h8" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
              <div className="text-lg font-semibold text-white mb-2">Build Brand Loyalty</div>
              <div className="text-[#b3b8c5]">Create lasting relationships with high-growth companies from day one.</div>
            </div>
            <div className="bg-[#232b3b] rounded-2xl p-8 flex flex-col items-start">
              <span className="mb-4"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#e6b756" strokeWidth="1.5"/><path d="M16 8l-4 4-4-4" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
              <div className="text-lg font-semibold text-white mb-2">Global Exposure</div>
              <div className="text-[#b3b8c5]">Reach a worldwide audience of remote workers and digital nomads.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#fdf3ef] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-[#e86a2a] font-semibold text-center mb-2">How it works</div>
          <h2 className="text-3xl font-bold text-[#23272f] text-center mb-10">Simple partnership process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { step: "01", title: "Apply", desc: "Fill out the form with your offer details." },
              { step: "02", title: "Review", desc: "We review within 24 hours." },
              { step: "03", title: "Launch", desc: "Your perk goes live to our audience." },
              { step: "04", title: "Grow", desc: "Track and optimize performance." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#e86a2a] text-white flex items-center justify-center text-xl font-bold mb-4">{item.step}</div>
                <div className="font-semibold text-[#23272f] mb-1">{item.title}</div>
                <div className="text-[#6b6f76] text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 bg-[#fcfaf7]">
        <div className="max-w-xl mx-auto">
          <div className="text-[#e6b756] font-semibold text-center mb-2">Get started</div>
          <h2 className="text-3xl font-bold text-[#23272f] text-center mb-2">Apply to become a partner</h2>
          <p className="text-[#6b6f76] text-center mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">
            <div className="flex gap-4">
              <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required className="flex-1" />
              <Input name="contact" placeholder="Contact Name" value={form.contact} onChange={handleChange} required className="flex-1" />
            </div>
            <div className="flex gap-4">
              <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="flex-1" type="email" />
              <Input name="website" placeholder="Website" value={form.website} onChange={handleChange} required className="flex-1" />
            </div>
            <Textarea name="offer" placeholder="Describe your product and the perk you'd like to offer..." value={form.offer} onChange={handleChange} required rows={4} />
            <Button type="submit" className="bg-[#e6b756] text-[#1a2233] font-semibold px-8 py-3 rounded-full hover:bg-[#f5d488]" disabled={submitted}>
              {submitted ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
