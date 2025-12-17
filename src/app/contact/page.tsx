"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen py-0">
      {/* Hero Section */}
      <section className="py-20 bg-[#faf8f6]">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="text-[#e6b756] font-semibold mb-2 font-display">Contact us</div>
          <h1 className="text-5xl font-bold text-[#23272f] mb-6 font-display">
            We'd love to hear from you
          </h1>
          <p className="text-[#6b6f76] text-lg">
            Whether you have a question about perks, partnerships, or anything
            else
            <br />—our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-[#f5f3f0]">
        <div className="max-w-2xl mx-auto px-4">
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
