import { NextRequest, NextResponse } from "next/server";

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

let footerData: FooterData = DEFAULT_DATA;

export async function GET() {
  return NextResponse.json(footerData);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    footerData = data;
    return NextResponse.json({ success: true, data: footerData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save footer data" },
      { status: 500 }
    );
  }
}
