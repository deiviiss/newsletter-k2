import type { Metadata } from 'next'
import { Providers } from '@/components'
import { textFont } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Educational Newsletters',
    default: 'Educational Newsletters'
  },
  description:
    'Access the newsletters from Newsletters K2. Stay up to date with our latest news, topics, and exclusive resources.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={textFont.className}>
        <Providers>
          {children}
        </Providers >
      </body>
    </html >
  )
}
