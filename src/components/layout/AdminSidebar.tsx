import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Gift, 
  Plus, 
  FolderOpen, 
  FileText, 
  BookOpen, 
  Settings,
  Globe,
  Home,
  Info,
  Tag,
  Phone,
  Handshake,
  Shield,
  Layers,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Gift, label: "Perks", path: "/admin/perks" },
  { icon: FolderOpen, label: "Categories", path: "/admin/categories" },
  { icon: Layers, label: "Subcategories", path: "/admin/subcategories" },
];

const frontendPages = [
  { icon: Home, label: "Homepage", path: "/admin/pages/homepage" },
  { icon: Info, label: "About Us", path: "/admin/pages/about" },
  { icon: Tag, label: "Perks Page", path: "/admin/pages/perks" },
  { icon: Phone, label: "Contact", path: "/admin/pages/contact" },
  { icon: Handshake, label: "Partner With Us", path: "/admin/pages/partner" },
  { icon: Shield, label: "Privacy/TOS", path: "/admin/pages/privacy" },
];

const otherNavItems = [
  { icon: BookOpen, label: "Journal", path: "/admin/journal" },
];

const settingsPages = [
  { icon: Settings, label: "General Settings", path: "/admin/settings/general" },
  { icon: Shield, label: "Security", path: "/admin/settings/security" },
  { icon: Globe, label: "API Settings", path: "/admin/settings/api" },
  { icon: FileText, label: "Email Templates", path: "/admin/settings/email" },
];

const bottomNavItems = [];

export function AdminSidebar() {
  const [frontendPagesOpen, setFrontendPagesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="w-60 min-h-screen bg-sidebar flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Globe className="w-5 h-5 text-sidebar" />
        </div>
        <span className="text-lg font-semibold text-sidebar-accent-foreground">
          PerksAdmin
        </span>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {/* Main Navigation Items */}
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
        
        {/* Frontend Pages Dropdown Section */}
        <div className="pt-2">
          <button
            onClick={() => setFrontendPagesOpen(!frontendPagesOpen)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Frontend Pages</span>
            {frontendPagesOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {frontendPagesOpen && (
            <div className="mt-1 ml-3 border-l border-sidebar-border">
              {frontendPages.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ml-3"
                  activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Other Navigation Items */}
        <div className="pt-2">
          {otherNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Settings Dropdown Section */}
        <div className="pt-2">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium flex-1 text-left">Settings</span>
            {settingsOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {settingsOpen && (
            <div className="mt-1 ml-3 border-l border-sidebar-border">
              {settingsPages.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors ml-3"
                  activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
      
      {/* Bottom Section - Empty for now */}
      {bottomNavItems.length > 0 && (
        <div className="p-3 border-t border-sidebar-border">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </aside>
  );
}
