'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/scenarios', label: 'Scenarios' },
  { href: '/survey', label: 'Survey' },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container">
        <Link href="/" className="nav-brand" aria-label="PhishGuard home">
          <div className="nav-brand-icon" aria-hidden="true">🛡️</div>
          <span>PhishGuard</span>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Nav actions */}
        <div className="nav-actions">
          {!loading && (
            <>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Link href="/dashboard" className="btn btn-ghost btn-sm">
                    Dashboard
                  </Link>
                  <button onClick={signOut} className="btn btn-secondary btn-sm">
                    Sign Out
                  </button>
                </div>
              ) : pathname !== '/auth/login' ? (
                <Link href="/auth/login" className="btn btn-primary btn-sm">
                  Sign In
                </Link>
              ) : null}
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost btn-sm"
            style={{ display: 'none' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            id="mobile-menu-btn"
          >
            ☰
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
