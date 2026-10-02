'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { useState, useEffect } from 'react'

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container">
          <Link href="/" className="nav-brand" aria-label="PhishGuard home" onClick={() => setMobileOpen(false)}>
            <div className="nav-brand-icon" aria-hidden="true">🛡️</div>
            <span>PhishGuard</span>
          </Link>

          {/* Desktop nav */}
          <ul className="nav-links" role="list">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions">
            <div className="desktop-actions">
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
            </div>

            {/* Mobile menu toggle */}
            <button
              className="btn btn-ghost btn-sm mobile-menu-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              id="mobile-menu-btn"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="mobile-nav-drawer" role="menu">
            <ul className="mobile-nav-list">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mobile-nav-actions">
              {!loading && (
                <>
                  {user ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Link
                        href="/dashboard"
                        className="btn btn-ghost btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setMobileOpen(false)
                          signOut()
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : pathname !== '/auth/login' ? (
                    <Link
                      href="/auth/login"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign In
                    </Link>
                  ) : null}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        .desktop-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .mobile-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .mobile-nav-drawer {
          display: none;
        }

        .mobile-backdrop {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }

          .desktop-actions {
            display: none !important;
          }

          .mobile-menu-toggle {
            display: inline-flex !important;
          }

          .mobile-backdrop {
            display: block;
            position: fixed;
            top: var(--nav-height);
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
            z-index: 98;
          }

          .mobile-nav-drawer {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: var(--nav-height);
            left: 0;
            right: 0;
            background: var(--color-bg-primary);
            border-bottom: 1px solid var(--color-border);
            padding: 16px 20px;
            gap: 16px;
            z-index: 99;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            animation: slideDown 0.2s ease-out;
          }

          .mobile-nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .mobile-nav-link {
            display: block;
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 500;
            color: var(--color-text-secondary);
            text-decoration: none;
            transition: all 0.15s ease;
          }

          .mobile-nav-link:hover,
          .mobile-nav-link.active {
            color: var(--color-text-primary);
            background: var(--color-bg-card);
          }

          .mobile-nav-actions {
            border-top: 1px solid var(--color-border);
            padding-top: 14px;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </>
  )
}
