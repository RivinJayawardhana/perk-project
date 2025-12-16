"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditNewsletterPage() {
  const [form, setForm] = useState({
    heading: "Never Miss a Gift Moment",
    subheading: "Get exclusive offers, new experience alerts, and gifting inspiration delivered to your inbox.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
    bgColor: "#000000",
    headingColor: "#fff",
    highlightColor: "#ff4ecd",
    buttonGradient: "linear-gradient(90deg, #a259ff 0%, #ff6a00 100%)",
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Edit Newsletter Section</h1>
      <div className="text-gray-500 mb-6">Customize the newsletter signup section for your footer.</div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Heading</label>
        <Input value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Subheading</label>
        <Input value={form.subheading} onChange={e => setForm({ ...form, subheading: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Input Placeholder</label>
        <Input value={form.placeholder} onChange={e => setForm({ ...form, placeholder: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Button Text</label>
        <Input value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Background Color</label>
        <Input value={form.bgColor} onChange={e => setForm({ ...form, bgColor: e.target.value })} type="color" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Heading Color</label>
        <Input value={form.headingColor} onChange={e => setForm({ ...form, headingColor: e.target.value })} type="color" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Highlight Color</label>
        <Input value={form.highlightColor} onChange={e => setForm({ ...form, highlightColor: e.target.value })} type="color" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Button Gradient</label>
        <Input value={form.buttonGradient} onChange={e => setForm({ ...form, buttonGradient: e.target.value })} />
      </div>
      <div className="flex justify-end mt-8">
        <Button className="bg-[#e6b756] text-[#1a2233] px-8 py-2 rounded-full font-semibold">Save Changes</Button>
      </div>
    </div>
  );
}
