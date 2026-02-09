import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Next Game',
  description: 'Next.js app with Chakra UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
