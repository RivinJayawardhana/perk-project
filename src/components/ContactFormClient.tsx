"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactFormClient() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#23272f] text-center mb-3 sm:mb-4 font-display">
            Send us a Message
          </h2>
          <p className="text-[#6b6f76] text-center mb-8 text-sm sm:text-base">
            Have questions? We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="text-sm sm:text-base"
              />
              <Input
                name="email"
                placeholder="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <Input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="text-sm sm:text-base"
            />

            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="text-sm sm:text-base"
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#f5d488] font-display flex-1 sm:flex-initial"
                disabled={isSubmitting || submitted}
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
            </div>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-[#23272f] mb-2 font-display">Email</h3>
            <p className="text-[#6b6f76] text-sm">support@venturenext.co</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-[#23272f] mb-2 font-display">Phone</h3>
            <p className="text-[#6b6f76] text-sm">+1 (555) 123-4567</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#f8eac7] text-[#b48a1e] rounded-full p-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-[#23272f] mb-2 font-display">Location</h3>
            <p className="text-[#6b6f76] text-sm">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
