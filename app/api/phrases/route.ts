import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// 서버 측 캐시: 1시간마다 재검증 (비용 절감)
export const revalidate = 3600

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let query = supabase
    .from('phrases')
    .select('id, content, category, is_user_submitted, created_at')
    .order('id')

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // HTTP Cache-Control: 1시간 캐시 (CDN/브라우저 캐시로 비용 절감)
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}