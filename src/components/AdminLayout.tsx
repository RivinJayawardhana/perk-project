"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
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
  Shield,
  Users as UsersIcon
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [frontendOpen, setFrontendOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

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
              <li><a href="/admin" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><LayoutDashboard className="w-5 h-5" />Dashboard</span></a></li>
              <li><a href="/admin/leads" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><UsersIcon className="w-5 h-5" />Leads</span></a></li>
              <li><a href="/admin/perks" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Gift className="w-5 h-5" />All Perks</span></a></li>
              <li><a href="/admin/perks/add" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Plus className="w-5 h-5" />Add Perk</span></a></li>
              <li><a href="/admin/categories" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><FolderOpen className="w-5 h-5" />Categories</span></a></li>
              <li><a href="/admin/subcategories" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Layers className="w-5 h-5" />Sub Categories</span></a></li>
            </ul>
            {/* Frontend Pages Dropdown */}
            <div className="mt-6">
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-lg uppercase text-xs tracking-wider text-[#b0b4bb] font-semibold w-full transition duration-150 hover:bg-[#23272f] hover:text-white"
                onClick={() => setFrontendOpen((v) => !v)}
                style={{ cursor: 'pointer' }}
              >
                <FileText className="w-5 h-5" /> FRONTEND PAGES
                <span className="ml-auto">{frontendOpen ? '▾' : '▸'}</span>
              </button>
              {frontendOpen && (
                <ul className="space-y-1 mt-2 ml-2">
                  <li><a href="/admin/home" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Home className="w-5 h-5" />Homepage</span></a></li>
                  <li><a href="/admin/pages/about" className={`block px-3 py-2 rounded-lg transition duration-150 font-medium ${isActive('/admin/pages/about') ? 'text-[#e6b756] bg-[#23272f]' : 'text-white hover:bg-[#23272f] hover:text-white'}`}>
                    <span className="flex items-center gap-3"><Info className={`w-5 h-5 ${isActive('/admin/pages/about') ? 'text-[#e6b756]' : ''}`} />About Us</span></a></li>
                  <li><a href="/admin/pages/perks" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Tag className="w-5 h-5" />Perks Page</span></a></li>
                  <li><a href="/admin/pages/contact" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Phone className="w-5 h-5" />Contact</span></a></li>
                  <li><a href="/admin/pages/partner" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Handshake className="w-5 h-5" />Partner With Us</span></a></li>
                  <li><a href="/admin/pages/privacy" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Shield className="w-5 h-5" />Privacy/TOS</span></a></li>
                </ul>
              )}
            </div>
            <ul className="space-y-1 mt-6">
              <li><a href="/admin/journal" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><BookOpen className="w-5 h-5" />Journal</span></a></li>
              <li><a href="/admin/settings" className="block px-3 py-2 rounded-lg transition duration-150 font-medium text-white hover:bg-[#23272f] hover:text-white"><span className="flex items-center gap-3"><Settings className="w-5 h-5" />Settings</span></a></li>
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
