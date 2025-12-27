import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import StaticPrivacyHero from "@/components/StaticPrivacyHero";
import PrivacyTabContent from "@/components/PrivacyTabContent";

export const revalidate = 60; // ISR: regenerate every minute

interface Section {
  id: string;
  heading: string;
  slug: string;
  content: string;
}

interface ContentData {
  sections: Section[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
    ogType?: string;
  };
  hero?: {
    subtitle: string;
    heading: string;
    description: string;
  };
}

const getBaseUrl = () => {
  // Use NEXT_PUBLIC_APP_URL if available (most reliable for Vercel)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // Fallback to VERCEL_URL (Vercel provides this at runtime)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return "http://localhost:3000";
};

async function fetchPrivacyContent(): Promise<ContentData | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/privacy-content`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[fetchPrivacyContent] Error:", error);
    return null;
  }
}

async function fetchTermsContent(): Promise<ContentData | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/terms-content`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[fetchTermsContent] Error:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchPrivacyContent();
  const title = content?.seo?.metaTitle || "Privacy Policy - VentureNext";
  const description = content?.seo?.metaDescription || "Read our privacy policy";
  return {
    title: title,
    description: description,
    openGraph: {
      url: "https://venturenext.io/privacy",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["https://venturenext.io/og-image.jpg"],
    },
    alternates: {
      canonical: "https://venturenext.io/privacy",
    },
  };
}

export default async function Privacy() {
  const [privacyContent, termsContent] = await Promise.all([
    fetchPrivacyContent(),
    fetchTermsContent(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <StaticPrivacyHero data={privacyContent?.hero} />
      <PrivacyTabContent initialPrivacy={privacyContent} initialTerms={termsContent} />
      <Footer />
    </div>
  );
}
