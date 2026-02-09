"use client"
import { UserTable } from '@/types/user';
import { getAccessToken } from '@/utils/auth';
import { Table, Center, Container, Heading, Box, VStack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function UsersPage() {
    const [users, setUsers] = useState<UserTable[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            router.push('/login')
            return
        }

        async function fetchUsers() {
            try {
                const res = await fetch('https://dummyjson.com/users?limit=5&select=firstName,id,age,email')
                const data = await res.json()
                setUsers(data.users || [])
            } catch (error) {
                console.error("Error fetching users:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [router])

    if (isLoading) return null

    return (
        <Center minH="100vh" p={4} bg="gray.50">
            <Container maxW="3xl" bg="white" p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="lg">
                <VStack gap={8} width="full">
                    <Box textAlign="center" width="full">
                        <Heading size="2xl" mb={2} color="teal.700">
                            لیست کاربران
                        </Heading>
                        <Box height="2px" bg="teal.100" width="100px" mx="auto" borderRadius="full" />
                    </Box>

                    <Box width="full" overflowX="auto" borderRadius="md" border="1px solid" borderColor="gray.100">
                        <Table.Root size="sm" variant="line" interactive>
                            <Table.Header bg="gray.50">
                                <Table.Row>
                                    <Table.ColumnHeader py={4} px={6}>نام</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6}>سن</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">ایمیل</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users.map((user: UserTable) => (
                                    <Table.Row key={user.id} _hover={{ bg: "green.500", color:"white" }} color="black">
                                        <Table.Cell py={4} px={6}>{user.firstName}</Table.Cell>
                                        <Table.Cell py={4} px={6}>{user.age}</Table.Cell>
                                        <Table.Cell py={4} px={6} textAlign="center">{user.email}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>

                    <Link href="/" style={{ width: '100%' }}>
                        <Button colorPalette="blue" variant="solid" width="full" size="lg">
                            بازگشت به داشبورد
                        </Button>
                    </Link>
                </VStack>
            </Container>
        </Center>
    )
}

export default UsersPage