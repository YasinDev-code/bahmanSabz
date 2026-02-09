"use client"
import { getAccessToken } from '@/utils/auth';
import { Button, Heading, Text, VStack, HStack, Container, Box, Center } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      router.push('/login')
    }
  }, [router])

  return (
    <Center minH="100vh" p={4} bg="gray.50">
      <Container maxW="md" bg="white" p={10} borderRadius="xl" boxShadow="lg">
        <VStack gap={8} align="center" textAlign="center">
          <Box>
            <Heading size="2xl" mb={4} color="teal.700">
              خوش آمدید
            </Heading>
            <Text fontSize="lg" color="gray.600">
              به پنل مدیریت بهمن سبز خوش آمدید. برای شروع یکی از بخش‌های زیر را انتخاب کنید.
            </Text>
          </Box>

          <HStack gap={4} width="full" justify="center">
            <Link href="/dashboard/users" style={{ flex: 1 }}>
              <Button colorPalette="teal" variant="solid" width="full" size="lg">
                کاربران
              </Button>
            </Link>
            <Link href="/dashboard/products" style={{ flex: 1 }}>
              <Button colorPalette="blue" variant="solid" width="full" size="lg">
                محصولات
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Center>
  );
}
