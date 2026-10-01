import { getTopicBySlug } from '@/lib/curriculum/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { QuizEngine } from '@/components/learn/QuizEngine'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return {}
  return { title: `Quiz: ${topic.title}` }
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) notFound()

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', padding: 'var(--space-6) 0' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
            <Link href="/roadmap" style={{ color: 'var(--color-text-muted)' }}>Roadmap</Link>
            <span>›</span>
            <Link href={`/learn/${slug}`} style={{ color: 'var(--color-text-muted)' }}>{topic.title}</Link>
            <span>›</span>
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Quiz</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-1)' }}>
                🎯 Quiz
              </div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                {topic.title}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {[
                { label: '📖 Lesson', href: `/learn/${slug}`, active: false },
                { label: '🃏 Flashcards', href: `/learn/${slug}/flashcards`, active: false },
                { label: '🎯 Quiz', href: `/learn/${slug}/quiz`, active: true },
              ].map((step) => (
                <Link
                  key={step.label}
                  href={step.href}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    background: step.active ? 'rgba(52, 211, 153, 0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${step.active ? 'rgba(52,211,153,0.3)' : 'var(--color-border)'}`,
                    color: step.active ? 'var(--color-success)' : 'var(--color-text-muted)',
                    textDecoration: 'none',
                  }}
                >
                  {step.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Engine */}
      <div style={{ paddingTop: 'var(--space-8)' }}>
        <QuizEngine topic={topic} />
      </div>
    </div>
  )
}
