"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const res = await fetch("/api/contact-content");
        if (res.ok) {
          const data = await res.json();
          setPageContent(data);
        }
      } catch (error) {
        console.error("Error fetching contact page content:", error);
      } finally {
        setContentLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
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
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
      setSubmitted(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen py-0">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#faf8f6]">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-[#e6b756] font-semibold mb-2 text-sm sm:text-base font-display">
            {contentLoading ? "Contact us" : pageContent?.hero.subtitle || "Contact us"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#23272f] mb-4 sm:mb-6 font-display">
            {contentLoading ? "We'd love to hear from you" : pageContent?.hero.title || "We'd love to hear from you"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#6b6f76]">
            {contentLoading ? "Loading..." : pageContent?.hero.description || "Whether you have a question about perks, partnerships, or anything else—our team is ready to help."}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
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
              disabled={submitted}
            >
              {submitted ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
