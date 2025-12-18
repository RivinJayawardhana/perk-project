import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([body])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ message: 'Contact submission received', data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}
