"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Image, Type, MousePointerClick, LayoutGrid } from "lucide-react";

const SECTION_TYPES = [
  { value: "hero", label: "Hero Section", icon: <Image className="w-4 h-4" /> },
  { value: "text", label: "Text Block", icon: <Type className="w-4 h-4" /> },
  { value: "cta", label: "Call to Action", icon: <MousePointerClick className="w-4 h-4" /> },
  { value: "features", label: "Features", icon: <LayoutGrid className="w-4 h-4" /> },
];

function SectionEditor({ section, onChange, onDelete }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold">{SECTION_TYPES.find(t => t.value === section.type)?.label || 'Section'}</span>
        <Button type="button" variant="ghost" className="ml-auto text-red-500" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input
            value={section.title}
            onChange={e => onChange({ ...section, title: e.target.value })}
            placeholder="Section Title"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">CTA Text</label>
          <Input
            value={section.ctaText}
            onChange={e => onChange({ ...section, ctaText: e.target.value })}
            placeholder="Button text"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Content</label>
        <Textarea
          value={section.content}
          onChange={e => onChange({ ...section, content: e.target.value })}
          placeholder="Section content..."
          rows={3}
        />
      </div>
    </div>
  );
}

export default function EditAboutPage() {
  const [tab, setTab] = useState("content");
  const [sections, setSections] = useState([
    {
      type: "hero",
      title: "About Founder Perks",
      ctaText: "Button text",
      content: "",
    },
  ]);

  const addSection = (type: string) => {
    setSections([
      { type, title: "", ctaText: "", content: "" },
    ]);
  };

  const updateSection = (idx: number, updated: any) => {
    setSections(sections.map((s, i) => (i === idx ? updated : s)));
  };

  const deleteSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold">Edit About Us</span>
      </div>
      <div className="text-gray-500 mb-6">Customize content and SEO for /about</div>
      <div className="flex gap-2 mb-6">
        <Button variant={tab === "content" ? "default" : "outline"} onClick={() => setTab("content")}>Page Content</Button>
        <Button variant={tab === "seo" ? "default" : "outline"} onClick={() => setTab("seo")}>SEO Settings</Button>
      </div>
      {tab === "content" && (
        <>
          <div className="flex gap-2 mb-4">
            {SECTION_TYPES.map(type => (
              <Button key={type.value} variant="outline" className="flex gap-1 items-center" onClick={() => addSection(type.value)}>
                {type.icon} {type.label}
              </Button>
            ))}
          </div>
          <div>
            {sections.map((section, idx) => (
              <SectionEditor
                key={idx}
                section={section}
                onChange={updated => updateSection(idx, updated)}
                onDelete={() => deleteSection(idx)}
              />
            ))}
          </div>
        </>
      )}
      {tab === "seo" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Meta Title</label>
            <Input placeholder="SEO title (max 60 chars)" maxLength={60} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Meta Description</label>
            <Textarea placeholder="SEO description (max 160 chars)" maxLength={160} />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Keywords</label>
            <Input placeholder="keyword1, keyword2, keyword3" />
          </div>
        </div>
      )}
      <div className="flex justify-end mt-8">
        <Button className="bg-[#181c23] text-[#e6b756] px-8 py-2 rounded-full font-semibold">
          <span className="flex gap-2 items-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
            Save Changes
          </span>
        </Button>
      </div>
    </div>
  );
}
