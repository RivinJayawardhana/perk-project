import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface SEOData {
  metaTitle: string;
  metaDescription: string;
}

interface ContactPageContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
  };
  seo?: SEOData;
}

const DEFAULT_CONTENT: ContactPageContent = {
  hero: {
    subtitle: "Contact us",
    title: "We'd love to hear from you",
    description: "Whether you have a question about perks, partnerships, or anything else—our team is ready to help.",
  },
  seo: {
    metaTitle: "Contact VentureNext - Get in Touch",
    metaDescription: "Have questions about VentureNext? Contact our team and we'll be happy to help with any inquiries.",
  },
};

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "contact")
      .order("section_order", { ascending: true });

    if (error || !data || data.length === 0) {
      console.log("No contact content found, returning defaults");
      return NextResponse.json(DEFAULT_CONTENT);
    }

    const content: ContactPageContent = DEFAULT_CONTENT;

    for (const row of data) {
      if (row.section_type === "hero") {
        content.hero = {
          subtitle: row.title || DEFAULT_CONTENT.hero.subtitle,
          title: row.description || DEFAULT_CONTENT.hero.title,
          description: row.content || DEFAULT_CONTENT.hero.description,
        };
      } else if (row.section_type === "seo") {
        content.seo = {
          metaTitle: row.title || DEFAULT_CONTENT.seo?.metaTitle || "",
          metaDescription: row.description || DEFAULT_CONTENT.seo?.metaDescription || "",
        };
      }
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching contact content:", error);
    return NextResponse.json(DEFAULT_CONTENT);
  }
}

export async function POST(request: NextRequest) {
  try {
    const content: ContactPageContent = await request.json();

    // Delete existing contact hero content
    await supabase
      .from("page_content")
      .delete()
      .eq("page_name", "contact");

    const rows: any[] = [
      {
        page_name: "contact",
        section_type: "hero",
        title: content.hero.subtitle,
        description: content.hero.title,
        content: content.hero.description,
        section_order: 1,
      },
    ];

    // Add SEO row if present
    if (content.seo) {
      rows.push({
        page_name: "contact",
        section_type: "seo",
        title: content.seo.metaTitle || "",
        description: content.seo.metaDescription || "",
        content: "",
        section_order: 0,
      });
    }

    const { error } = await supabase
      .from("page_content")
      .insert(rows);

    if (error) throw error;

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error saving contact content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
