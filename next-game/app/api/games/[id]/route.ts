import { NextResponse } from 'next/server'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const key = process.env.gameKey
  if (!key) {
    return NextResponse.json({ error: 'Missing RAWG API key (env: gameKey)' }, { status: 500 })
  }
  const url = `https://api.rawg.io/api/games/${params.id}?key=${key}`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch game details' }, { status: 500 })
  }
}
