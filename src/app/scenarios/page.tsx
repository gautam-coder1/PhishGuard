'use client'

import { useState } from 'react'

interface Choice {
  label: string
  outcome: string
  isCorrect: boolean
  consequence: string
  lesson: string
}

interface ScenarioStep {
  id: string
  title: string
  situation: string
  messageContent?: React.ReactNode
  question: string
  choices: Choice[]
}

interface Scenario {
  id: string
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  intro: string
  steps: ScenarioStep[]
}

const scenarios: Scenario[] = [
  {
    id: 'bank-alert',
    title: 'Bank Security Alert',
    category: 'Email Phishing',
    difficulty: 'Beginner',
    intro: 'You\'re a college student managing your first bank account. It\'s 9 AM and you just received an urgent email.',
    steps: [
      {
        id: 'bank-1',
        title: 'The Email Arrives',
        situation: 'You receive this email on your phone:',
        question: 'What is your FIRST instinct?',
        choices: [
          {
            label: 'Click "Verify Account" — it looks urgent',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You click the link. It takes you to a page that looks exactly like your bank. You enter your credentials. Your bank account details are now in the hands of an attacker.',
            lesson: 'Urgency is a manipulation tool. Legitimate banks give you reasonable time and never threaten instant suspension via email.',
          },
          {
            label: 'Check the sender email address carefully',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'Smart move. You look at the full sender address: "security@sbi-secure-alert.com". SBI\'s real domain is sbi.co.in. This is a look-alike domain — this is a phishing email.',
            lesson: 'The sender domain is the most reliable indicator of email authenticity. The display name ("SBI Bank") is trivially easy to fake.',
          },
          {
            label: 'Reply to the email asking if it\'s legitimate',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You reply to the attacker\'s email. They confirm "Yes, it\'s urgent. Please click the link immediately." You\'ve handed the attacker another opportunity to manipulate you.',
            lesson: 'Never reply to suspicious emails. Replying confirms your email is active and gives attackers another manipulation opportunity.',
          },
          {
            label: 'Forward to all friends to warn them',
            outcome: 'neutral',
            isCorrect: false,
            consequence: 'You forward the phishing email. The link is now in circulation. Someone else might click it. Well-intentioned but potentially harmful.',
            lesson: 'Forward phishing emails to your bank\'s official phishing report address or to cybercrime.gov.in — not to friends, where the malicious link could cause harm.',
          },
        ],
      },
      {
        id: 'bank-2',
        title: 'You Identified It\'s Suspicious',
        situation: 'You\'ve confirmed the sender domain is fake. What do you do next?',
        question: 'How do you check if there\'s actually an issue with your account?',
        choices: [
          {
            label: 'Open the bank\'s official app on my phone',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'Perfect. You open your bank\'s official app (installed from the Play Store/App Store). Your account is completely fine — no suspension, no issue. The email was a phishing attempt.',
            lesson: 'Always verify account issues through the official app or by calling the number on the back of your card — NEVER through links in emails or SMS.',
          },
          {
            label: 'Search Google for "SBI account suspended" and click the first link',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'The first search result could be a sponsored phishing link. You end up on another fake site. Always type the official URL directly or use the official app.',
            lesson: 'Search results and sponsored links can include malicious sites. Always navigate to official domains directly by typing them or using bookmarks.',
          },
          {
            label: 'Call the number mentioned in the email',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'The number in the email connects to the attacker\'s call center. A convincing "bank representative" asks for your card number and OTP to "verify" your identity.',
            lesson: 'Phone numbers in suspicious messages may connect to attackers. Always call the number printed on the back of your card or from the official website.',
          },
        ],
      },
    ],
  },
  {
    id: 'olx-upi',
    title: 'Online Marketplace UPI Scam',
    category: 'UPI Fraud',
    difficulty: 'Beginner',
    intro: 'You\'re selling your old laptop for ₹18,000 on an online marketplace. A buyer contacts you.',
    steps: [
      {
        id: 'olx-1',
        title: 'The Buyer Calls',
        situation: '"Hi, I saw your laptop listing. I want to buy it. I\'ll send you the full amount right now via UPI. Can you please share your UPI ID? Let me send ₹1 first to verify it\'s working."',
        question: 'What do you do?',
        choices: [
          {
            label: 'Share my UPI ID — receiving money requires no PIN anyway',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'Correct! Sharing your UPI ID is safe — it\'s like sharing your bank account number. The buyer cannot debit your account with just your UPI ID.',
            lesson: 'Your UPI ID (e.g., name@upi) is safe to share with a buyer. It\'s equivalent to sharing your bank account number — harmless for receiving.',
          },
          {
            label: 'Refuse to share any information — this feels suspicious',
            outcome: 'neutral',
            isCorrect: false,
            consequence: 'You refuse. The legitimate buyer finds this odd and moves on. You lost a potential sale, but you\'re safe. In this specific case, sharing a UPI ID is fine.',
            lesson: 'UPI IDs are designed to be shared for receiving payments. Being cautious is good, but understanding what information is actually sensitive vs. shareable is important.',
          },
        ],
      },
      {
        id: 'olx-2',
        title: 'The UPI Notification',
        situation: 'The buyer says "I\'ve sent ₹1. You should get a notification. Please enter your PIN to confirm receipt — I need to verify the UPI ID is working before sending ₹18,000."',
        question: 'A notification appears on your UPI app. What do you do?',
        choices: [
          {
            label: 'Enter my UPI PIN — it\'s just ₹1 to verify',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You enter your PIN. ₹18,000 is immediately deducted from your account. The "₹1 verification" was actually a UPI collect request for ₹18,000. Your PIN authorized the payment TO the attacker.',
            lesson: 'You NEVER need to enter your UPI PIN to receive money. A UPI collect request is a payment request FROM you TO someone else. Entering your PIN on it sends money out — not in.',
          },
          {
            label: 'Not enter my PIN — I don\'t need a PIN to receive money',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'Correct! You tell the buyer "I don\'t need to enter a PIN to receive money." The caller becomes aggressive and insists. You hang up — this is a confirmed scam.',
            lesson: 'UPI PIN is ONLY for sending payments. To receive money, you simply share your UPI ID or QR code. Any request to enter your PIN to "receive" is fraud.',
          },
          {
            label: 'Check what the notification says before deciding',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'You read the notification carefully: "Collect Request from +91-XXXXX: ₹18,000." It\'s not a credit notification — it\'s a payment request. You reject it and report the number.',
            lesson: 'Always read UPI notifications carefully before acting. A collect request shows an amount to be debited from you, not credited to you.',
          },
        ],
      },
    ],
  },
  {
    id: 'job-scam',
    title: 'Fake Job Offer',
    category: 'Job Scam',
    difficulty: 'Intermediate',
    intro: 'You\'re a final-year student actively looking for a job. You receive a WhatsApp message from an unknown number.',
    steps: [
      {
        id: 'job-1',
        title: 'The Job Offer',
        situation: '"Congratulations! Based on your profile, you have been shortlisted for a WFH Data Entry position at ABC Global Solutions. Salary: ₹35,000/month. No experience required. To confirm your slot, pay a ₹500 registration fee to UPI ID: payment@abcglobal. Your joining kit will be sent within 24 hours." — with a professional-looking company logo.',
        question: 'This sounds like a good opportunity. What do you do?',
        choices: [
          {
            label: 'Pay the ₹500 — it\'s a small fee for a ₹35,000 job',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You pay ₹500. No joining kit arrives. You message them — they ask for a "documentation fee" of ₹1,500. After paying that too, they disappear. Legitimate companies never charge candidates.',
            lesson: 'Legitimate employers NEVER ask candidates to pay registration, processing, or documentation fees. Any job requiring upfront payment is a scam — regardless of how small the amount.',
          },
          {
            label: 'Research the company independently before doing anything',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'You Google "ABC Global Solutions." You find no official website with matching information, and Glassdoor/job forums have warnings about this being a scam. You report and block the number.',
            lesson: 'Always verify job offers independently through official company websites, LinkedIn, or Glassdoor. Contact the company through official channels listed on their website — not numbers from the message.',
          },
          {
            label: 'Ask them to send the offer letter first before paying',
            outcome: 'neutral',
            isCorrect: false,
            consequence: 'They send a convincing PDF "offer letter" with the company logo. Scammers prepare these in advance. You\'re still at risk — the fee request is the key red flag, not the paperwork.',
            lesson: 'Scammers prepare professional-looking documents. The definitive red flag is any request for upfront payment from the candidate. Legitimate companies never charge job seekers.',
          },
        ],
      },
    ],
  },
  {
    id: 'tech-support',
    title: 'Fake Tech Support Alert',
    category: 'Browser Scam',
    difficulty: 'Beginner',
    intro: 'You are browsing the web when suddenly a loud alarm sounds and a red popup locks your screen.',
    steps: [
      {
        id: 'tech-1',
        title: 'The Popup',
        situation: '"Windows Defender Security Warning: Your computer has been locked due to a Trojan virus. Do not close this window or restart your computer. Call Microsoft Support immediately at 1-800-XXX-XXXX to unlock it." The page cannot be closed normally.',
        question: 'How do you react to this alarming popup?',
        choices: [
          {
            label: 'Call the number immediately — my computer is infected!',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You call the number. "Tech support" asks to install remote access software (like AnyDesk or TeamViewer) to "fix" the issue. They then steal your files, passwords, or charge you hundreds of dollars for fake anti-virus.',
            lesson: 'Microsoft, Apple, and real tech companies never put phone numbers in error messages or ask you to call them from a web popup.',
          },
          {
            label: 'Force quit the browser or restart the computer',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'You press Alt+F4 (Windows) or Cmd+Q (Mac), or open Task Manager to force close the browser. When you reopen the browser, everything is fine. It was just a malicious website trying to scare you.',
            lesson: 'These popups are just web pages using full-screen mode and JavaScript loops to prevent closing. They cannot actually lock your computer. Force quitting is the safe solution.',
          },
          {
            label: 'Click the "X" on the popup window itself',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'The "X" is fake. Clicking anywhere on the popup triggers a download of actual malware or opens more popups. Never interact with the buttons on a malicious webpage.',
            lesson: 'Fake error messages often use fake UI elements. The "close" button might actually be a hidden download link. Use OS-level commands (like Task Manager) to close the program.',
          }
        ]
      }
    ]
  },
  {
    id: 'social-media-impersonation',
    title: 'Friend in Trouble',
    category: 'Social Media',
    difficulty: 'Intermediate',
    intro: 'You receive a direct message on Instagram from a good friend you haven\'t spoken to in a few weeks.',
    steps: [
      {
        id: 'social-1',
        title: 'The Urgent Message',
        situation: '"Hey! I am so sorry to bother you, but I lost my phone and wallet. I\'m stranded at a gas station and need ₹2000 for a cab home. I\'m using a stranger\'s phone. Can you quickly send it to this GPay number? I\'ll pay you back tomorrow I promise."',
        question: 'Your friend seems to be in trouble. What is your next move?',
        choices: [
          {
            label: 'Send the money immediately — they need help',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You send the money. Later, you find out your friend\'s account was hacked. The money went directly to a scammer, and your friend was never stranded.',
            lesson: 'Social media accounts are frequently compromised and used to scam the victim\'s friends. Always verify emergencies independently.',
          },
          {
            label: 'Call their phone number to check on them',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'You call their regular phone number. They pick up and are confused — they are sitting at home safe. Their Instagram account was hacked. You just saved yourself ₹2000.',
            lesson: 'When a friend asks for money via social media or messaging apps, always verify by calling their known phone number or talking to them through a completely different platform.',
          },
          {
            label: 'Ask them a personal question only they would know',
            outcome: 'neutral',
            isCorrect: false,
            consequence: 'The scammer might have read their previous chats and could guess the answer, or they might make an excuse like "I don\'t have time for this, I\'m stranded!" It\'s better to just call them.',
            lesson: 'While asking a security question can work, scammers often study chat history. A voice call is a much more definitive way to verify identity.',
          }
        ]
      }
    ]
  },
  {
    id: 'crypto-romance',
    title: 'The Perfect Match',
    category: 'Investment Scam',
    difficulty: 'Advanced',
    intro: 'You match with someone very attractive on a dating app. You chat for two weeks, and they seem perfect. They are wealthy, successful, and share your interests.',
    steps: [
      {
        id: 'crypto-1',
        title: 'The "Secret" Opportunity',
        situation: '"I really like you. Since we\'re getting close, I want to share how I\'ve been making so much money lately. My uncle works at a major financial firm and gives me insider trading signals for a new crypto platform. I made 40% profit this week. I can show you how to do it with just a small amount, like ₹5000."',
        question: 'What do you do?',
        choices: [
          {
            label: 'Try it with just ₹5000 — it\'s a small amount to risk',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You put in ₹5000 on the app they link. The app shows you made ₹8000! They encourage you to put in ₹50,000. It shows ₹90,000! When you try to withdraw the money, the app demands a 30% "tax fee". You realize the app is fake, the money is gone, and the person was a scammer (Pig Butchering scam).',
            lesson: 'This is a classic "Pig Butchering" scam. They build trust over weeks or months, then introduce a fake investment platform that shows fake profits to encourage larger deposits.',
          },
          {
            label: 'Decline the investment but continue the relationship',
            outcome: 'dangerous',
            isCorrect: false,
            consequence: 'You say no. They become emotionally manipulative: "Don\'t you trust me? I\'m just trying to help us build a future." Eventually, they wear you down or ghost you. The entire persona is fake.',
            lesson: 'The relationship itself is the scam. Once an online romantic interest brings up crypto, forex, or guaranteed investments, you are talking to a scammer. There is no real person to have a relationship with.',
          },
          {
            label: 'Block and report the profile immediately',
            outcome: 'safe',
            isCorrect: true,
            consequence: 'You recognize the red flag: romance mixed with investment advice. You block them. You feel a bit disappointed, but your finances are completely safe.',
            lesson: 'Romance + Investment = Scam. Legitimate romantic interests do not pressure you to invest in unregulated crypto platforms using their "insider secrets."',
          }
        ]
      }
    ]
  }
]

