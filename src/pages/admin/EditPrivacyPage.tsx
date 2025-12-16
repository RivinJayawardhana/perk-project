"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditPrivacyPage() {
  const [form, setForm] = useState({
    heading: "Privacy & Terms",
    description: "",
    content: "",
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Edit Privacy & Terms Page</h1>
      <div className="text-gray-500 mb-6">Customize the privacy policy and terms of service content.</div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Heading</label>
        <Input value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Description</label>
        <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Content</label>
        <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} />
      </div>
      <div className="flex justify-end mt-8">
        <Button className="bg-[#e6b756] text-[#1a2233] px-8 py-2 rounded-full font-semibold">Save Changes</Button>
      </div>
    </div>
  );
}
