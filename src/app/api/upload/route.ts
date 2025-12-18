import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'perks'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const filename = `${timestamp}-${random}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('perk-images')
      .upload(`${folder}/${filename}`, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('perk-images')
      .getPublicUrl(`${folder}/${filename}`)

    return NextResponse.json({
      url: publicData.publicUrl,
      path: data.path,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
