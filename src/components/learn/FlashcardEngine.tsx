'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import type { Topic } from '@/lib/curriculum/data'
import { getFlashcardProgress, updateFlashcardStatus, updateLearningProgress } from '@/lib/supabase/progress'

interface FlashcardEngineProps {
  topic: Topic
}

type CardStatus = 'new' | 'known' | 'review'

export function FlashcardEngine({ topic }: FlashcardEngineProps) {
  const { flashcards } = topic
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardStatuses, setCardStatuses] = useState<Record<string, CardStatus>>(
    Object.fromEntries(flashcards.map((fc) => [fc.id, 'new']))
  )
  const [sessionComplete, setSessionComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load progress on mount
  useEffect(() => {
    getFlashcardProgress(topic.id).then(progress => {
      if (progress && progress.length > 0) {
        setCardStatuses(prev => {
          const next = { ...prev }
          progress.forEach((p: any) => {
            if (p.flashcard_id in next) {
              next[p.flashcard_id] = p.status as CardStatus
            }
          })
          return next
        })
      }
      setLoading(false)
    })
  }, [topic.id])

  const currentCard = flashcards[currentIndex]
  const knownCount = Object.values(cardStatuses).filter((s) => s === 'known').length
  const reviewCount = Object.values(cardStatuses).filter((s) => s === 'review').length
  const progress = Math.round((currentIndex / flashcards.length) * 100)

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const goTo = useCallback((index: number) => {
    setIsFlipped(false)
    setTimeout(() => setCurrentIndex(index), 150)
  }, [])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1)
  }, [currentIndex, goTo])

  const handleNext = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      goTo(currentIndex + 1)
    } else {
      setSessionComplete(true)
      updateLearningProgress(topic.id, 'flashcards_done')
    }
  }, [currentIndex, flashcards.length, goTo, topic.id])

  const markCard = useCallback((status: CardStatus) => {
    setCardStatuses((prev) => ({ ...prev, [currentCard.id]: status }))
    updateFlashcardStatus(topic.id, currentCard.id, status)
    setTimeout(handleNext, 200)
  }, [currentCard.id, handleNext, topic.id])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleFlip() }
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }, [handleFlip, handlePrevious, handleNext])

  if (sessionComplete) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-6)', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-6)' }}>🎉</div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
          Flashcards Complete!
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--color-success)' }}>{knownCount}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>Known</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--color-warning)' }}>{reviewCount}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>To Review</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Link
            href={`/learn/${topic.slug}/quiz`}
            className="btn btn-primary btn-full btn-lg"
            id="flashcards-to-quiz-btn"
          >
            🎯 Take the Quiz →
          </Link>
          <button
            onClick={() => { setCurrentIndex(0); setIsFlipped(false); setSessionComplete(false) }}
            className="btn btn-secondary btn-full"
            id="restart-flashcards-btn"
          >
            ↺ Restart Flashcards
          </button>
          {reviewCount > 0 && (
            <button
              onClick={() => {
                setCurrentIndex(flashcards.findIndex((fc) => cardStatuses[fc.id] === 'review'))
                setIsFlipped(false)
                setSessionComplete(false)
              }}
              className="btn btn-secondary btn-full"
              style={{ color: 'var(--color-warning)', borderColor: 'rgba(251,191,36,0.3)' }}
            >
              📋 Review {reviewCount} Marked Card{reviewCount !== 1 ? 's' : ''}
            </button>
          )}
          <Link href={`/learn/${topic.slug}`} className="btn btn-ghost btn-full">
            ← Back to Lesson
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Loading flashcards...</div>
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <span style={{ color: 'var(--color-success)' }}>✓ {knownCount} known</span>
            <span style={{ color: 'var(--color-warning)' }}>↺ {reviewCount} review</span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card statuses row */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        {flashcards.map((fc, i) => (
          <button
            key={fc.id}
            onClick={() => goTo(i)}
            title={`Card ${i + 1}`}
            aria-label={`Go to card ${i + 1}`}
            style={{
              width: '24px',
              height: '6px',
              borderRadius: 'var(--radius-full)',
              background: i === currentIndex
                ? 'var(--color-accent)'
                : cardStatuses[fc.id] === 'known'
                ? 'var(--color-success)'
                : cardStatuses[fc.id] === 'review'
                ? 'var(--color-warning)'
                : 'rgba(255,255,255,0.1)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Flashcard */}
      <div
        className="flashcard-scene"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={isFlipped ? 'Card answer — press Space to flip back' : 'Card question — press Space to reveal answer'}
        style={{ outline: 'none' }}
      >
        <div
          className={`flashcard-card ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          style={{ minHeight: '280px' }}
        >
          {/* Front */}
          <div className="flashcard-face flashcard-front">
            <div style={{
              position: 'absolute',
              top: 'var(--space-4)',
              left: 'var(--space-4)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Question
            </div>
            <p style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1.4,
              textAlign: 'center',
            }}>
              {currentCard.front}
            </p>
            <div style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
            }}>
              <span>Click to reveal</span>
            </div>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back">
            <div style={{
              position: 'absolute',
              top: 'var(--space-4)',
              left: 'var(--space-4)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Answer
            </div>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              textAlign: 'center',
              whiteSpace: 'pre-line',
            }}>
              {currentCard.back}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {isFlipped && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <button
              onClick={() => markCard('review')}
              className="btn btn-secondary"
              id="mark-review-btn"
              style={{ color: 'var(--color-warning)', borderColor: 'rgba(251,191,36,0.3)', gap: 'var(--space-2)' }}
            >
              ↺ Review Again
            </button>
            <button
              onClick={() => markCard('known')}
              className="btn btn-success"
              id="mark-known-btn"
              style={{ gap: 'var(--space-2)' }}
            >
              ✓ Got It
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn btn-ghost"
            id="prev-card-btn"
            aria-label="Previous card"
          >
            ← Previous
          </button>
          <button
            onClick={handleFlip}
            className="btn btn-secondary"
            id="flip-card-btn"
            aria-label="Flip card"
          >
            Flip Card
          </button>
          <button
            onClick={handleNext}
            className="btn btn-ghost"
            id="next-card-btn"
            aria-label="Next card"
          >
            {currentIndex < flashcards.length - 1 ? 'Next →' : 'Finish ✓'}
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Tip: Press <kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}>Space</kbd> to flip, 
            {' '}<kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}>←</kbd>{' '}
            <kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}>→</kbd> to navigate
          </p>
        </div>
      </div>
    </div>
  )
}
