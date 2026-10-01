import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-8)',
    }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🛡️</div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 'var(--space-3)' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-8)' }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/roadmap" className="btn btn-secondary">Learning Roadmap</Link>
        </div>
      </div>
    </div>
  )
}
