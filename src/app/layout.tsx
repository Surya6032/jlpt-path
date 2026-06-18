import type { Metadata } from 'next'
import './globals.css'
import { AppLayout } from '@/components/layout/AppLayout'

export const metadata: Metadata = {
  title: 'JLPT Path — Learn Japanese from Zero to N4',
  description: 'Your complete self-study platform for JLPT N5 and N4. Learn Hiragana, Katakana, Vocabulary, Kanji, Grammar, Reading, and Listening — all in one place.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
