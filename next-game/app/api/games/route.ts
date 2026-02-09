import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  // Query Params
  const page = searchParams.get('page') ?? '1'
  const page_size = searchParams.get('page_size') ?? '10'
  // Filtering
  const search = searchParams.get('search') ?? ''
  const tags = searchParams.get('tags') ?? ''
  //API Key
  const key = process.env.gameKey
  if (!key) {
    return NextResponse.json({ error: 'Missing RAWG API key (env: gameKey)' }, { status: 500 })
  }

  const queryString = new URLSearchParams({
    key,
    page,
    page_size,
  })
  if (search) queryString.append('search', search)
  if (tags) queryString.append('tags', tags)

  const url = `https://api.rawg.io/api/games?${queryString.toString()}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch from RAWG' }, { status: 500 })
  }
}
