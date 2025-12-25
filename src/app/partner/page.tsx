"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { setMetaTags } from "@/lib/meta-tags";
import StaticPartnerHero from "@/components/StaticPartnerHero";

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
  const { getToken } = useRecaptcha();
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    website: "",
    offer: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    document.head.appendChild(script);

    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/partner-content");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContent(data);
      // Set meta tags when content loads
      if (data.seo) {
        setMetaTags(data.seo.metaTitle, data.seo.metaDescription);
      }
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
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token (optional for development)
      let token: string = 'dev-token';
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        const captchaToken = await getToken('partner_form');
        if (!captchaToken) {
          throw new Error('reCAPTCHA verification failed');
        }
        token = captchaToken;
      }

      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, recaptchaToken: token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Extract specific validation error messages
        if (errorData.details && Array.isArray(errorData.details)) {
          const errorMessages = errorData.details
            .map((err: any) => err.message)
            .join(', ');
          throw new Error(errorMessages);
        }
        
        throw new Error(errorData.error || 'Failed to submit application');
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
        description: error instanceof Error ? error.message : "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !content) {
    return (
      <>
        <Header />
        <main className="bg-[#fcfaf7] min-h-screen">
          <StaticPartnerHero />
          <section className="py-12 sm:py-16 bg-[#f5f3f0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#6b6f76]">
              Loading partner information...
            </div>
          </section>
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
      <StaticPartnerHero />

      {/* Benefits Section */}
      <section className="bg-[#1a2233] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[#e6b756] font-semibold text-center mb-2 text-sm sm:text-base font-display">{content.benefits.subtitle}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e6b756] text-center mb-8 sm:mb-10 font-display">{content.benefits.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.benefits.cards.map((card, idx) => {
              const icons = [
                // Reach Decision Makers - people/target icon
                <svg key="icon-0" width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="8" cy="8" r="3" stroke="#b48a1e" strokeWidth="1.5"/><path d="M2 22s1.5-4 6-4 6 4 6 4M18 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6M22 22s1.5-2.5 1.5-5" stroke="#b48a1e" strokeWidth="1.5"/></svg>,
                // Acquire Lifelong Customers - heart icon
                <svg key="icon-1" width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#b48a1e" strokeWidth="1.5" fill="none"/></svg>,
                // Zero Cost To You - zap/free icon
                <svg key="icon-2" width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#b48a1e" strokeWidth="1.5" fill="none"/></svg>,
                // Simple Setup - check/easy icon
                <svg key="icon-3" width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#b48a1e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              ];
              
              return (
                <div key={idx} className="bg-[#f8eac7] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-start">
                  <span className="mb-4">{icons[idx] || icons[0]}</span>
                  <div className="text-base sm:text-lg font-semibold text-[#23272f] mb-2 font-display">{card.title}</div>
                  <div className="text-sm sm:text-base text-[#6b6f76]">{card.description}</div>
                </div>
              );
            })}
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
            <Button type="submit" className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#f5d488] font-display w-full sm:w-auto" disabled={submitted || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : submitted ? (
                "Submitted!"
              ) : (
                "Submit Application"
              )}
            </Button>

            <p className="text-xs text-[#999] text-center">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{" "}
              <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
            </p>
          </form>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
