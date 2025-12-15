import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Perks from "./pages/Perks";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import AllPerks from "./pages/AllPerks";
import AddPerk from "./pages/AddPerk";
import Journal from "./pages/Journal";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
// Admin pages
import Categories from "./pages/admin/Categories";
import Subcategories from "./pages/admin/Subcategories";
import Homepage from "./pages/admin/Homepage";
import AboutUs from "./pages/admin/AboutUs";
import PerksPage from "./pages/admin/PerksPage";
import AdminContact from "./pages/admin/Contact";
import JournalEditor from "./pages/admin/JournalEditor";
import PartnerWithUs from "./pages/admin/PartnerWithUs";
import PrivacyTOS from "./pages/admin/PrivacyTOS";
import Settings from "./pages/admin/Settings";
// Settings pages
import GeneralSettings from "./pages/admin/settings/GeneralSettings";
import SecuritySettings from "./pages/admin/settings/SecuritySettings";
import ApiSettings from "./pages/admin/settings/ApiSettings";
import EmailSettings from "./pages/admin/settings/EmailSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/perks" element={<Perks />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="perks" element={<AllPerks />} />
            <Route path="perks/add" element={<AddPerk />} />
            <Route path="categories" element={<Categories />} />
            <Route path="subcategories" element={<Subcategories />} />
            <Route path="pages/homepage" element={<Homepage />} />
            <Route path="pages/about" element={<AboutUs />} />
            <Route path="pages/perks" element={<PerksPage />} />
            <Route path="pages/contact" element={<AdminContact />} />
            <Route path="pages/partner" element={<PartnerWithUs />} />
            <Route path="pages/privacy" element={<PrivacyTOS />} />
            <Route path="journal" element={<JournalEditor />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/general" element={<GeneralSettings />} />
            <Route path="settings/security" element={<SecuritySettings />} />
            <Route path="settings/api" element={<ApiSettings />} />
            <Route path="settings/email" element={<EmailSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
