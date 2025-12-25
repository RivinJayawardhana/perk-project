"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { setMetaTags } from "@/lib/meta-tags";
import StaticContactHero from "@/components/StaticContactHero";

interface ContactPageContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
  };
}

export default function Contact() {
  const [pageContent, setPageContent] = useState<ContactPageContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const { toast } = useToast();
  const { getToken } = useRecaptcha();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const res = await fetch("/api/contact-content");
        if (res.ok) {
          const data = await res.json();
          setPageContent(data);
          // Set meta tags when content loads
          if (data.seo) {
            setMetaTags(data.seo.metaTitle, data.seo.metaDescription);
          }
        }
      } catch (error) {
        console.error("Error fetching contact page content:", error);
      } finally {
        setContentLoading(false);
      }
    };

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    document.head.appendChild(script);

    fetchPageContent();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token (optional for development)
      let token: string = 'dev-token';
      if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        const captchaToken = await getToken('contact_form');
        if (!captchaToken) {
          throw new Error('reCAPTCHA verification failed');
        }
        token = captchaToken;
      }

      const response = await fetch('/api/contact', {
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
        
        throw new Error(errorData.error || 'Failed to submit form');
      }

      toast({
        title: "Success!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen py-0">
      {/* Hero Section */}
      <StaticContactHero />

      {contentLoading && (
        <section className="py-12 sm:py-16 bg-[#f5f3f0]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#6b6f76]">
            Loading contact form...
          </div>
        </section>
      )}

      {!contentLoading && (
      <section className="py-12 sm:py-16 bg-[#f5f3f0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md p-10 flex flex-col gap-8"
          >
            <h2 className="text-2xl font-bold text-[#23272f] text-center mb-2 font-display">
              Send us a message
            </h2>
            <p className="text-[#6b6f76] text-center mb-4">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#23272f] mb-1">
                  Your Name
                </label>
                <Input
                  name="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="rounded-full"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-[#23272f] mb-1">
                  Email
                </label>
                <Input
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded-full"
                  type="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-1">
                Subject
              </label>
              <Input
                name="subject"
                placeholder="How can we help?"
                value={form.subject}
                onChange={handleChange}
                required
                className="rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#23272f] mb-1">
                Message
              </label>
              <Textarea
                name="message"
                placeholder="Tell us more about your inquiry..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="rounded-2xl"
              />
            </div>

            <Button
              type="submit"
              className="bg-[#e6b756] text-[#1a2233] font-semibold px-8 py-3 rounded-full hover:bg-[#f5d488] text-lg font-display"
              disabled={submitted || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : submitted ? (
                "Sent!"
              ) : (
                "Send Message"
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
      )}
      </main>
      <Footer />
    </>
  );
}
