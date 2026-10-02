import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { AIChatbot } from '@/components/chat/AIChatbot'

export const metadata: Metadata = {
  title: {
    default: 'PhishGuard — Interactive Phishing Awareness Learning Platform',
    template: '%s | PhishGuard',
  },
  description:
    'Master phishing awareness through structured lessons, interactive flashcards, scenario-based quizzes, and real-world simulations. Learn to identify and defend against phishing attacks.',
  keywords: ['phishing', 'cybersecurity', 'awareness', 'learning', 'education', 'online safety'],
  openGraph: {
    title: 'PhishGuard — Interactive Phishing Awareness Learning Platform',
    description: 'Master phishing awareness through deep, interactive lessons.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ paddingTop: 'var(--nav-height)' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
