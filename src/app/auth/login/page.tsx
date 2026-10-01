'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

function LoginContent() {
  const { user, signInWithGoogle, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(99, 140, 255, 0.08) 0%, transparent 70%)',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }} className="animate-fade-in">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'var(--color-accent-dim)',
            border: '1px solid var(--color-border-active)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto var(--space-4)',
          }}>
            🛡️
          </div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Welcome to PhishGuard
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            Your interactive phishing awareness learning platform
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: 'var(--space-8)' }}>
          {error && (
            <div className="callout callout-error" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)' }}>
              <span>⚠️</span>
              <span>Authentication failed. Please try again.</span>
            </div>
          )}

          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Sign in to continue
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
            Create a free account to track your learning progress, save flashcard states, and record quiz results across sessions.
          </p>

          <button
            id="google-signin-btn"
            onClick={signInWithGoogle}
            disabled={loading}
            className="btn btn-secondary btn-full btn-lg"
            style={{ gap: 'var(--space-3)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M17.64 9.2045c0-.638-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1818l-2.9087-2.2582c-.8059.5405-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5832-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71c-.18-.5405-.2823-1.1182-.2823-1.71s.1023-1.1695.2823-1.71V4.9582H.9574C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9574 4.0418L3.964 10.71z" fill="#FBBC05"/>
              <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9574 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider" style={{ margin: 'var(--space-5) 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              'Track your learning progress across all 8 levels',
              'Save flashcard states (Known / Review)',
              'Record quiz attempts and review mistakes',
              'Pick up exactly where you left off',
            ].map((feature) => (
              <div key={feature} style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '1px' }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-5)', lineHeight: 1.6 }}>
          By signing in, you agree to use this platform for educational purposes only. 
          We never store personal credentials or sensitive information.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div />}>
      <LoginContent />
    </Suspense>
  )
}
