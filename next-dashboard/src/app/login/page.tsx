"use client"
import { setAccessToken, refreshToken, setUser } from '@/utils/auth';
import { Box, Button, Center, Container, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter()
    // const toast = useToast()
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const handleLogin = async () => {
        try {
            const res = await fetch('https://dummyjson.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                }),
            });
            const data = await res.json();
            if (data.accessToken) {
                setAccessToken(data.accessToken);
                refreshToken(data.refreshToken);
                setUser(data);
                // toast({
                //     title: "ورود موفقیت آمیز بود",
                //     status: "success",
                //     duration: 2000,
                //     isClosable: true,
                // });
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Center minH="100vh" p={4} bg="gray.50">
            <Container maxW="md" bg="white" p={10} borderRadius="xl" boxShadow="lg">
                <VStack gap={8} align="center" textAlign="center">
                    <Box>
                        <Heading size="2xl" mb={4} color="teal.700">
                            خوش آمدید
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            به پنل مدیریت بهمن سبز خوش آمدید.
                        </Text>
                        <Input
                            placeholder="ایمیل"
                            type="email"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            width="full"
                            size="lg"
                            color="green.600"
                            mb={4}
                        />
                        <Input
                            placeholder="رمز عبور"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            width="full"
                            size="lg"
                            color="green.600"
                            mb={4}
                        />
                        <Button
                            colorPalette="teal"
                            variant="solid"
                            width="full"
                            size="lg"
                            disabled={!form.username || !form.password}
                            mb={4}
                            onClick={handleLogin}
                        >
                            ورود
                        </Button>
                    </Box>
                </VStack>
            </Container>
        </Center>
    )
}

export default LoginPage
