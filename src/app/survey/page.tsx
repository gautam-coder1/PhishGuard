import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Survey Findings',
  description: 'Aggregated results from a phishing awareness survey of 25 students.',
}

// Embedded survey data (mirrors data/survey_results.json)
const surveyData = {
  total_respondents: 25,
  heard_of_phishing: { Yes: 17, No: 7, "I'm not sure": 1 },
  received_suspicious: { "Yes, a few times": 14, "I'm not sure": 3, No: 2, "Yes, many times": 6 },
  reaction_urgent: {
    "Verify through the bank's official app or website": 20,
    "I'm not sure": 3,
    "Reply to the sender": 1,
    "Click the link immediately": 1,
  },
  warning_signs: {
    "Urgent or threatening language": 14,
    "Suspicious/unfamiliar link": 14,
    "Request for OTP or password": 13,
    "Unexpected prize or offer": 15,
    "Unknown sender": 15,
    "Unexpected attachment": 11,
    "None of these": 3,
  },
  security_practice: {
    "Using strong, unique passwords and multi-factor authentication": 23,
    "Using the same password everywhere": 1,
    "Sharing passwords with friends": 1,
  },
  action_on_suspicious: {
    "Delete or report it and verify through an official source": 20,
    "Click the link to check it": 1,
    "I'm not sure": 2,
    "Reply to the sender": 1,
    "Forward it to friends": 1,
  },
  confidence: {
    "Somewhat confident": 7,
    "Very confident": 13,
    "Not sure": 4,
    "Not confident at all": 1,
  },
  percentages: {
    heard_of_phishing_yes: 68.0,
    received_suspicious_yes: 80.0,
    verify_official_reaction: 80.0,
    strong_password_practice: 92.0,
  },
}

function BarChart({ data, label }: { data: Record<string, number>; label: string }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0)
  const maxCount = Math.max(...Object.values(data))
  return (
    <div>
      <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
        {label}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {Object.entries(data)
          .sort((a, b) => b[1] - a[1])
          .map(([key, count]) => {
            const pct = Math.round((count / total) * 100)
            const barWidth = Math.round((count / maxCount) * 100)
            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--color-text-secondary)', maxWidth: '70%' }}>{key}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const insights = [
  {
    finding: '32% have NOT heard of phishing by name',
    implication: 'Basic awareness training is still needed. "What is Phishing" is the right starting lesson.',
    topic: 'what-is-phishing',
    topicTitle: 'What is Phishing?',
  },
  {
    finding: '80% have received suspicious messages but not all recognized them as phishing',
    implication: 'Exposure is high, but recognition gaps remain. Smishing and email phishing lessons are critical.',
    topic: 'smishing',
    topicTitle: 'Smishing (SMS Phishing)',
  },
  {
    finding: 'Only ~44% identified "Unexpected attachment" as a warning sign',
    implication: 'Attachment-based phishing is underrecognized. Anatomy of an Attack and URL inspection lessons are needed.',
    topic: 'email-phishing',
    topicTitle: 'Email Phishing',
  },
  {
    finding: '8% would not verify through official channels when receiving an urgent message',
    implication: 'Verification habits are mostly present, but the 8% who wouldn\'t verify correctly are high-risk.',
    topic: 'message-red-flags',
    topicTitle: 'Message Red Flags',
  },
  {
    finding: '52% are only "somewhat confident" or less in identifying phishing',
    implication: 'Most respondents recognize their own knowledge gaps — ideal baseline for the quiz and flashcard system.',
    topic: 'psychology-of-phishing',
    topicTitle: 'Psychology of Phishing',
  },
]

export default function SurveyPage() {
  const { percentages, total_respondents } = surveyData

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      {/* Header */}
      <div
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(96, 165, 250, 0.08) 0%, transparent 60%)',
          borderBottom: '1px solid var(--color-border)',
          padding: 'var(--space-12) 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div className="section-label" style={{ color: 'var(--color-info)' }}>Research</div>
          <h1 className="section-title" style={{ marginTop: 'var(--space-2)' }}>Survey Findings</h1>
          <p className="section-desc" style={{ maxWidth: '540px', margin: 'var(--space-3) auto 0' }}>
            Results from a phishing awareness survey of college students. 
            Data is anonymized and aggregated — no personal information is stored or displayed.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-10)' }}>
        <div style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto' }}>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
            {[
              { value: `${percentages.heard_of_phishing_yes}%`, label: 'Know what phishing is', sub: 'By name' },
              { value: `${percentages.received_suspicious_yes}%`, label: 'Received suspicious messages', sub: 'Email, SMS, or WhatsApp' },
              { value: `${percentages.verify_official_reaction}%`, label: 'Would verify through official channel', sub: 'Correct response to urgent message' },
              { value: `${percentages.strong_password_practice}%`, label: 'Use strong passwords + MFA', sub: 'Best practice' },
            ].map((kpi) => (
              <div key={kpi.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--color-accent)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 'var(--space-2)' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>{kpi.label}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
            <div className="card">
              <BarChart data={surveyData.warning_signs} label="Which warning signs did respondents recognize?" />
            </div>
            <div className="card">
              <BarChart data={surveyData.action_on_suspicious} label="What would you do with a suspicious message?" />
            </div>
            <div className="card">
              <BarChart data={surveyData.reaction_urgent} label="Response to an urgent 'account suspended' message" />
            </div>
            <div className="card">
              <BarChart data={surveyData.confidence} label="Confidence in identifying phishing attempts" />
            </div>
          </div>

          {/* Key Insights */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <div className="section-label">Analysis</div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--space-2)' }}>
              Survey-Driven Learning Gaps
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
              These findings directly shape which topics are prioritized in the PhishGuard curriculum.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {insights.map((insight, i) => (
                <div key={i} className="card" style={{ borderLeft: '3px solid var(--color-info)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                        <span style={{ fontSize: '1rem' }}>📊</span>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>{insight.finding}</p>
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, paddingLeft: 'calc(1rem + var(--space-3))' }}>
                        {insight.implication}
                      </p>
                    </div>
                    <Link
                      href={`/learn/${insight.topic}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                    >
                      Study: {insight.topicTitle} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="card" style={{ background: 'var(--color-bg-elevated)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Survey Methodology
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              {[
                { label: 'Collection Method', value: 'Google Forms' },
                { label: 'Target Audience', value: 'Students (18-25 age group)' },
                { label: 'Data Privacy', value: 'All responses anonymized' },
                { label: 'Purpose', value: 'Academic field-visit project' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.label}
                  </div>
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
