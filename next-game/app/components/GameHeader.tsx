'use client'

import { Box, VStack, HStack, Input, Button, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export type GameSearchFilters = {
  search?: string
  tags?: string
}

type Props = {
  initialFilters?: GameSearchFilters
  onChange: (filters: GameSearchFilters) => void
  onSubmit: () => void
}

export default function GameHeader({ initialFilters, onChange, onSubmit }: Props) {
  const [filters, setFilters] = useState<GameSearchFilters>({
    search: '',
    tags: '',
    ...(initialFilters || {}),
  })

  useEffect(() => {
    onChange(filters)
  }, [filters, onChange])

  return (
    <Box width="full">
      <VStack gap={4} width="full">
        <HStack gap={4} width="full">
          <Box width="full">
            <Text mb={2} fontWeight="medium">جستجو</Text>
            <Input
              placeholder="نام بازی..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            />
          </Box>
          {/* <Box width="full">
            <Text mb={2} fontWeight="medium">پلتفرم‌ها</Text>
            <Input
              placeholder="IDs مثل: 18,1,7"
              value={filters.platforms}
              onChange={(e) => setFilters((f) => ({ ...f, platforms: e.target.value }))}
            />
          </Box> */}
        </HStack>
        <Box width="full">
          <Text mb={2} fontWeight="medium">تگ‌ها</Text>
          <Input
            placeholder="Slugها مثل: singleplayer,multiplayer"
            value={filters.tags}
            onChange={(e) => setFilters((f) => ({ ...f, tags: e.target.value }))}
          />
        </Box>
        <HStack width="full" justify="center">
          <Button colorPalette="teal" onClick={onSubmit}>
            جستجو
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}
