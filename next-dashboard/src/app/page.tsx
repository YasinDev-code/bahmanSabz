"use client"
import { getAccessToken, getUser } from '@/utils/auth';
import { Button, Heading, Text, VStack, HStack, Container, Box, Center, Avatar } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter()
  const user = getUser()

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
            <Avatar.Root size="xl" mb={4}>
              <Avatar.Fallback name={user?.firstName} />
              <Avatar.Image src={user?.image} />
            </Avatar.Root>
            <Heading size="2xl" mb={4} color="teal.700">
              خوش آمدید, {user?.firstName} {user?.lastName}
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
