import { Button, Heading, Text, VStack, Container, Center } from '@chakra-ui/react'

export default function Home() {
  return (
    <Center minH="100vh" bg="gray.50" p={4}>
      <Container maxW="md" bg="white" p={10} borderRadius="xl" boxShadow="lg">
        <VStack gap={6} textAlign="center">
          <Heading size="2xl" color="teal.700">
            خوش آمدید به Next Game
          </Heading>
          <Text color="gray.600">
            پروژه Next.js با Chakra UI بر اساس داکیومنت رسمی
          </Text>
          <Button colorPalette="teal" size="lg">
            تست دکمه چاکرا
          </Button>
        </VStack>
      </Container>
    </Center>
  )
}
