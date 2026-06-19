import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import SessionProvider from '@/components/layout/SessionProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'DramaStorm — Türk & Asya Dramalar',
  description: "Türkiye'nin en büyük drama platformu.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}