import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface PrivacyContent {
  sections: Array<{ id: string; heading: string; slug: string; content: string }>;
}

const DEFAULT_CONTENT: PrivacyContent = {
  sections: [
    {
      id: "1",
      heading: "Privacy Policy",
      slug: "privacy-policy",
      content: "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.",
    },
    {
      id: "2",
      heading: "Information We Collect",
      slug: "information-we-collect",
      content: "We collect information you provide directly to us, such as when you create an account or contact us.",
    },
    {
      id: "3",
      heading: "How We Use Your Information",
      slug: "how-we-use-your-information",
      content: "We use the information we collect to provide, maintain, and improve our services.",
    },
    {
      id: "4",
      heading: "Data Security",
      slug: "data-security",
      content: "We take reasonable measures to protect your personal information from unauthorized access.",
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "privacy")
      .order("section_order", { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(DEFAULT_CONTENT);
    }

    // Transform database rows into PrivacyContent interface
    const sections = data.map((row) => ({
      id: row.id || row.section_order.toString(),
      heading: row.title || "Section",
      slug: row.description || "",
      content: row.content || "",
    }));

    return NextResponse.json({ sections });
  } catch (error) {
    console.error("Error fetching privacy content:", error);
    return NextResponse.json(DEFAULT_CONTENT);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PrivacyContent = await request.json();

    // Delete existing privacy page content
    await supabase.from("page_content").delete().eq("page_name", "privacy");

    // Insert new sections
    const rows = body.sections.map((section, index) => ({
      page_name: "privacy",
      section_type: "privacy_section",
      title: section.heading,
      description: section.slug,
      content: section.content,
      section_order: index + 1,
      metadata: { id: section.id },
    }));

    const { error } = await supabase.from("page_content").insert(rows);

    if (error) throw error;

    return NextResponse.json({ success: true, content: body });
  } catch (error) {
    console.error("Error saving privacy content:", error);
    return NextResponse.json(
      { error: "Failed to save content", details: error instanceof Error ? error.message : "" },
      { status: 400 }
    );
  }
}
