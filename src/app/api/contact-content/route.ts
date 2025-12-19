import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface ContactPageContent {
  hero: {
    subtitle: string;
    title: string;
    description: string;
  };
}

const DEFAULT_CONTENT: ContactPageContent = {
  hero: {
    subtitle: "Contact us",
    title: "We'd love to hear from you",
    description: "Whether you have a question about perks, partnerships, or anything else—our team is ready to help.",
  },
};

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "contact")
      .eq("section_type", "hero")
      .single();

    if (error) {
      console.log("No contact hero content found, returning defaults");
      return NextResponse.json(DEFAULT_CONTENT);
    }

    const content: ContactPageContent = {
      hero: {
        subtitle: data.title || DEFAULT_CONTENT.hero.subtitle,
        title: data.description || DEFAULT_CONTENT.hero.title,
        description: data.content || DEFAULT_CONTENT.hero.description,
      },
    };

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
      .eq("page_name", "contact")
      .eq("section_type", "hero");

    // Insert new hero section
    const { error } = await supabase
      .from("page_content")
      .insert({
        page_name: "contact",
        section_type: "hero",
        title: content.hero.subtitle,
        description: content.hero.title,
        content: content.hero.description,
        section_order: 1,
      });

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
