import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Insert into partner_applications table
    const { data, error } = await supabase
      .from('partner_applications')
      .insert([{
        company: body.company,
        contact: body.contact,
        email: body.email,
        website: body.website,
        offer: body.offer,
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: 'hello@venturenext.io',
        subject: `New Partner Application from ${body.company}`,
        html: `
          <h2>New Partner Application</h2>
          <p><strong>Company:</strong> ${body.company}</p>
          <p><strong>Contact Name:</strong> ${body.contact}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Website:</strong> ${body.website}</p>
          <p><strong>Offer Description:</strong></p>
          <p>${body.offer.replace(/\n/g, '<br>')}</p>
        `,
      })
    } catch (emailError) {
      console.error('Email send error:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ message: 'Partner application received', data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit partner application' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('partner_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch partner applications' }, { status: 500 })
  }
}