const categoryColors: Record<string, string> = {
  'Email Phishing': 'var(--color-info)',
  'UPI Fraud': 'var(--color-warning)',
  'Job Scam': 'var(--color-error)',
  'Social Media': 'var(--color-accent)',
}

export default function ScenariosPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [stepComplete, setStepComplete] = useState(false)
  const [allComplete, setAllComplete] = useState(false)

  const handleStart = (scenario: Scenario) => {
    setActiveScenario(scenario)
    setStepIndex(0)
    setSelectedChoice(null)
    setStepComplete(false)
    setAllComplete(false)
  }

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice)
    setStepComplete(true)
  }

  const handleNext = () => {
    if (!activeScenario) return
    const nextStep = stepIndex + 1
    if (nextStep < activeScenario.steps.length) {
      setStepIndex(nextStep)
      setSelectedChoice(null)
      setStepComplete(false)
    } else {
      setAllComplete(true)
    }
  }

  if (activeScenario) {
    if (allComplete) {
      return (
        <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
          <ScenarioHeader />
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>✅</div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>Scenario Complete!</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
              You completed the &quot;{activeScenario.title}&quot; scenario. 
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {scenarios.filter((s) => s.id !== activeScenario.id).slice(0, 2).map((s) => (
                <button key={s.id} onClick={() => handleStart(s)} className="btn btn-secondary btn-full">
                  Try: {s.title}
                </button>
              ))}
              <button onClick={() => setActiveScenario(null)} className="btn btn-ghost btn-full">
                ← All Scenarios
              </button>
            </div>
          </div>
        </div>
      )
    }

    const step = activeScenario.steps[stepIndex]
    return (
      <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
        <ScenarioHeader />
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--space-6)' }}>
          {/* Scenario header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <button onClick={() => setActiveScenario(null)} className="btn btn-ghost btn-sm" style={{ padding: 'var(--space-2) 0', marginBottom: 'var(--space-3)' }}>
              ← All Scenarios
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                {activeScenario.title} — Step {stepIndex + 1} of {activeScenario.steps.length}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(stepIndex / activeScenario.steps.length) * 100}%` }} />
            </div>
          </div>

          {/* Step context */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>{step.title}</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
              {step.situation}
            </p>

            {/* Message mockup */}
            <div style={{
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              marginBottom: 'var(--space-6)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
              borderLeft: '3px solid var(--color-warning)',
            }}>
              <div style={{ fontWeight: 700, color: 'var(--color-warning)', marginBottom: 'var(--space-2)', fontStyle: 'normal', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                💬 Incoming Message
              </div>
              {activeScenario.intro && stepIndex === 0 && (
                <div style={{ marginBottom: 'var(--space-3)', fontStyle: 'normal', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                  {activeScenario.intro}
                </div>
              )}
              {step.situation}
            </div>

            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              {step.question}
            </h3>
          </div>

          {/* Choices */}
          {!stepComplete && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {step.choices.map((choice, i) => (
                <button
                  key={i}
                  id={`choice-${i}-btn`}
                  className="quiz-option"
                  onClick={() => handleChoice(choice)}
                  style={{ textAlign: 'left' }}
                >
                  <span className="option-letter">{['A', 'B', 'C', 'D'][i]}</span>
                  <span>{choice.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Consequence */}
          {stepComplete && selectedChoice && (
            <div className="animate-fade-in">
              <div
                className={`callout ${selectedChoice.isCorrect ? 'callout-success' : 'callout-error'}`}
                style={{ marginBottom: 'var(--space-4)', lineHeight: 1.6 }}
              >
                <div style={{ flexShrink: 0 }}>{selectedChoice.isCorrect ? '✅' : '⚠️'}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>
                    {selectedChoice.isCorrect ? 'Good choice!' : 'Here\'s what happens...'}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                    {selectedChoice.consequence}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-info)', marginBottom: 'var(--space-1)' }}>
                    💡 Key Lesson
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    {selectedChoice.lesson}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="btn btn-primary btn-full btn-lg"
                id="scenario-next-btn"
              >
                {stepIndex < activeScenario.steps.length - 1 ? 'Next Step →' : 'Complete Scenario ✓'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Scenario list
  return (
    <div style={{ minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
      <ScenarioHeader />
      <div className="container" style={{ paddingTop: 'var(--space-10)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="card" id={`scenario-card-${scenario.id}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: categoryColors[scenario.category] ?? 'var(--color-accent)',
                  background: `color-mix(in srgb, ${categoryColors[scenario.category] ?? 'var(--color-accent)'} 12%, transparent)`,
                  padding: '2px var(--space-3)',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid color-mix(in srgb, ${categoryColors[scenario.category] ?? 'var(--color-accent)'} 25%, transparent)`,
                }}>
                  {scenario.category}
                </span>
                <span className={`badge badge-${scenario.difficulty.toLowerCase()}`}>
                  {scenario.difficulty}
                </span>
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                {scenario.title}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                {scenario.intro}
              </p>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                {scenario.steps.length} decision point{scenario.steps.length !== 1 ? 's' : ''}
              </div>
              <button
                onClick={() => handleStart(scenario)}
                className="btn btn-primary btn-full"
                id={`start-scenario-${scenario.id}-btn`}
              >
                Start Scenario →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScenarioHeader() {
  return (
    <div
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.1) 0%, transparent 60%)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-12) 0',
        textAlign: 'center',
      }}
    >
      <div className="container">
        <div className="section-label" style={{ color: 'var(--color-warning)' }}>Interactive Simulations</div>
        <h1 className="section-title" style={{ marginTop: 'var(--space-2)' }}>Phishing Scenarios</h1>
        <p className="section-desc" style={{ maxWidth: '520px', margin: 'var(--space-3) auto 0' }}>
          Make decisions in realistic phishing scenarios. See the consequences of each choice and learn the correct response.
        </p>
      </div>
    </div>
  )
}
