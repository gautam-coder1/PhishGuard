import Link from 'next/link'
import { curriculum } from '@/lib/curriculum/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Roadmap',
  description: 'Phishing awareness curriculum: 8 levels covering foundations, attack types, psychology, detection, and protection.',
}

const levelIcons = ['🎯', '🎣', '🔬', '🧠', '🔍', '🌐', '🛡️', '🚨']

const difficultyColors = {
  Beginner: 'badge-beginner',
  Intermediate: 'badge-intermediate',
  Advanced: 'badge-advanced',
}

export default function RoadmapPage() {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(99, 140, 255, 0.12) 0%, transparent 70%)',
          borderBottom: '1px solid var(--color-border)',
          padding: 'var(--space-16) 0 var(--space-12)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div className="section-label">Curriculum</div>
          <h1 className="section-title" style={{ marginTop: 'var(--space-2)' }}>
            Phishing Awareness Roadmap
          </h1>
          <p className="section-desc" style={{ maxWidth: '560px', margin: 'var(--space-3) auto 0' }}>
            {curriculum.length} levels, {curriculum.reduce((a, l) => a + l.topics.length, 0)} deep lessons.
            Complete each topic by reading the lesson, reviewing flashcards, and passing the quiz.
          </p>

          {/* Learning cycle indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-8)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-3) var(--space-6)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['📖 Learn', '→', '🃏 Flashcards', '→', '🎯 Quiz', '→', '✅ Complete', '→', '▶ Next Topic'].map((step, i) => (
              <span
                key={i}
                style={{
                  fontSize: step === '→' ? 'var(--text-xs)' : 'var(--text-sm)',
                  color: step === '→' ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                  fontWeight: step.includes('→') ? 400 : 600,
                }}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className="container" style={{ paddingTop: 'var(--space-12)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
          {curriculum.map((level) => (
            <section key={level.id} id={`level-${level.id}`} aria-labelledby={`level-${level.id}-title`}>
              {/* Level header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div
                  className={`level-bg-${level.id}`}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                    border: '1px solid',
                  }}
                  aria-hidden="true"
                >
                  {levelIcons[level.id - 1]}
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                    Level {level.id}
                  </div>
                  <h2
                    id={`level-${level.id}-title`}
                    style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em' }}
                    className={`level-color-${level.id}`}
                  >
                    {level.name}
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {level.description}
                  </p>
                </div>
              </div>

              {/* Topics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 'var(--space-4)',
                  paddingLeft: 'var(--space-8)',
                  borderLeft: `2px solid rgba(var(--level-${level.id}-rgb, 99,140,255), 0.2)`,
                }}
              >
                {level.topics.map((topic, topicIndex) => (
                  <div
                    key={topic.id}
                    className="card"
                    id={`topic-card-${topic.id}`}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    {/* Topic number */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 'var(--space-4)',
                        right: 'var(--space-4)',
                        width: '24px',
                        height: '24px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                      }}
                      aria-hidden="true"
                    >
                      {topicIndex + 1}
                    </div>

                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-2)', paddingRight: 'var(--space-8)' }}>
                      {topic.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                      {topic.description}
                    </p>

                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                      <span className={`badge ${difficultyColors[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        ~{topic.estimatedMinutes} min
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {topic.flashcards.length} flashcards
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {topic.quiz.length} quiz questions
                      </span>
                    </div>

                    {/* Learning cycle buttons */}
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      <Link
                        href={`/learn/${topic.slug}`}
                        className="btn btn-primary btn-sm"
                        id={`learn-btn-${topic.id}`}
                      >
                        📖 Learn
                      </Link>
                      <Link
                        href={`/learn/${topic.slug}/flashcards`}
                        className="btn btn-secondary btn-sm"
                        id={`flashcards-btn-${topic.id}`}
                      >
                        🃏 Flashcards
                      </Link>
                      <Link
                        href={`/learn/${topic.slug}/quiz`}
                        className="btn btn-secondary btn-sm"
                        id={`quiz-btn-${topic.id}`}
                      >
                        🎯 Quiz
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 'var(--space-16)',
            textAlign: 'center',
            padding: 'var(--space-12)',
            background: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>🎓</div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-3)', letterSpacing: '-0.03em' }}>
            Ready to start your journey?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)' }}>
            Begin with Level 1 — Foundations and work through the curriculum at your own pace.
          </p>
          <Link href="/learn/what-is-phishing" className="btn btn-primary btn-lg" id="start-first-lesson-btn">
            Start Lesson 1: What is Phishing? →
          </Link>
        </div>
      </div>
    </div>
  )
}
