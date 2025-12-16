"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditPerksPage() {
  const [form, setForm] = useState({
    heading: "Perks Page",
    description: "",
    featuredPerk: "",
    ctaText: "",
    ctaLink: "",
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Edit Perks Page</h1>
      <div className="text-gray-500 mb-6">Customize the perks listing and featured content.</div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Heading</label>
        <Input value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Description</label>
        <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Featured Perk</label>
        <Input value={form.featuredPerk} onChange={e => setForm({ ...form, featuredPerk: e.target.value })} placeholder="e.g., $200 credit" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">CTA Text</label>
        <Input value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} placeholder="e.g., Get Started" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">CTA Link</label>
        <Input value={form.ctaLink} onChange={e => setForm({ ...form, ctaLink: e.target.value })} placeholder="/perks" />
      </div>
      <div className="flex justify-end mt-8">
        <Button className="bg-[#e6b756] text-[#1a2233] px-8 py-2 rounded-full font-semibold">Save Changes</Button>
      </div>
    </div>
  );
}
