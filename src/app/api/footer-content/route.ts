import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface FooterData {
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  footerLinks: Array<{
    section: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  }>;
}

const DEFAULT_DATA: FooterData = {
  socialLinks: [
    { platform: "Facebook", url: "#", icon: "Facebook" },
    { platform: "Instagram", url: "#", icon: "Instagram" },
    { platform: "LinkedIn", url: "#", icon: "Linkedin" },
  ],
  footerLinks: [
    {
      section: "Product",
      links: [
        { label: "Explore Perks", url: "/perks" },
        { label: "For Teams", url: "/perks" },
      ],
    },
    {
      section: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Journal", url: "/journal" },
        { label: "Contact", url: "/contact" },
      ],
    },
    {
      section: "Partners",
      links: [
        { label: "Become a Partner", url: "/partner" },
        { label: "Partner Login", url: "/partner" },
      ],
    },
    {
      section: "Legal",
      links: [
        { label: "Privacy Policy", url: "#" },
        { label: "Terms of Service", url: "#" },
      ],
    },
  ],
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("footer_content")
      .select("social_links, footer_links")
      .single();

    if (error || !data) {
      return NextResponse.json(DEFAULT_DATA);
    }

    const footerData: FooterData = {
      socialLinks: data.social_links || DEFAULT_DATA.socialLinks,
      footerLinks: data.footer_links || DEFAULT_DATA.footerLinks,
    };

    return NextResponse.json(footerData);
  } catch (error) {
    console.error("GET /api/footer-content error:", error);
    return NextResponse.json(DEFAULT_DATA);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: FooterData = await request.json();

    // Delete all existing footer content and insert new
    await supabase.from("footer_content").delete().gt("id", "");

    // Insert new footer content
    const { error } = await supabase.from("footer_content").insert({
      social_links: data.socialLinks,
      footer_links: data.footerLinks,
    });

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to save footer data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error saving footer:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save footer data" },
      { status: 500 }
    );
  }
}
