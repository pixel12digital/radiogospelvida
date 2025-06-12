import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar';
import ChatWidget from './ChatWidget';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rádio Web',
  description: 'Sua rádio online favorita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#fff8f0] min-h-screen">
        <Navbar />
        <main>{children}</main>
        <ChatWidget />
      </body>
    </html>
  )
} 