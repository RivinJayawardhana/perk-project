import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Try to fetch by ID first, then by slug
    const { data, error } = await supabase
      .from("journals")
      .select("*")
      .or(`id.eq.${slug},slug.eq.${slug}`)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    if (!data)
      return NextResponse.json(
        { error: "Journal not found" },
        { status: 404 }
      );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /api/journals/[slug] error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await req.json();

    const { data, error } = await supabase
      .from("journals")
      .update(body)
      .eq("id", slug)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("PUT /api/journals/[slug] error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { error } = await supabase
      .from("journals")
      .delete()
      .eq("id", slug);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/journals/[slug] error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
