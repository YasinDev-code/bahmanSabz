'use client'

import { Center, Container, VStack, Box, Heading, Image, Text, HStack, Badge, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { GameDetails } from '../../types/game'
import Link from 'next/link'

export default function GameDetailsPage() {
  const [game, setGame] = useState<GameDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const id = String(params.id)

  useEffect(() => {
    async function fetchDetails() {
      setIsLoading(true)
      const res = await fetch(`/api/games/${id}`)
      const data = await res.json()
      setGame(data)
      setIsLoading(false)
    }
    fetchDetails()
  }, [id])

  if (isLoading) {
    return (
      <Center minH="100vh" p={4} bg="gray.50">
        <Text>در حال بارگذاری...</Text>
      </Center>
    )
  }

  if (!game) {
    return (
      <Center minH="100vh" p={4} bg="gray.50">
        <Text>بازی یافت نشد</Text>
      </Center>
    )
  }

  return (
    <Center minH="100vh" p={4} bg="gray.50">
      <Container maxW="4xl" bg="white" p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="lg">
        <VStack gap={8} width="full" align="stretch">
          <Box textAlign="center" width="full">
            <Heading size="2xl" mb={2} color="teal.700">
              {game.name}
            </Heading>
            <Box height="2px" bg="teal.100" width="100px" mx="auto" borderRadius="full" />
          </Box>

          {game.background_image && (
            <Image src={game.background_image} alt={game.name} borderRadius="lg" />
          )}

          <Text color="gray.700">
            {game.description_raw || 'توضیحاتی موجود نیست'}
          </Text>

          <HStack gap={4} wrap="wrap">
            {game.genres?.map((genre) => (
              <Badge key={genre.id} colorPalette="blue" variant="surface">{genre.name}</Badge>
            ))}
          </HStack>

          <HStack gap={4} wrap="wrap">
            {game.parent_platforms?.map(({ platform }) => (
              <Badge key={platform.id} colorPalette="teal" variant="surface">{platform.name}</Badge>
            ))}
          </HStack>

          <HStack gap={4} wrap="wrap">
            {game.tags?.map((tag) => (
              <Badge key={tag.id} colorPalette="purple" variant="surface">{tag.name}</Badge>
            ))}
          </HStack>

          <HStack width="full" justify="space-between">
            <Text color="gray.600">متاکریتیک: {game.metacritic ?? '—'}</Text>
            <Text color="gray.600">تاریخ انتشار: {game.released || '—'}</Text>
          </HStack>

          <Link href="/" style={{ width: '100%' }}>
            <Button colorPalette="gray" variant="outline" width="full" size="lg">
              بازگشت
            </Button>
          </Link>
        </VStack>
      </Container>
    </Center>
  )
}
