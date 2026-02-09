export type GameListItem = {
    id: number
    slug: string
    name: string
    background_image: string | null
    released: string | null
    metacritic: number | null
    genres: { id: number; name: string; slug: string }[]
    parent_platforms: { platform: { id: number; name: string; slug: string } }[]
}

export type GameDetails = GameListItem & {
    description_raw?: string
    tags?: { id: number; name: string; slug: string }[]
    short_screenshots?: { id: number; image: string }[]
}
