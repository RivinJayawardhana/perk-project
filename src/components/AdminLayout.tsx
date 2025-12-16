"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Gift,
  Plus,
  FolderOpen,
  FileText,
  BookOpen,
  Settings,
  Layers,
  User,
  Home,
  Info,
  Tag,
  Phone,
  Handshake,
  Shield
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [frontendOpen, setFrontendOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#fcfaf7]">
      <aside className="bg-[#181c23] text-white w-64 min-h-screen flex flex-col py-6 px-4 border-r border-[#23272f] justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 rounded-full bg-[#e6b756] flex items-center justify-center text-lg font-bold text-[#1a2233]">P</div>
            <span className="text-xl font-bold text-white">Perks<span className="text-[#e6b756]">Admin</span></span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              <li><a href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><LayoutDashboard className="w-5 h-5" />Dashboard</a></li>
              <li><a href="/admin/perks" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Gift className="w-5 h-5" />All Perks</a></li>
              <li><a href="/admin/perks/add" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Plus className="w-5 h-5" />Add Perk</a></li>
              <li><a href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><FolderOpen className="w-5 h-5" />Categories</a></li>
            </ul>
            {/* Frontend Pages Dropdown */}
            <div className="mt-6">
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-lg uppercase text-xs tracking-wider text-[#b0b4bb] font-semibold w-full hover:bg-[#23272f]"
                onClick={() => setFrontendOpen((v) => !v)}
                style={{ cursor: 'pointer' }}
              >
                <FileText className="w-5 h-5" /> FRONTEND PAGES
                <span className="ml-auto">{frontendOpen ? '▾' : '▸'}</span>
              </button>
              {frontendOpen && (
                <ul className="space-y-1 mt-2 ml-2">
                  <li><a href="/admin/pages/homepage" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Home className="w-5 h-5" />Homepage</a></li>
                  <li><a href="/admin/pages/about" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f] text-[#e6b756] bg-[#23272f]">
                    <Info className="w-5 h-5 text-[#e6b756]" />About Us</a></li>
                  <li><a href="/admin/pages/perks" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Tag className="w-5 h-5" />Perks Page</a></li>
                  <li><a href="/admin/pages/contact" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Phone className="w-5 h-5" />Contact</a></li>
                  <li><a href="/admin/pages/partner" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Handshake className="w-5 h-5" />Partner With Us</a></li>
                  <li><a href="/admin/pages/privacy" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Shield className="w-5 h-5" />Privacy/TOS</a></li>
                </ul>
              )}
            </div>
            <ul className="space-y-1 mt-6">
              <li><a href="/admin/journal" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><BookOpen className="w-5 h-5" />Journal</a></li>
              <li><a href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium hover:bg-[#23272f]"><Settings className="w-5 h-5" />Settings</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 mt-8 border-t border-[#23272f] pt-4">
          <div className="w-8 h-8 rounded-full bg-[#23272f] flex items-center justify-center"><User className="w-5 h-5 text-[#e6b756]" /></div>
          <div>
            <div className="text-sm font-semibold">Admin</div>
            <div className="text-xs text-[#b0b4bb]">admin@perks.io</div>
          </div>
        </div>
      </aside>
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
