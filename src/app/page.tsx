import Link from 'next/link'
import { curriculum, totalTopicsCount } from '@/lib/curriculum/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PhishGuard — Interactive Phishing Awareness Learning Platform',
  description:
    'Learn to identify phishing attacks through structured lessons, flashcards, quizzes, and real-world simulations. 8 levels, 15+ topics, fully interactive.',
}

const stats = [
  { value: '8', label: 'Learning Levels' },
  { value: `${totalTopicsCount}`, label: 'Deep Lessons' },
  { value: '100+', label: 'Flashcards' },
  { value: '80+', label: 'Quiz Questions' },
]

const features = [
  {
    icon: '📖',
    title: 'Structured Curriculum',
    desc: '8 progressive levels from Foundations to Incident Response. Each lesson explains the "why" — not just the "what."',
  },
  {
    icon: '🃏',
    title: 'Active Recall Flashcards',
    desc: 'Topic-specific flashcards with flip animations. Mark cards as Known or Review to focus on what needs work.',
  },
  {
    icon: '🎯',
    title: 'Scenario-Based Quizzes',
    desc: 'Multiple choice, true/false, and identify-the-red-flag questions. Every answer includes a detailed explanation.',
  },
  {
    icon: '🎭',
    title: 'Interactive Simulations',
    desc: 'Realistic phishing scenarios — decide what to do, see the consequences, and learn the correct response.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'Your learning progress, quiz scores, and flashcard states are saved across sessions with Google Sign-In.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-20)', position: 'relative' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                background: 'var(--color-accent-dim)',
                border: '1px solid var(--color-border-active)',
                borderRadius: 'var(--radius-full)',
                padding: '4px var(--space-4)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-6)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <span>🛡️</span> Phishing Awareness Learning Platform
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                marginBottom: 'var(--space-6)',
              }}
            >
              Learn to{' '}
              <span className="text-gradient">defeat phishing</span>
              {' '}before it defeats you
            </h1>

            <p
              style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-10)',
                maxWidth: '600px',
                margin: '0 auto var(--space-10)',
              }}
            >
              A structured, deep learning journey through phishing attacks — from beginner concepts to advanced detection. 
              Interactive lessons, flashcards, and quizzes that teach the <em>why</em> behind every attack.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/roadmap" className="btn btn-primary btn-lg" id="hero-start-cta">
                Start Learning →
              </Link>
              <Link href="/auth/login" className="btn btn-secondary btn-lg">
                Sign In with Google
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ padding: 'var(--space-10) var(--space-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-8)', textAlign: 'center' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Preview */}
      <section style={{ padding: 'var(--space-20) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div className="section-label">Curriculum</div>
            <h2 className="section-title">8 Levels of Progressive Learning</h2>
            <p className="section-desc" style={{ maxWidth: '540px', margin: 'var(--space-3) auto 0' }}>
              Each level builds on the previous. Complete lessons, review flashcards, pass quizzes, and unlock the next level.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {curriculum.map((level) => (
              <Link
                key={level.id}
                href={`/roadmap#level-${level.id}`}
                className="card"
                id={`level-card-${level.id}`}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  borderColor: `rgba(var(--level-${level.id}-rgb, 99, 140, 255), 0.15)`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                  <div
                    className={`level-bg-${level.id}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 900,
                      flexShrink: 0,
                      border: '1px solid',
                    }}
                  >
                    <span className={`level-color-${level.id}`}>{level.id}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
                      {level.name}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                      {level.description}
                    </p>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {level.topics.length} topic{level.topics.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/roadmap" className="btn btn-secondary btn-lg">
              View Full Roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: 'var(--space-20) 0', background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div className="section-label">Platform Features</div>
            <h2 className="section-title">Not your average cybersecurity site</h2>
            <p className="section-desc" style={{ maxWidth: '500px', margin: 'var(--space-3) auto 0' }}>
              Every feature is designed around active learning — not passive reading.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
            {features.map((f) => (
              <div key={f.title} className="card">
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>{f.icon}</div>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: 'var(--space-20) 0',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-4)' }}>
            Ready to become{' '}
            <span className="text-gradient">phishing-aware?</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', maxWidth: '480px', margin: '0 auto var(--space-8)' }}>
            Start with the fundamentals and work your way through all 8 levels at your own pace.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/roadmap" className="btn btn-primary btn-lg" id="cta-roadmap-btn">
              Open Learning Roadmap →
            </Link>
            <Link href="/learn/what-is-phishing" className="btn btn-secondary btn-lg" id="cta-first-lesson-btn">
              Jump to Lesson 1
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: 'var(--space-8) 0',
          background: 'var(--color-bg-secondary)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 700 }}>
              <span>🛡️</span> PhishGuard
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Academic phishing-awareness project. All phishing examples are fictional educational simulations.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-5)', fontSize: 'var(--text-xs)' }}>
              <Link href="/survey" style={{ color: 'var(--color-text-muted)' }}>Survey</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
