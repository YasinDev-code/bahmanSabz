import { Center, Container, VStack, Box, Heading, Table, Image, Text, HStack, Button, Badge } from '@chakra-ui/react'
import Link from 'next/link'
import type { GameListItem } from '../types/game'

type Props = {
  games: GameListItem[]
  isLoading?: boolean
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export default function GameList({ games, isLoading, page = 1, totalPages = 1, onPageChange }: Props) {
  if (isLoading) {
    return (
      <Center minH="40vh">
        <Text>در حال بارگذاری...</Text>
      </Center>
    )
  }

  return (
    <VStack gap={8} width="full">
      <Box width="full" overflowX="auto" borderRadius="md" border="1px solid" borderColor="gray.100">
        <Table.Root size="sm" variant="line" interactive>
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader py={4} px={6}>نام</Table.ColumnHeader>
              <Table.ColumnHeader py={4} px={6}>ژانرها</Table.ColumnHeader>
              <Table.ColumnHeader py={4} px={6}>پلتفرم‌ها</Table.ColumnHeader>
              <Table.ColumnHeader py={4} px={6} textAlign="end">امتیاز</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {games.map((g) => (
              <Table.Row key={g.id} _hover={{ bg: 'gray.50' }}>
                <Table.Cell py={4} px={6}>
                  <Link href={`/games/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <HStack gap={4}>
                      {g.background_image && <Image src={g.background_image} alt={g.name} width="80px" borderRadius="md" />}
                      <VStack gap={1} align="flex-start">
                        <Text fontWeight="medium" color="teal.700">{g.name}</Text>
                        <Text fontSize="sm" color="gray.500">{g.released || '—'}</Text>
                      </VStack>
                    </HStack>
                  </Link>
                </Table.Cell>
                <Table.Cell py={4} px={6}>
                  <HStack gap={2} wrap="wrap">
                    {g.genres?.map((genre) => (
                      <Badge key={genre.id} colorPalette="blue" variant="surface">{genre.name}</Badge>
                    ))}
                  </HStack>
                </Table.Cell>
                <Table.Cell py={4} px={6}>
                  <HStack gap={2} wrap="wrap">
                    {g.parent_platforms?.map(({ platform }) => (
                      <Badge key={platform.id} colorPalette="teal" variant="surface">{platform.name}</Badge>
                    ))}
                  </HStack>
                </Table.Cell>
                <Table.Cell py={4} px={6} textAlign="end">
                  <Text fontWeight="bold" color="purple.600">{g.metacritic ?? '—'}</Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {onPageChange && (
        <HStack width="full" justify="space-between">
          <Button
            colorPalette="gray"
            variant="outline"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            قبلی
          </Button>
          <Text color="gray.600">
            صفحه {page} از {totalPages}
          </Text>
          <Button
            colorPalette="gray"
            variant="outline"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            بعدی
          </Button>
        </HStack>
      )}
    </VStack>
  )
}
