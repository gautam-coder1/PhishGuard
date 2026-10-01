'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { curriculum, getAllTopics, getTopicById } from '@/lib/curriculum/data'
import { getDashboardStats } from '@/lib/supabase/progress'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [stats, setStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login')
    } else if (user) {
      getDashboardStats().then(data => {
        setStats(data)
        setStatsLoading(false)
      })
    }
  }, [user, loading, router])

  if (loading || !user || statsLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Loading...</div>
        </div>
      </div>
    )
  }

  const allTopics = getAllTopics()
  const displayName = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Learner'
  const avatarUrl = user.user_metadata?.avatar_url
  
  const continueTopic = stats?.lastActiveTopicId ? getTopicById(stats.lastActiveTopicId) : null
  const continueHref = continueTopic ? `/learn/${continueTopic.slug}` : '/learn/what-is-phishing'
  const continueLabel = continueTopic ? `📖 Continue: ${continueTopic.title}` : '📖 Start Lesson 1'

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(99, 140, 255, 0.08) 0%, transparent 60%)',
          borderBottom: '1px solid var(--color-border)',
          padding: 'var(--space-10) 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            {avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={`${displayName}'s avatar`}
                style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--color-border-active)' }}
              />
            )}
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>
                Welcome back,
              </p>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                {displayName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-8)', alignItems: 'start' }}>

          {/* Main content */}
          <div>
            {/* Start Learning CTA */}
            <div
              style={{
                background: 'var(--color-accent-dim)',
                border: '1px solid var(--color-border-active)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>🚀</div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Start Learning
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)', lineHeight: 1.6 }}>
                Begin with &quot;What is Phishing?&quot; and work through the curriculum.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Link href={continueHref} className="btn btn-primary" id="dashboard-start-lesson-btn">
                  {continueLabel}
                </Link>
                <Link href="/roadmap" className="btn btn-secondary">
                  View Roadmap
                </Link>
              </div>
            </div>

            {/* Statistics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
              <div className="card">
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stats.completedCount}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Topics Completed</div>
              </div>
              <div className="card">
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stats.knownFlashcardsCount}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Flashcards Mastered</div>
              </div>
              <div className="card">
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stats.avgQuizScore}%</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Avg Quiz Score ({stats.quizzesCompletedCount} taken)</div>
              </div>
            </div>

            {/* Curriculum overview */}
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-5)' }}>
                Curriculum Overview
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {curriculum.map((level) => (
                  <div key={level.id} className="card" style={{ padding: 'var(--space-4) var(--space-5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                      <div
                        className={`level-bg-${level.id}`}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          flexShrink: 0,
                          border: '1px solid',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        <span className={`level-color-${level.id}`}>{level.id}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>{level.name}</h3>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            {level.topics.length} topic{level.topics.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                          {level.topics.map((topic) => (
                            <Link
                              key={topic.id}
                              href={`/learn/${topic.slug}`}
                              style={{
                                fontSize: 'var(--text-xs)',
                                color: 'var(--color-accent)',
                                textDecoration: 'none',
                              }}
                            >
                              {topic.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-6))' }}>
            {/* Account */}
            <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                Account
              </h3>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                {user.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>
                <div className="status-dot status-dot-success" />
                Signed in with Google
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {[
                  { href: '/roadmap', label: '🗺️ Learning Roadmap' },
                  { href: '/scenarios', label: '🎭 Practice Scenarios' },
                  { href: '/survey', label: '📊 Survey Findings' },
                ].map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'flex-start', padding: 'var(--space-2) var(--space-3)', fontSize: 'var(--text-sm)' }}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress note */}
            <div className="callout callout-info" style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-xs)' }}>
              <span>ℹ️</span>
              <span>Full progress tracking (scores, flashcard states, streaks) will be available when Supabase is configured with your project credentials.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
