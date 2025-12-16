"use client";
import React, { useState } from "react";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";

const initialFields = [
  { label: "Full Name", type: "Text", placeholder: "Enter your name", required: true },
  { label: "Company", type: "Text", placeholder: "Your company name", required: true },
  { label: "Email", type: "Email", placeholder: "you@company.com", required: true },
  { label: "Phone", type: "Phone", placeholder: "+60 123 456 789", required: true },
];

export default function AddPerk() {
  const [fields, setFields] = useState(initialFields);
  const [dealType, setDealType] = useState("Affiliate Link");

  const handleAddField = () => {
    setFields([
      ...fields,
      { label: "", type: "Text", placeholder: "", required: false },
    ]);
  };

  const handleFieldChange = (idx, key, value) => {
    setFields(fields.map((f, i) => (i === idx ? { ...f, [key]: value } : f)));
  };

  const handleRemoveField = (idx) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button className="flex items-center gap-2 text-[#23272f] mb-6 font-medium hover:underline">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-1">Add New Perk</h1>
      <p className="text-[#7a7f8c] mb-6">Fill in the details below to create a new perk for founders</p>

      {/* Media Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Media</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Banner Image</label>
          <div className="border-2 border-dashed border-[#e6b756] rounded-lg flex flex-col items-center justify-center h-40 cursor-pointer text-[#7a7f8c]">
            <Upload className="w-8 h-8 mb-2" />
            <span>Click to upload or drag and drop</span>
            <span className="text-xs mt-1">Recommended: 1200 x 400px</span>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Company Logo</label>
          <div className="flex items-center gap-3">
            <div className="border-2 border-dashed border-[#e6b756] rounded-lg w-16 h-16 flex items-center justify-center cursor-pointer text-[#7a7f8c]">
              <Upload className="w-6 h-6" />
            </div>
            <input type="text" className="border rounded-lg px-3 py-2 flex-1" placeholder="Paste logo URL" />
          </div>
          <span className="text-xs text-[#7a7f8c] mt-1 block">Square Image, min 100x100px</span>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Company Name *</label>
            <input type="text" className="border rounded-lg px-3 py-2 w-full" placeholder="e.g., CloudScale" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Category *</label>
            <select className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-[#e6b756]">
              <option>Cloud & Infrastructure</option>
              <option>SaaS & AI Tools</option>
              <option>B2B Services</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Subcategory</label>
          <select className="border rounded-lg px-3 py-2 w-full">
            <option>Select subcategory</option>
          </select>
          <span className="text-xs text-[#7a7f8c] mt-1 block">Subcategories are managed in the Categories tab</span>
        </div>
      </div>

      {/* Perk Details */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Perk Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Perk Title *</label>
            <input type="text" className="border rounded-lg px-3 py-2 w-full" placeholder="e.g., $200 credit" />
          </div>
          <div>
            <label className="block mb-2 font-medium">URL Slug</label>
            <input type="text" className="border rounded-lg px-3 py-2 w-full" placeholder="perk-url-slug" />
            <span className="text-xs text-[#7a7f8c] mt-1 block">Auto-generated from title</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Deal Badge Text</label>
          <input type="text" className="border rounded-lg px-3 py-2 w-full" placeholder="$200 credit, 40% off" />
          <span className="text-xs text-[#7a7f8c] mt-1 block">Short text shown on the card badge</span>
        </div>
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea className="border rounded-lg px-3 py-2 w-full" rows={3} placeholder="Describe the perk and what founders get..." />
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Location / Region</label>
            <select className="border rounded-lg px-3 py-2 w-full">
              <option>Select location</option>
              <option>Global</option>
              <option>United States</option>
              <option>Europe</option>
            </select>
            <span className="text-xs text-[#7a7f8c] mt-1 block">Global perks appear in both Malaysia and Singapore</span>
          </div>
          <div>
            <label className="block mb-2 font-medium">Valid Until</label>
            <input type="date" className="border rounded-lg px-3 py-2 w-full" placeholder="dd/mm/yyyy" />
          </div>
        </div>
      </div>

      {/* How to Claim */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">How to Claim</h2>
        <div className="flex gap-4 mb-4">
          {['Affiliate Link', 'Coupon Code', 'Lead Capture'].map((type) => (
            <button
              key={type}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition font-medium ${dealType === type ? 'border-[#e6b756] bg-[#fffbe6]' : 'border-gray-200 bg-white'}`}
              onClick={() => setDealType(type)}
              type="button"
            >
              {type === 'Affiliate Link' && <><Upload className="w-4 h-4" /> Affiliate Link</>}
              {type === 'Coupon Code' && <><Upload className="w-4 h-4" /> Coupon Code</>}
              {type === 'Lead Capture' && <><Upload className="w-4 h-4" /> Lead Capture</>}
            </button>
          ))}
        </div>
        {dealType === 'Affiliate Link' && (
          <div>
            <label className="block mb-2 font-medium">Deal URL</label>
            <input type="text" className="border rounded-lg px-3 py-2 w-full" placeholder="https://..." />
            <span className="text-xs text-[#7a7f8c] mt-1 block">Affiliate or partner link</span>
          </div>
        )}
        {dealType === 'Coupon Code' && (
          <div>
            <label className="block mb-2 font-medium">Coupon Code</label>
            <input type="text" className="border rounded-lg px-3 py-2 w-full" placeholder="Enter coupon code" />
          </div>
        )}
        {dealType === 'Lead Capture' && (
          <div>
            <label className="block mb-2 font-medium">Lead Capture Form Fields</label>
            <div className="space-y-2 mb-2">
              {fields.map((field, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-40"
                    placeholder="Field label"
                    value={field.label}
                    onChange={e => handleFieldChange(idx, 'label', e.target.value)}
                  />
                  <select
                    className="border rounded-lg px-3 py-2 w-32"
                    value={field.type}
                    onChange={e => handleFieldChange(idx, 'type', e.target.value)}
                  >
                    <option>Text</option>
                    <option>Email</option>
                    <option>Phone</option>
                  </select>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-40"
                    placeholder="Placeholder"
                    value={field.placeholder}
                    onChange={e => handleFieldChange(idx, 'placeholder', e.target.value)}
                  />
                  <label className="flex items-center gap-1 text-xs">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={e => handleFieldChange(idx, 'required', e.target.checked)}
                    />
                    Required
                  </label>
                  <button type="button" className="text-red-500 hover:bg-red-50 rounded p-1" onClick={() => handleRemoveField(idx)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="flex items-center gap-2 px-3 py-1 rounded bg-[#e6b756] text-[#23272f] font-medium text-sm" onClick={handleAddField}>
              <Plus className="w-4 h-4" /> Add Field
            </button>
            <span className="text-xs text-[#7a7f8c] mt-1 block">Configure fields to collect from users. Common fields: Budget, Purchase Timeline, etc.</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 rounded-lg border border-[#e6b756] text-[#e6b756] font-semibold bg-white hover:bg-[#fffbe6]">Save as Draft</button>
        <button className="px-6 py-2 rounded-lg bg-[#e6b756] text-white font-semibold hover:bg-[#d4a940]">Publish Perk</button>
      </div>
    </div>
  );
}
