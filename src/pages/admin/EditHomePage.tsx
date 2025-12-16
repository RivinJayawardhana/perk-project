"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Upload, Plus, GripVertical } from "lucide-react";

const SECTION_TYPES = [
  { value: "hero", label: "Hero Section" },
  { value: "text", label: "Text Section" },
  { value: "cta", label: "CTA Section" },
  { value: "custom", label: "Custom Section" },
];

function SectionEditor({ section, onChange, onDelete, onMove }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 relative">
      <div className="flex items-center gap-2 mb-4">
        <button type="button" className="cursor-move" title="Drag to reorder">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <span className="font-semibold">{section.index + 1}. </span>
        <Input
          className="w-48"
          value={section.title}
          onChange={e => onChange({ ...section, title: e.target.value })}
          placeholder="Section Title"
        />
        <span className="ml-2 px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-500">
          {SECTION_TYPES.find(t => t.value === section.type)?.label || 'Section'}
        </span>
        <Button type="button" variant="ghost" className="ml-auto text-red-500" onClick={onDelete}>
          <Trash2 className="w-4 h-4" /> Delete Section
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Section Type</label>
          <select
            className="border rounded-lg px-3 py-2 w-full"
            value={section.type}
            onChange={e => onChange({ ...section, type: e.target.value })}
          >
            {SECTION_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <Input
            value={section.title}
            onChange={e => onChange({ ...section, title: e.target.value })}
            placeholder="Section Title"
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
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Image URL</label>
        <div className="flex gap-2 items-center">
          <Input
            value={section.imageUrl}
            onChange={e => onChange({ ...section, imageUrl: e.target.value })}
            placeholder="Paste image URL or upload"
          />
          <Button type="button" variant="outline" className="flex gap-1 items-center">
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">CTA Button Text</label>
          <Input
            value={section.ctaText}
            onChange={e => onChange({ ...section, ctaText: e.target.value })}
            placeholder="e.g., Get Started"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">CTA Link</label>
          <Input
            value={section.ctaLink}
            onChange={e => onChange({ ...section, ctaLink: e.target.value })}
            placeholder="/perks"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Icon URL</label>
        <div className="flex gap-2 items-center">
          <Input
            value={section.iconUrl}
            onChange={e => onChange({ ...section, iconUrl: e.target.value })}
            placeholder="Paste icon URL or upload"
          />
          <Button type="button" variant="outline" className="flex gap-1 items-center">
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EditHomePage() {
  const [sections, setSections] = useState([
    {
      index: 0,
      type: "hero",
      title: "Partner With Us",
      content: "Reach thousands of founders with your product",
      imageUrl: "",
      ctaText: "Get Started",
      ctaLink: "/perks",
      iconUrl: "",
    },
    {
      index: 1,
      type: "text",
      title: "Why Partner?",
      content: "",
      imageUrl: "",
      ctaText: "",
      ctaLink: "",
      iconUrl: "",
    },
    {
      index: 2,
      type: "text",
      title: "New Section",
      content: "",
      imageUrl: "",
      ctaText: "",
      ctaLink: "",
      iconUrl: "",
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        index: sections.length,
        type: "text",
        title: `New Section`,
        content: "",
        imageUrl: "",
        ctaText: "",
        ctaLink: "",
        iconUrl: "",
      },
    ]);
  };

  const updateSection = (idx: number, updated: any) => {
    setSections(sections.map((s, i) => (i === idx ? { ...updated, index: i } : s)));
  };

  const deleteSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx).map((s, i) => ({ ...s, index: i })));
  };

  // Drag and drop reordering can be added if needed

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Home Page</h1>
        <Button type="button" variant="outline" onClick={addSection} className="flex gap-2 items-center">
          <Plus className="w-4 h-4" /> Add Section
        </Button>
      </div>
      <div>
        {sections.map((section, idx) => (
          <SectionEditor
            key={idx}
            section={section}
            onChange={updated => updateSection(idx, updated)}
            onDelete={() => deleteSection(idx)}
            onMove={() => {}}
          />
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <Button className="bg-[#e6b756] text-[#1a2233] px-8 py-2 rounded-full font-semibold">Save Changes</Button>
      </div>
    </div>
  );
}
