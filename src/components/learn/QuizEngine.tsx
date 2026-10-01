'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import type { Topic, QuizQuestion } from '@/lib/curriculum/data'
import { saveQuizAttempt } from '@/lib/supabase/progress'

interface QuizEngineProps {
  topic: Topic
}

type Phase = 'intro' | 'quiz' | 'results'

const typeLabels: Record<QuizQuestion['type'], string> = {
  multiple_choice: 'Multiple Choice',
  true_false: 'True / False',
  scenario: 'Scenario',
  identify_redflag: 'Identify the Red Flag',
}

export function QuizEngine({ topic }: QuizEngineProps) {
  const { quiz } = topic
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; correct: boolean }[]>([])

  const currentQ = quiz[currentIndex]
  const score = answers.filter((a) => a.correct).length
  const percentage = quiz.length > 0 ? Math.round((score / quiz.length) * 100) : 0

  const handleSelect = useCallback((index: number) => {
    if (!submitted) setSelectedIndex(index)
  }, [submitted])

  const handleSubmit = useCallback(() => {
    if (selectedIndex === null) return
    const isCorrect = selectedIndex === currentQ.correctIndex
    setAnswers((prev) => [...prev, {
      questionId: currentQ.id,
      selectedIndex,
      correct: isCorrect,
    }])
    setSubmitted(true)
  }, [selectedIndex, currentQ])

  const handleNext = useCallback(async () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedIndex(null)
      setSubmitted(false)
    } else {
      setPhase('results')
      
      // Save attempt to DB
      const finalScore = answers.filter((a) => a.correct).length
      
      // Need to include current answer if last question
      let finalAnswers = [...answers]
      if (selectedIndex !== null && !answers.some(a => a.questionId === currentQ.id)) {
        const isCorrect = selectedIndex === currentQ.correctIndex
        finalAnswers.push({ questionId: currentQ.id, selectedIndex, correct: isCorrect })
      }

      const answersToSave = finalAnswers.map(a => ({
        questionId: a.questionId,
        selectedAnswer: quiz.find(q => q.id === a.questionId)?.options[a.selectedIndex] ?? '',
        correct: a.correct
      }))
      
      await saveQuizAttempt(topic.id, finalScore, quiz.length, answersToSave)
    }
  }, [currentIndex, quiz, answers, selectedIndex, currentQ, topic.id])

  const handleRestart = useCallback(() => {
    setPhase('quiz')
    setCurrentIndex(0)
    setSelectedIndex(null)
    setSubmitted(false)
    setAnswers([])
  }, [])

  // Intro screen
  if (phase === 'intro') {
    return (
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)', textAlign: 'center' }} className="animate-fade-in">
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🎯</div>
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-3)', letterSpacing: '-0.03em' }}>
          {topic.title} Quiz
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
          {quiz.length} questions testing your understanding of {topic.title.toLowerCase()}. 
          Every question includes a detailed explanation — whether you get it right or wrong.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          {[
            { label: 'Questions', value: quiz.length },
            { label: 'Pass Score', value: '70%' },
            { label: 'Attempts', value: '∞' },
          ].map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--color-accent)' }}>{stat.value}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <button
            onClick={() => setPhase('quiz')}
            className="btn btn-primary btn-full btn-lg"
            id="start-quiz-btn"
          >
            Start Quiz →
          </button>
          <Link href={`/learn/${topic.slug}/flashcards`} className="btn btn-secondary btn-full">
            Review Flashcards First
          </Link>
          <Link href={`/learn/${topic.slug}`} className="btn btn-ghost btn-full">
            ← Back to Lesson
          </Link>
        </div>
      </div>
    )
  }

  // Results screen
  if (phase === 'results') {
    const passed = percentage >= 70
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }} className="animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>
            {percentage >= 90 ? '🏆' : percentage >= 70 ? '🎉' : '📚'}
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-3)', letterSpacing: '-0.03em' }}>
            Quiz Complete
          </h2>

          {/* Score circle */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: `4px solid ${passed ? 'var(--color-success)' : 'var(--color-warning)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 'var(--space-6) auto',
            background: passed ? 'var(--color-success-dim)' : 'var(--color-warning-dim)',
          }}>
            <span style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: passed ? 'var(--color-success)' : 'var(--color-warning)' }}>
              {percentage}%
            </span>
          </div>

          <p style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            {score} / {quiz.length} correct
          </p>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: passed ? 'var(--color-success)' : 'var(--color-warning)',
            fontWeight: 600,
          }}>
            {passed ? '✓ Topic Completed' : '↺ Keep Practicing — you need 70% to pass'}
          </p>
        </div>

        {/* Answer review */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            Answer Review
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {quiz.map((q, i) => {
              const answer = answers.find((a) => a.questionId === q.id)
              const correct = answer?.correct ?? false
              return (
                <div key={q.id} className="card" style={{ borderLeft: `3px solid ${correct ? 'var(--color-success)' : 'var(--color-error)'}` }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{correct ? '✅' : '❌'}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                        Q{i + 1}. {q.question}
                      </p>
                      {!correct && answer !== undefined && (
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', marginBottom: 'var(--space-2)' }}>
                          Your answer: {q.options[answer.selectedIndex]}
                        </p>
                      )}
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', marginBottom: 'var(--space-2)' }}>
                        Correct: {q.options[q.correctIndex]}
                      </p>
                      <div className="callout callout-info" style={{ padding: 'var(--space-3)', fontSize: 'var(--text-xs)', lineHeight: 1.6 }}>
                        <span>💡</span>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{q.explanation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {passed ? (
            <Link href="/roadmap" className="btn btn-primary btn-full btn-lg" id="quiz-complete-roadmap-btn">
              Continue Learning →
            </Link>
          ) : (
            <button onClick={handleRestart} className="btn btn-primary btn-full btn-lg" id="retry-quiz-btn">
              ↺ Retry Quiz
            </button>
          )}
          <Link href={`/learn/${topic.slug}/flashcards`} className="btn btn-secondary btn-full">
            Review Flashcards Again
          </Link>
          <Link href={`/learn/${topic.slug}`} className="btn btn-ghost btn-full">
            ← Back to Lesson
          </Link>
        </div>
      </div>
    )
  }

  // Quiz screen
  const progressPct = Math.round((currentIndex / quiz.length) * 100)
  const isCorrect = submitted && selectedIndex === currentQ.correctIndex

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--space-6)' }} className="animate-fade-in">
      {/* Progress */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            Question {currentIndex + 1} of {quiz.length}
          </span>
          <span className={`badge ${typeLabels[currentQ.type] ? '' : ''}`} style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}>
            {typeLabels[currentQ.type]}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Scenario */}
      {currentQ.scenario && (
        <div
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4) var(--space-5)',
            marginBottom: 'var(--space-5)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
            borderLeft: '3px solid var(--color-warning)',
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--color-warning)', marginBottom: 'var(--space-2)', fontStyle: 'normal', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📋 Scenario
          </div>
          {currentQ.scenario}
        </div>
      )}

      {/* Question */}
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-5)', lineHeight: 1.4 }}>
        {currentQ.question}
      </h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        {currentQ.options.map((option, i) => {
          const letters = ['A', 'B', 'C', 'D', 'E']
          let optionClass = 'quiz-option'
          if (submitted) {
            if (i === currentQ.correctIndex) optionClass += ' correct'
            else if (i === selectedIndex) optionClass += ' incorrect'
          } else if (i === selectedIndex) {
            optionClass += ' selected'
          }

          return (
            <button
              key={i}
              id={`option-${i}-btn`}
              className={optionClass}
              onClick={() => handleSelect(i)}
              disabled={submitted}
              aria-pressed={selectedIndex === i}
            >
              <span className="option-letter">{letters[i]}</span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`callout ${isCorrect ? 'callout-success' : 'callout-error'}`}
          style={{ marginBottom: 'var(--space-5)', lineHeight: 1.6 }}
        >
          <div style={{ flexShrink: 0 }}>{isCorrect ? '✅' : '❌'}</div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>
              {isCorrect ? 'Correct!' : 'Not quite.'}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              {currentQ.explanation}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'space-between' }}>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="btn btn-primary btn-full btn-lg"
            id="submit-answer-btn"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn btn-primary btn-full btn-lg"
            id="next-question-btn"
          >
            {currentIndex < quiz.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  )
}
