import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface PerksPageContent {
  hero: {
    title: string;
    description: string;
  };
}

const DEFAULT_CONTENT: PerksPageContent = {
  hero: {
    title: "Discover your next perk",
    description: "Browse 500+ exclusive deals on tools, services, and experiences for founders and teams.",
  },
};

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_name", "perks")
      .eq("section_type", "hero")
      .single();

    if (error) {
      console.log("No perks hero content found, returning defaults");
      return NextResponse.json(DEFAULT_CONTENT);
    }

    const content: PerksPageContent = {
      hero: {
        title: data.title || DEFAULT_CONTENT.hero.title,
        description: data.description || DEFAULT_CONTENT.hero.description,
      },
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching perks content:", error);
    return NextResponse.json(DEFAULT_CONTENT);
  }
}

export async function POST(request: NextRequest) {
  try {
    const content: PerksPageContent = await request.json();

    // Delete existing perks hero content
    await supabase
      .from("page_content")
      .delete()
      .eq("page_name", "perks")
      .eq("section_type", "hero");

    // Insert new hero section
    const { error } = await supabase
      .from("page_content")
      .insert({
        page_name: "perks",
        section_type: "hero",
        title: content.hero.title,
        description: content.hero.description,
        content: "",
        section_order: 1,
      });

    if (error) throw error;

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error saving perks content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
