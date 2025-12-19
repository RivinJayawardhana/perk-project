import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const perkId = searchParams.get("perk_id");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("leads")
      .select("leads.*, perks(name)")
      .order("submission_timestamp", { ascending: false })
      .range(offset, offset + limit - 1);

    if (perkId) {
      query = query.eq("perk_id", perkId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { perk_id, lead_form_id, form_data, email_address } = body;

    if (!perk_id || !form_data) {
      return NextResponse.json(
        { error: "Missing required fields: perk_id, form_data" },
        { status: 400 }
      );
    }

    // Save lead to database
    const { data: leadData, error: saveError } = await supabase
      .from("leads")
      .insert({
        perk_id,
        lead_form_id,
        form_data,
        email_address,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    // Send email notification
    try {
      const { data: perkData } = await supabase
        .from("perks")
        .select("name")
        .eq("id", perk_id)
        .single();

      const perkName = perkData?.name || "Unknown Perk";
      
      const emailHtml = `
        <h2>New Lead Submission</h2>
        <p><strong>Perk:</strong> ${perkName}</p>
        <p><strong>Submission Time:</strong> ${new Date(leadData.submission_timestamp).toLocaleString()}</p>
        <h3>Form Data:</h3>
        <table style="border-collapse: collapse; width: 100%;">
          ${Object.entries(form_data)
            .map(
              ([key, value]) =>
                `<tr style="border: 1px solid #ddd;">
                  <td style="padding: 8px; font-weight: bold;">${key}</td>
                  <td style="padding: 8px;">${value}</td>
                </tr>`
            )
            .join("")}
        </table>
      `;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: "hello@venturenext.io",
        subject: `New Lead: ${perkName}`,
        html: emailHtml,
      });

      // Update email_sent flag
      await supabase
        .from("leads")
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq("id", leadData.id);
    } catch (emailError: any) {
      console.error("Email sending failed, but lead was saved:", emailError);
      // Don't fail the request if email fails - lead is already saved
    }

    return NextResponse.json(leadData, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
