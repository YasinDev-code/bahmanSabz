'use client'

import { Center, Container, VStack, Heading, Box } from '@chakra-ui/react'
import GameHeader, { GameSearchFilters } from './components/GameHeader'
import GameFetcher from './components/GameFetcher'
import { useState } from 'react'

export default function Home() {
  const [filters, setFilters] = useState<GameSearchFilters>({})
  const [page, setPage] = useState(1)

  const handleSubmit = () => {
    setPage(1)
  }

  return (
    <Center minH="100vh" p={4} bg="gray.50">
      <Container maxW="6xl" bg="white" p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="lg">
        <VStack gap={8} width="full">
          <Box textAlign="center" width="full">
            <Heading size="2xl" mb={2} color="teal.700">
              جستجوی بازی‌ها
            </Heading>
            <Box height="2px" bg="teal.100" width="100px" mx="auto" borderRadius="full" />
          </Box>

          <GameHeader
            initialFilters={filters}
            onChange={(f) => setFilters(f)}
            onSubmit={handleSubmit}
          />

          <GameFetcher
            filters={filters}
            page={page}
            onPageChange={(p) => setPage(p)}
          />
        </VStack>
      </Container>
    </Center>
  )
}
