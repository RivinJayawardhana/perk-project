import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import StaticPrivacyHero from "@/components/StaticPrivacyHero";
import PrivacyTabContent from "@/components/PrivacyTabContent";

export const revalidate = 3600; // ISR: regenerate every hour

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
  };
  hero?: {
    subtitle: string;
    heading: string;
    description: string;
  };
}

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

async function fetchPrivacyContent(): Promise<ContentData | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/privacy-content`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching privacy content:", error);
    return null;
  }
}

async function fetchTermsContent(): Promise<ContentData | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/terms-content`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching terms content:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchPrivacyContent();
  return {
    title: content?.seo?.metaTitle || "Privacy Policy - VentureNext",
    description: content?.seo?.metaDescription || "Read our privacy policy",
    openGraph: {
      url: "https://venturenext.co/privacy",
    },
    alternates: {
      canonical: "https://venturenext.co/privacy",
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
