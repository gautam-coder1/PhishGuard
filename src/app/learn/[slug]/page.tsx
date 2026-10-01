import { getTopicBySlug, getNextTopic, getPreviousTopic } from '@/lib/curriculum/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ProgressTracker } from '@/components/learn/ProgressTracker'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return {}
  return {
    title: topic.title,
    description: topic.objective,
  }
}

const difficultyColors = {
  Beginner: 'badge-beginner',
  Intermediate: 'badge-intermediate',
  Advanced: 'badge-advanced',
}

export default async function LearnTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) notFound()

  const nextTopic = getNextTopic(topic.id)
  const prevTopic = getPreviousTopic(topic.id)

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      <ProgressTracker topicId={topic.id} />
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', padding: 'var(--space-3) 0' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
            <span>›</span>
            <Link href="/roadmap" style={{ color: 'var(--color-text-muted)' }}>Roadmap</Link>
            <span>›</span>
            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{topic.title}</span>
          </nav>
        </div>
      </div>

      {/* Topic Header */}
      <div
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(99, 140, 255, 0.08) 0%, transparent 60%)',
          borderBottom: '1px solid var(--color-border)',
          padding: 'var(--space-12) 0',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 'var(--content-max-width)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link
                href="/roadmap"
                className="btn btn-ghost btn-sm"
                style={{ padding: 'var(--space-2) 0', color: 'var(--color-text-muted)' }}
              >
                ← Back to Roadmap
              </Link>
              <span className={`badge level-bg-${topic.level} level-color-${topic.level}`} style={{ border: '1px solid' }}>
                Level {topic.level} — {topic.levelName}
              </span>
              <span className={`badge ${difficultyColors[topic.difficulty]}`}>
                {topic.difficulty}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                ~{topic.estimatedMinutes} min read
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: 'var(--space-4)' }}>
              {topic.title}
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '640px' }}>
              {topic.description}
            </p>

            {/* Learning cycle progress */}
            <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {[
                { label: '📖 Lesson', active: true, href: `/learn/${slug}` },
                { label: '🃏 Flashcards', active: false, href: `/learn/${slug}/flashcards` },
                { label: '🎯 Quiz', active: false, href: `/learn/${slug}/quiz` },
              ].map((step) => (
                <Link
                  key={step.label}
                  href={step.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    background: step.active ? 'var(--color-accent-dim)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${step.active ? 'var(--color-border-active)' : 'var(--color-border)'}`,
                    color: step.active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {step.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container" style={{ paddingTop: 'var(--space-10)' }}>
        <div style={{ maxWidth: 'var(--content-max-width)' }}>

          {/* 1. Learning Objective */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <div className="callout callout-info">
              <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>🎯</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>
                  Learning Objective
                </div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                  {topic.objective}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Simple Explanation */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
              1. Simple Explanation
            </h2>
            <div
              className="card"
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                borderLeft: '3px solid var(--color-accent)',
              }}
            >
              {topic.simpleExplanation}
            </div>
          </section>

          {/* 3. Technical Explanation */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
              2. Technical Deep Dive
            </h2>
            <div
              className="card"
              style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {topic.technicalExplanation}
            </div>
          </section>

          {/* 4. Real World Example */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
              3. Real-World Example
            </h2>
            <div
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--color-warning), var(--color-error))',
                }}
                aria-hidden="true"
              />
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: '1.25rem' }}>📋</span>
                <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>
                  Realistic Attack Scenario (Fictional — for educational purposes)
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                {topic.realWorldExample}
              </p>
            </div>
          </section>

          {/* 5. Attack Flow */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
              4. Anatomy of the Attack
            </h2>
            <div className="card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {topic.attackFlow.map((step, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-accent-dim)',
                        border: '1px solid var(--color-border-active)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                        flexShrink: 0,
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {i + 1}
                      </div>
                      <div style={{ padding: 'var(--space-1) 0', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        {step}
                      </div>
                    </div>
                    {i < topic.attackFlow.length - 1 && (
                      <div style={{ marginLeft: '14px', width: '1px', height: '16px', background: 'var(--color-border)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-1)' }} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. Red Flags */}
          {topic.redFlags.length > 0 && (
            <section style={{ marginBottom: 'var(--space-10)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
                5. Red Flags — and Why They Work
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {topic.redFlags.map((flag, i) => (
                  <div key={i} className="card" style={{ borderLeft: '3px solid var(--color-error)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🚩</span>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>
                          {flag.title}
                        </h3>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                          {flag.why}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Misconceptions */}
          {topic.misconceptions.length > 0 && (
            <section style={{ marginBottom: 'var(--space-10)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
                6. Common Misconceptions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {topic.misconceptions.map((m, i) => (
                  <div key={i} className="card">
                    <div style={{ marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>❌</span>
                      <div>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-error)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Myth
                        </div>
                        <p style={{ fontSize: 'var(--text-sm)', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                          &quot;{m.myth}&quot;
                        </p>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>✅</span>
                      <div>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-success)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Reality
                        </div>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                          {m.reality}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. Key Takeaways */}
          <section style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
              7. Key Takeaways
            </h2>
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, var(--color-bg-elevated), var(--color-bg-card))',
                border: '1px solid var(--color-border-active)',
              }}
            >
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {topic.keyTakeaways.map((point, i) => (
                  <li key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--color-success)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>
                      {i + 1}.
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Continue Learning CTA */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-6)', letterSpacing: '-0.02em' }}>
              Continue Learning
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
              {/* Flashcards CTA */}
              <Link
                href={`/learn/${slug}/flashcards`}
                id={`lesson-to-flashcards-btn`}
                style={{
                  display: 'block',
                  background: 'var(--color-accent-dim)',
                  border: '1px solid var(--color-border-active)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-base)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>🃏</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                  Review Flashcards
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  {topic.flashcards.length} cards — active recall practice
                </div>
                <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 600 }}>
                  Start →
                </div>
              </Link>

              {/* Quiz CTA */}
              <Link
                href={`/learn/${slug}/quiz`}
                id={`lesson-to-quiz-btn`}
                style={{
                  display: 'block',
                  background: 'rgba(52, 211, 153, 0.06)',
                  border: '1px solid rgba(52, 211, 153, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-base)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>🎯</div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                  Take the Quiz
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  {topic.quiz.length} questions — test your understanding
                </div>
                <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-success)', fontWeight: 600 }}>
                  Start →
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              {prevTopic ? (
                <Link href={`/learn/${prevTopic.slug}`} className="btn btn-secondary" id="prev-topic-btn">
                  ← {prevTopic.title}
                </Link>
              ) : (
                <Link href="/roadmap" className="btn btn-ghost">
                  ← Back to Roadmap
                </Link>
              )}

              {nextTopic && (
                <Link href={`/learn/${nextTopic.slug}`} className="btn btn-primary" id="next-topic-btn">
                  Next: {nextTopic.title} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
