'use client'

import { useEffect, useState } from 'react'
import GameList from './GameList'
import type { GameListItem } from '../types/game'
import type { GameSearchFilters } from './GameHeader'

type Props = {
  filters: GameSearchFilters
  page: number
  onPageChange: (page: number) => void
}

export default function GameFetcher({ filters, page, onPageChange }: Props) {
  const [games, setGames] = useState<GameListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // for pagination
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const queryString = new URLSearchParams({
        page: String(page),
        page_size: '10',
      })
      if (filters.search) queryString.append('search', filters.search)
      if (filters.tags) queryString.append('tags', filters.tags)

      const res = await fetch(`/api/games?${queryString.toString()}`)
      const data = await res.json()
      setGames(data.results || [])
      const count = Number(data.count || 0)
      setTotalPages(Math.max(1, Math.ceil(count / 10)))
      setIsLoading(false)
    }
    fetchData()
  }, [filters, page])

  return <GameList games={games} isLoading={isLoading} page={page} totalPages={totalPages} onPageChange={onPageChange} />
}
