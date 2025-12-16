"use client";
import React, { useState } from "react";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";

const perksData = [
  {
    id: 1,
    perk: "$200 credit",
    company: "CloudScale",
    category: "SaaS & AI Tools",
    deal: "$200 credit",
    location: "Global",
    validUntil: "Aug 20, 2025",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    dealColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 2,
    perk: "40% off legal services",
    company: "LegalEase",
    category: "B2B Services",
    deal: "40% off",
    location: "United States",
    validUntil: "Sep 30, 2025",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    dealColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 3,
    perk: "Free 3-month trial",
    company: "DesignPro",
    category: "Design",
    deal: "Free trial",
    location: "Global",
    validUntil: "Dec 31, 2025",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    dealColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 4,
    perk: "50% off first year",
    company: "MarketBoost",
    category: "Marketing",
    deal: "50% off",
    location: "Europe",
    validUntil: "Jul 15, 2025",
    status: "Draft",
    statusColor: "bg-gray-100 text-gray-500",
    dealColor: "bg-yellow-100 text-yellow-800",
  },
];

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>
  );
}

function DealBadge({ deal, color }: { deal: string; color: string }) {
  return (
    <span className={`px-2 py-1 rounded bg-opacity-60 text-xs font-medium ${color}`}>{deal}</span>
  );
}

export default function AllPerks() {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#23272f]">Manage and organize all founder perks</h1>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search perks..."
          className="border border-gray-200 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-yellow-200"
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-[#7a7f8c] text-xs font-semibold border-b">
              <th className="py-3 px-4 text-left font-semibold">Perk</th>
              <th className="py-3 px-4 text-left font-semibold">Category</th>
              <th className="py-3 px-4 text-left font-semibold">Deal</th>
              <th className="py-3 px-4 text-left font-semibold">Location</th>
              <th className="py-3 px-4 text-left font-semibold">Valid Until</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {perksData.map((perk) => (
              <tr key={perk.id} className="border-b hover:bg-gray-50 group">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#7a7f8c]">
                    {perk.company[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[#23272f]">{perk.perk}</div>
                    <div className="text-xs text-[#7a7f8c]">{perk.company}</div>
                  </div>
                </td>
                <td className="py-3 px-4">{perk.category}</td>
                <td className="py-3 px-4"><DealBadge deal={perk.deal} color={perk.dealColor} /></td>
                <td className="py-3 px-4">{perk.location}</td>
                <td className="py-3 px-4">{perk.validUntil}</td>
                <td className="py-3 px-4"><StatusBadge status={perk.status} color={perk.statusColor} /></td>
                <td className="py-3 px-4 relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setMenuOpen(menuOpen === perk.id ? null : perk.id)}
                  >
                    <MoreVertical className="w-5 h-5 text-[#7a7f8c]" />
                  </button>
                  {menuOpen === perk.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                      <button className="flex items-center gap-2 px-4 py-2 w-full text-left text-[#23272f] hover:bg-gray-50">
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 w-full text-left text-[#23272f] hover:bg-gray-50">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
