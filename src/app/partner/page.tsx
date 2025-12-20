"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PartnerContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
    buttonText: string;
  };
  benefits: {
    subtitle: string;
    title: string;
    cards: Array<{ title: string; description: string }>;
  };
  process: {
    subtitle: string;
    title: string;
    steps: Array<{ step: string; title: string; description: string }>;
  };
  form: {
    subtitle: string;
    title: string;
    description: string;
  };
}

export default function Partner() {
  const [content, setContent] = useState<PartnerContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    website: "",
    offer: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/partner-content");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching partner content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      toast({
        title: "Success!",
        description: "Thank you for your application. We'll review it and get back to you soon.",
      });

      setSubmitted(true);
      setForm({ company: '', contact: '', email: '', website: '', offer: '' });
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      setSubmitted(false);
    }
  };

  if (loading || !content) {
    return (
      <>
        <Header />
        <main className="bg-[#fcfaf7] min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#e6b756]" />
            <p className="text-[#6b6f76]">Loading partner page...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#faf8f6] border-b">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-[#e6b756] font-semibold mb-2 text-sm sm:text-base font-display">{content.hero.subtitle}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#23272f] mb-4 sm:mb-6 font-display">{content.hero.title}</h1>
          <p className="text-[#6b6f76] text-sm sm:text-base md:text-lg mb-6 sm:mb-8">{content.hero.description}</p>
          <a href="#apply">
            <Button className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#f5d488] w-full sm:w-auto">{content.hero.buttonText}</Button>
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#1a2233] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[#e6b756] font-semibold text-center mb-2 text-sm sm:text-base font-display">{content.benefits.subtitle}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-10 font-display">{content.benefits.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.benefits.cards.map((card, idx) => (
              <div key={idx} className="bg-[#232b3b] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-start">
                <span className="mb-4"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#e6b756" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#e6b756" strokeWidth="1.5"/></svg></span>
                <div className="text-base sm:text-lg font-semibold text-white mb-2 font-display">{card.title}</div>
                <div className="text-sm sm:text-base text-[#b3b8c5]">{card.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#f5f3f0] py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[#e86a2a] font-semibold text-center mb-2 text-sm sm:text-base font-display">{content.process.subtitle}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#23272f] text-center mb-8 sm:mb-10 font-display">{content.process.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {content.process.steps.map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e86a2a] text-white flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-display">{item.step}</div>
                <div className="font-semibold text-[#23272f] mb-1 text-base sm:text-lg font-display">{item.title}</div>
                <div className="text-[#6b6f76] text-xs sm:text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf7]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[#e6b756] font-semibold text-center mb-2 text-sm sm:text-base font-display">{content.form.subtitle}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#23272f] text-center mb-3 sm:mb-4 font-display">{content.form.title}</h2>
          <p className="text-[#6b6f76] text-center mb-6 sm:mb-8 text-sm sm:text-base">{content.form.description}</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required className="flex-1" />
              <Input name="contact" placeholder="Contact Name" value={form.contact} onChange={handleChange} required className="flex-1" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="flex-1" type="email" />
              <Input name="website" placeholder="Website" value={form.website} onChange={handleChange} required className="flex-1" />
            </div>
            <Textarea name="offer" placeholder="Describe your product and the perk you'd like to offer..." value={form.offer} onChange={handleChange} required rows={4} />
            <Button type="submit" className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#f5d488] font-display w-full sm:w-auto" disabled={submitted}>
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
