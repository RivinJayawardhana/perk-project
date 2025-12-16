"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditContactPage() {
  const [form, setForm] = useState({
    heading: "Contact Us",
    description: "",
    address: "",
    phone: "",
    email: "",
    mapUrl: "",
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Edit Contact Page</h1>
      <div className="text-gray-500 mb-6">Customize the contact information and content for your site.</div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Heading</label>
        <Input value={form.heading} onChange={e => setForm({ ...form, heading: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Description</label>
        <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Address</label>
        <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Phone</label>
        <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Email</label>
        <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Map Embed URL</label>
        <Input value={form.mapUrl} onChange={e => setForm({ ...form, mapUrl: e.target.value })} />
      </div>
      <div className="flex justify-end mt-8">
        <Button className="bg-[#e6b756] text-[#1a2233] px-8 py-2 rounded-full font-semibold">Save Changes</Button>
      </div>
    </div>
  );
}
