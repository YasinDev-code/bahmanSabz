"use client"
import { ProductTable } from '@/types/product';
import { getAccessToken } from '@/utils/auth';
import { Table, Center, Container, Heading, Box, VStack, Button, Badge, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toFaNumber } from '@/utils/toFaNumber';
import Image from 'next/image';

function ProductPage() {
    const router = useRouter()
    const [products, setProducts] = useState<ProductTable[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // it could be hook to check if user is logged in or not
        const token = getAccessToken()
        if (!token) {
            router.push('/login')
            return
        }

        async function fetchProducts() {
            try {
                const res = await fetch('https://dummyjson.com/products?limit=5&select=id,thumbnail,title,price,category,stock,brand')
                const data = await res.json()
                setProducts(data.products || [])
                console.log(data.products)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [router])

    if (isLoading) return null

    return (
        <Center minH="100vh" p={4} bg="gray.50">
            <Container maxW="5xl" bg="white" p={{ base: 6, md: 10 }} borderRadius="xl" boxShadow="lg">
                <VStack gap={8} width="full">
                    <Box textAlign="center" width="full">
                        <Heading size="2xl" mb={2} color="blue.700">
                            لیست محصولات
                        </Heading>
                        <Box height="2px" bg="blue.100" width="100px" mx="auto" borderRadius="full" />
                    </Box>

                    <Box width="full" overflowX="auto" borderRadius="md" border="1px solid" borderColor="gray.100">
                        <Table.Root size="sm" variant="line" interactive>
                            <Table.Header bg="gray.50">
                                <Table.Row>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">تصویر</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">عنوان محصول</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">برند</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">دسته بندی</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">موجودی</Table.ColumnHeader>
                                    <Table.ColumnHeader py={4} px={6} textAlign="center">قیمت</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {products.map((product: ProductTable) => (
                                    <Table.Row key={product.id} _hover={{ bg: "green.500", color:"white" }} color="black">
                                        <Table.Cell py={4} px={6} textAlign="center">
                                            <Image src={product.thumbnail} alt={product.title} width={50} height={50} />
                                        </Table.Cell>
                                        <Table.Cell py={4} px={6} textAlign="center" fontWeight="medium">{product.title}</Table.Cell>
                                        <Table.Cell py={4} px={6} textAlign="center">{product.brand}</Table.Cell>
                                        <Table.Cell py={4} px={6} textAlign="center">
                                            <Badge py={1} px={2} colorPalette="blue" variant="surface">
                                                {product.category}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell py={4} px={6} textAlign="center">
                                            <Text fontSize="lg" fontWeight="medium" direction="rtl" color={product.stock < 10 ? "red.500" : "gray.600"}>
                                                {toFaNumber(product.stock)} عدد
                                            </Text>
                                        </Table.Cell>
                                        <Table.Cell py={4} px={6} textAlign="center" fontWeight="bold" color="blue.600">
                                            ${product.price}
                                        </Table.Cell>
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

export default ProductPage