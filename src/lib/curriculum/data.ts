export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface QuizQuestion {
  id: string
  type: 'multiple_choice' | 'true_false' | 'scenario' | 'identify_redflag'
  question: string
  scenario?: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Topic {
  id: string
  slug: string
  title: string
  level: number
  levelName: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedMinutes: number
  description: string
  objective: string
  simpleExplanation: string
  technicalExplanation: string
  realWorldExample: string
  attackFlow: string[]
  redFlags: { title: string; why: string }[]
  misconceptions: { myth: string; reality: string }[]
  keyTakeaways: string[]
  flashcards: Flashcard[]
  quiz: QuizQuestion[]
}

export interface Level {
  id: number
  name: string
  description: string
  topics: Topic[]
}

export const curriculum: Level[] = [
  {
    id: 1,
    name: 'Foundations',
    description: 'Understand what phishing is, why it works, and the core terminology.',
    topics: [
      {
        id: 'what-is-phishing',
        slug: 'what-is-phishing',
        title: 'What is Phishing?',
        level: 1,
        levelName: 'Foundations',
        difficulty: 'Beginner',
        estimatedMinutes: 12,
        description: 'Learn the definition, history, and mechanics of phishing attacks.',
        objective:
          'By the end of this lesson, you will understand what phishing is, how a phishing attack works step-by-step, why attackers use it over other methods, and how phishing differs from other social-engineering techniques.',
        simpleExplanation:
          'Phishing is like a fisherman casting a net hoping fish will swim in. Instead of fish, attackers want your passwords, bank details, or personal information. They disguise themselves as someone you trust — your bank, your boss, a delivery company — and send you a message asking you to do something: click a link, enter your password, share an OTP. The moment you do, they have what they came for.',
        technicalExplanation:
          'Phishing is a social-engineering attack where a threat actor impersonates a legitimate entity via electronic communication (email, SMS, voice, etc.) to deceive a target into disclosing sensitive information, executing a malicious payload, or performing an unauthorized action. Unlike brute-force or exploit-based attacks, phishing exploits human psychology rather than technical vulnerabilities. The attacker typically registers a look-alike domain (e.g., paypa1.com), crafts a convincing pretext, and hosts a credential-harvesting page that mirrors the legitimate service. Stolen credentials are exfiltrated to a command-and-control server. The entire attack can be executed with zero technical skill using off-the-shelf phishing kits.',
        realWorldExample:
          'Priya receives an email from "HDFC Bank" with the subject line "Urgent: Your account will be locked in 24 hours." The email looks exactly like a real bank email — same logo, same fonts, same colors. She clicks the link, which takes her to a website that looks identical to HDFC\'s login page. She enters her user ID and password. The website then says "Thank you, your account has been verified." But in reality, the attacker now has her credentials and can log into her real bank account.',
        attackFlow: [
          'Attacker registers a look-alike domain (e.g., hdfc-secure-login.com)',
          'Sets up a cloned copy of the bank\'s login page',
          'Crafts an urgent email with a convincing pretext',
          'Sends the email to thousands of targets',
          'Victim clicks the link due to urgency or fear',
          'Victim enters credentials on the fake page',
          'Credentials are silently sent to the attacker',
          'Attacker logs into the real bank account',
        ],
        redFlags: [
          {
            title: 'Urgency or Threat',
            why: 'Attackers want you to act before you think. "24 hours" or "your account will be suspended" short-circuits rational decision-making by activating the brain\'s fear response. Legitimate institutions give you time.',
          },
          {
            title: 'Suspicious Sender Domain',
            why: 'support@hdfc-secure-login.com is NOT hdfc.com. Attackers register domains that look similar. Always check the part after the @ symbol — that is the real sender.',
          },
          {
            title: 'Generic Greeting',
            why: '"Dear Customer" instead of your actual name indicates a mass phishing campaign. Your bank knows your name because you gave it to them when opening your account.',
          },
          {
            title: 'Link Does Not Match the Text',
            why: 'The text may say "www.hdfc.com" but the actual URL underneath points somewhere else. Always hover over a link before clicking to see where it actually leads.',
          },
        ],
        misconceptions: [
          {
            myth: 'If the website has HTTPS (the padlock icon), it is safe.',
            reality: 'HTTPS only means the connection is encrypted. It says nothing about whether the website itself is legitimate. Attackers routinely obtain free SSL certificates for their fake domains. A padlock ≠ trustworthy.',
          },
          {
            myth: 'I would easily recognize a phishing email because they look fake.',
            reality: 'Modern phishing emails are nearly pixel-perfect copies of legitimate communications. Spear phishing emails that use your name, your company, and realistic context are extremely convincing even to technical people.',
          },
          {
            myth: 'Only non-technical people fall for phishing.',
            reality: 'Some of the most significant security breaches in history — including attacks on government agencies and major corporations — succeeded because technically skilled employees clicked a well-crafted phishing link.',
          },
        ],
        keyTakeaways: [
          'Phishing exploits human psychology, not technical vulnerabilities.',
          'Attackers impersonate trusted entities to create a false sense of legitimacy.',
          'Urgency, fear, and authority are the primary psychological levers used.',
          'The sender domain (part after @) is the most reliable indicator of email authenticity.',
          'HTTPS does not guarantee a website is legitimate — only that the connection is encrypted.',
          'Always verify through an independent, official channel before taking any action.',
          'Legitimate organizations will never ask for your OTP, password, or PIN via message or call.',
        ],
        flashcards: [
          {
            id: 'wip-fc-1',
            front: 'What is phishing?',
            back: 'A social-engineering attack where an attacker impersonates a trusted entity to deceive victims into revealing sensitive information or performing a harmful action.',
          },
          {
            id: 'wip-fc-2',
            front: 'Why do attackers prefer phishing over hacking systems directly?',
            back: 'Because humans are easier to trick than computers. No technical expertise is required — off-the-shelf phishing kits are freely available, making phishing cheap, scalable, and highly effective.',
          },
          {
            id: 'wip-fc-3',
            front: 'What does HTTPS (the padlock icon) actually guarantee?',
            back: 'Only that the connection between your browser and the website is encrypted. It does NOT guarantee the website is legitimate or safe.',
          },
          {
            id: 'wip-fc-4',
            front: 'How can you verify the true sender of an email?',
            back: 'Check the domain in the sender\'s email address — the part after the @ symbol. "support@hdfc-secure-login.com" is NOT from hdfc.com.',
          },
          {
            id: 'wip-fc-5',
            front: 'What is a "look-alike domain"?',
            back: 'A domain registered by an attacker that closely resembles a legitimate one. Example: paypa1.com (using the number 1 instead of l), or paypal-secure.com.',
          },
          {
            id: 'wip-fc-6',
            front: 'What psychological trigger do most phishing messages use?',
            back: 'Urgency and fear — e.g., "Your account will be suspended in 24 hours." This prevents the victim from thinking critically before acting.',
          },
          {
            id: 'wip-fc-7',
            front: 'What is the safest way to respond to an urgent bank message?',
            back: 'Ignore the link in the message entirely. Open your bank\'s official app or type the official URL directly in your browser to check your account status independently.',
          },
          {
            id: 'wip-fc-8',
            front: 'What does "credential harvesting" mean?',
            back: 'The process of collecting usernames and passwords entered by victims on a fake (cloned) login page controlled by the attacker.',
          },
        ],
        quiz: [
          {
            id: 'wip-q-1',
            type: 'multiple_choice',
            question: 'What is the PRIMARY goal of most phishing attacks?',
            options: [
              'To crash the victim\'s computer',
              'To steal sensitive information like passwords and financial data',
              'To send spam emails from the victim\'s account',
              'To test the victim\'s cybersecurity awareness',
            ],
            correctIndex: 1,
            explanation:
              'The primary goal of phishing is to steal sensitive information — credentials, financial data, or personal details — that the attacker can use for financial gain, further attacks, or identity theft.',
          },
          {
            id: 'wip-q-2',
            type: 'true_false',
            question: 'A website with HTTPS (the padlock icon) is always safe to enter your password on.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation:
              'False. HTTPS only encrypts the connection. Attackers routinely obtain free SSL certificates (like Let\'s Encrypt) for their phishing sites. A padlock means your data is encrypted in transit — it does NOT mean the destination is trustworthy.',
          },
          {
            id: 'wip-q-3',
            type: 'scenario',
            scenario:
              'You receive an email: From: support@sbi-account-secure.com — Subject: "URGENT: Your SBI account has been suspended. Click here to reactivate within 2 hours or your account will be permanently closed."',
            question: 'Which element is the STRONGEST red flag in this email?',
            options: [
              'The word URGENT in the subject line',
              'The sender domain "sbi-account-secure.com" instead of sbi.co.in',
              'The 2-hour deadline',
              'The fact that it arrived unexpectedly',
            ],
            correctIndex: 1,
            explanation:
              'The sender domain is the strongest red flag. SBI\'s official domain is sbi.co.in. "sbi-account-secure.com" is a look-alike domain registered by the attacker. While urgency and deadlines are also red flags, a mismatched sender domain is the clearest technical indicator of impersonation.',
          },
          {
            id: 'wip-q-4',
            type: 'multiple_choice',
            question: 'Why do attackers use urgency ("Act now!", "24 hours!") in phishing messages?',
            options: [
              'To fill the email with text and look more legitimate',
              'Because their own server credentials expire quickly',
              'To prevent the victim from thinking carefully and verifying the message',
              'Because most banks actually send urgent messages',
            ],
            correctIndex: 2,
            explanation:
              'Urgency is a psychological manipulation technique. When people feel threatened or rushed, they bypass careful analysis and act impulsively. Attackers exploit this by creating artificial deadlines that pressure victims into clicking links without verifying their legitimacy.',
          },
          {
            id: 'wip-q-5',
            type: 'identify_redflag',
            scenario:
              'Email from: noreply@netflix-billing-update.support — "Dear Customer, your Netflix subscription payment failed. Please update your payment method to avoid service interruption." — [Update Payment Method]',
            question: 'Identify ALL the red flags in this message.',
            options: [
              'Generic greeting ("Dear Customer") — Netflix knows your name',
              'Suspicious sender domain (netflix-billing-update.support is NOT netflix.com)',
              'Creating anxiety about service interruption',
              'All of the above',
            ],
            correctIndex: 3,
            explanation:
              'All three elements are red flags. (1) Legitimate services address you by the name on your account. (2) Netflix\'s official domain is netflix.com — "netflix-billing-update.support" is an attacker-registered domain. (3) "Avoid service interruption" creates anxiety to bypass critical thinking. When multiple red flags appear together, the probability of phishing is extremely high.',
          },
        ],
      },
      {
        id: 'why-phishing-works',
        slug: 'why-phishing-works',
        title: 'Why Phishing Works',
        level: 1,
        levelName: 'Foundations',
        difficulty: 'Beginner',
        estimatedMinutes: 15,
        description: 'Understand the psychological principles that make people vulnerable to phishing.',
        objective:
          'By the end of this lesson, you will understand the core psychological principles attackers exploit, why even smart people fall for phishing, and how awareness changes your response.',
        simpleExplanation:
          'Phishing works because it exploits how human brains are wired — not because people are stupid. Our brains take mental shortcuts (called heuristics) to process information quickly. Attackers know these shortcuts and design messages that trigger automatic responses: fear, trust, urgency, curiosity, or greed. Understanding this is the first step to protecting yourself.',
        technicalExplanation:
          'Phishing exploits well-documented cognitive biases and psychological principles. The "fast thinking" system (System 1 in dual-process theory) handles most of our moment-to-moment decisions automatically and emotionally. Attackers craft messages that trigger System 1 responses — preventing the slower, analytical System 2 from engaging. Key mechanisms include: authority bias (we comply with perceived authority figures), scarcity principle (urgency creates fear of loss), social proof (if others have done it, it must be safe), and confirmation bias (we see what we expect to see). Combined with contextual personalization in spear phishing, these create near-irresistible deceptions.',
        realWorldExample:
          'Rahul works at a company. He receives an email from "his CEO" (actually an attacker who spoofed the CEO\'s email) saying: "Rahul, I\'m in an important meeting. I need you to urgently purchase 5 Google Play gift cards worth ₹10,000 each and send me the codes. I\'ll reimburse you. Don\'t discuss this with anyone — it\'s confidential." Rahul is new, wants to impress his CEO, feels the pressure of authority and urgency, and complies — losing ₹50,000.',
        attackFlow: [
          'Attacker researches target (LinkedIn, company website)',
          'Identifies authority figures and their relationships',
          'Crafts a highly personalized, context-appropriate message',
          'Triggers multiple psychological levers simultaneously',
          'Target\'s System 1 (fast thinking) responds automatically',
          'Target complies before System 2 (analytical thinking) engages',
          'Attacker achieves their objective',
        ],
        redFlags: [
          {
            title: 'Multiple Psychological Triggers at Once',
            why: 'Urgency + Authority + Secrecy in the same message is a hallmark of social engineering. Legitimate requests rarely combine all three simultaneously.',
          },
          {
            title: 'Requests That Seem "Off"',
            why: 'Your gut reaction matters. If something feels unusual — like a CEO asking for gift card codes — trust that instinct. Verify through a known, separate channel.',
          },
          {
            title: '"Don\'t Tell Anyone"',
            why: 'Attackers use secrecy to prevent you from getting a second opinion that would reveal the scam. Legitimate business processes never require secrecy from colleagues.',
          },
        ],
        misconceptions: [
          {
            myth: 'Only uneducated people fall for phishing.',
            reality: 'Highly educated professionals, IT administrators, and even cybersecurity experts have fallen for sophisticated phishing attacks. Vulnerability is about psychology, not intelligence.',
          },
          {
            myth: 'I\'ll always recognize when I\'m being manipulated.',
            reality: 'Research shows that most people believe they\'re above average at detecting manipulation — yet the success rate of targeted phishing attacks is extremely high. Overconfidence is itself a vulnerability.',
          },
        ],
        keyTakeaways: [
          'Phishing works by exploiting automatic (System 1) thinking, bypassing rational analysis.',
          'Authority, urgency, scarcity, and fear are the primary psychological levers.',
          'Intelligence does not protect against phishing — awareness and habits do.',
          'Secrecy requests are a major red flag — legitimate processes allow verification.',
          'Multiple simultaneous psychological triggers in one message is a strong indicator of an attack.',
          'Verify any unusual request through a known, independent channel before acting.',
        ],
        flashcards: [
          {
            id: 'wwp-fc-1',
            front: 'What is "System 1" thinking and why do attackers exploit it?',
            back: 'System 1 is fast, automatic, emotional thinking. It handles most day-to-day decisions. Attackers craft messages that trigger System 1 responses (fear, urgency) to bypass the slower, analytical System 2 thinking that would detect the deception.',
          },
          {
            id: 'wwp-fc-2',
            front: 'What is Authority Bias in the context of phishing?',
            back: 'The tendency to comply with requests from perceived authority figures (bosses, banks, government, police). Attackers impersonate authorities to make compliance seem mandatory and unquestionable.',
          },
          {
            id: 'wwp-fc-3',
            front: 'Why is "Don\'t tell anyone" a red flag in a message?',
            back: 'Attackers use secrecy to prevent you from getting a second opinion that would reveal the scam. Legitimate business or organizational processes never require you to hide actions from colleagues.',
          },
          {
            id: 'wwp-fc-4',
            front: 'What is the "scarcity principle" in social engineering?',
            back: 'Creating a sense of limited time or opportunity (e.g., "Only 2 hours left!") to pressure victims into acting quickly without careful thought. Fear of loss is a powerful motivator.',
          },
          {
            id: 'wwp-fc-5',
            front: 'Why does knowing about psychological tricks NOT make you immune to phishing?',
            back: 'Because phishing exploits automatic (emotional) responses that happen before conscious analysis. Awareness helps, but habit-based verification (always checking independently) is more protective than theoretical knowledge alone.',
          },
        ],
        quiz: [
          {
            id: 'wwp-q-1',
            type: 'multiple_choice',
            question: 'Why do phishing attacks succeed even against educated, technically skilled people?',
            options: [
              'Because they are designed to exploit technical vulnerabilities in browsers',
              'Because they exploit psychological automatic responses, bypassing rational analysis',
              'Because educated people trust technology too much',
              'Because attackers have access to people\'s personal information from data breaches',
            ],
            correctIndex: 1,
            explanation:
              'Phishing exploits psychological automatic responses — urgency, authority, fear — that trigger before rational analysis kicks in. This affects people regardless of education level or technical skill.',
          },
          {
            id: 'wwp-q-2',
            type: 'scenario',
            scenario:
              'Your college principal sends you a WhatsApp message: "Student, I need a favor immediately. My phone is broken. Buy ₹5,000 worth of Amazon gift cards and send me the codes. Don\'t tell any teachers — I\'ll explain later."',
            question: 'What psychological tactics is this message using? (Select the best answer)',
            options: [
              'Only authority (the principal)',
              'Only urgency (immediately)',
              'Authority, urgency, and secrecy — three simultaneous social engineering tactics',
              'Greed and curiosity',
            ],
            correctIndex: 2,
            explanation:
              'This message combines three classic social engineering tactics: Authority (impersonating the principal), Urgency ("immediately"), and Secrecy ("don\'t tell any teachers"). This combination is a hallmark of a gift card scam. The correct action is to call the principal directly on a known number to verify.',
          },
          {
            id: 'wwp-q-3',
            type: 'true_false',
            question: 'Being very confident that you can identify phishing makes you safer from attacks.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation:
              'False. Overconfidence is actually a vulnerability. Research shows most people overestimate their ability to detect manipulation. Protective habits (like always verifying independently, never clicking email links for sensitive actions) are far more reliable than confidence in your detection skills.',
          },
        ],
      },
      {
        id: 'social-engineering',
        slug: 'social-engineering',
        title: 'Social Engineering',
        level: 1,
        levelName: 'Foundations',
        difficulty: 'Beginner',
        estimatedMinutes: 14,
        description: 'Understand social engineering as the foundation of phishing and all human-centered attacks.',
        objective:
          'Understand what social engineering is, how it relates to phishing, and the key psychological principles (authority, urgency, fear, curiosity, greed, trust, social proof) attackers exploit.',
        simpleExplanation:
          'Social engineering is the art of manipulating people into doing what you want — without hacking their computer. Instead of breaking through a firewall, an attacker convinces YOU to open the door. Phishing is the most common form of social engineering, delivered digitally.',
        technicalExplanation:
          'Social engineering is a broad category of attacks that exploit human psychology rather than technical vulnerabilities to gain unauthorized access to systems, information, or resources. Core principles exploited include: Cialdini\'s six principles of influence (reciprocity, commitment, social proof, authority, liking, scarcity), alongside fear, urgency, and curiosity. In cybersecurity contexts, social engineering attacks include phishing (email), smishing (SMS), vishing (voice), pretexting, baiting, and quid pro quo. The human element is often called the weakest link in security — but with training, humans can also be the strongest line of defense.',
        realWorldExample:
          'An attacker calls a company\'s IT helpdesk pretending to be a new employee: "Hi, this is Rohan from the Delhi office. I just joined last week and my login isn\'t working — I have an important presentation in 20 minutes! Can you reset my password? My employee ID is 4892." The helpdesk resets the password, and the attacker now has access to company systems.',
        attackFlow: [
          'Attacker researches target organization (LinkedIn, website, social media)',
          'Develops a believable pretext (fake identity/scenario)',
          'Establishes rapport or urgency',
          'Makes a request that exploits a psychological principle',
          'Target complies, granting access or information',
          'Attacker achieves objective without any technical hacking',
        ],
        redFlags: [
          {
            title: 'Unusual Requests from "Authority"',
            why: 'Even if someone claims to be your boss, your bank, or a government official — verify through an independent channel. Authority claims are easy to fake.',
          },
          {
            title: 'Creating Artificial Time Pressure',
            why: 'Legitimate urgent matters always allow time to verify. An "emergency" that prevents you from double-checking is almost always engineered.',
          },
          {
            title: 'Appeals to Curiosity or Greed',
            why: '"You\'ve won a prize," "See who viewed your profile," "Download this free software." Curiosity and greed cause people to click without thinking.',
          },
        ],
        misconceptions: [
          {
            myth: 'Social engineering only happens in movies or to large corporations.',
            reality: 'Social engineering attacks happen every day to individuals — via phone, SMS, WhatsApp, and email. UPI scams, OTP fraud, and job scams are all social engineering attacks targeting ordinary people.',
          },
        ],
        keyTakeaways: [
          'Social engineering manipulates people, not machines.',
          'Phishing is the most common digital form of social engineering.',
          'Key psychological levers: Authority, Urgency, Fear, Curiosity, Greed, Trust, Social Proof.',
          'No amount of firewalls can protect against a human who has been socially engineered.',
          'Verification through independent channels is the universal counter to social engineering.',
          'Slow down, question unusual requests, and verify before acting.',
        ],
        flashcards: [
          {
            id: 'se-fc-1',
            front: 'What is social engineering?',
            back: 'Manipulating people into revealing information or performing actions through psychological tactics rather than technical hacking. It exploits human trust, fear, authority, and other psychological principles.',
          },
          {
            id: 'se-fc-2',
            front: 'Name 6 psychological principles that social engineers exploit.',
            back: '1. Authority — compliance with perceived authority\n2. Urgency — fear of missing a deadline\n3. Fear — avoiding a negative consequence\n4. Curiosity — desire to know something\n5. Greed — desire for gain\n6. Social Proof — "others are doing it so it\'s safe"',
          },
          {
            id: 'se-fc-3',
            front: 'What is "pretexting"?',
            back: 'Creating a fabricated scenario (a pretext) to manipulate a victim. Example: Calling IT support and pretending to be a new employee to get a password reset.',
          },
          {
            id: 'se-fc-4',
            front: 'What is the universal counter to social engineering?',
            back: 'Verification through an independent channel. Always verify unusual requests by contacting the person or organization through a known, separate means — not through the link or number provided in the suspicious message.',
          },
        ],
        quiz: [
          {
            id: 'se-q-1',
            type: 'multiple_choice',
            question: 'Which of the following is a social engineering attack?',
            options: [
              'Exploiting a bug in a web browser',
              'Guessing a password using a dictionary attack',
              'Calling IT support while pretending to be an employee to get a password reset',
              'Intercepting network traffic with a packet sniffer',
            ],
            correctIndex: 2,
            explanation:
              'Pretexting (calling IT support with a fake identity) is a classic social engineering attack. It exploits human trust and helpfulness rather than any technical vulnerability. The other options are technical attacks that don\'t exploit human psychology.',
          },
          {
            id: 'se-q-2',
            type: 'true_false',
            question: 'Phishing is a type of social engineering attack.',
            options: ['True', 'False'],
            correctIndex: 0,
            explanation:
              'True. Phishing is the most common digital form of social engineering. It uses deceptive communications (emails, SMS, etc.) to manipulate people into revealing information or performing actions, exploiting psychological principles like authority, urgency, and trust.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Types of Phishing',
    description: 'Master every major phishing variant — email, SMS, voice, QR, spear, and more.',
    topics: [
      {
        id: 'email-phishing',
        slug: 'email-phishing',
        title: 'Email Phishing',
        level: 2,
        levelName: 'Types of Phishing',
        difficulty: 'Beginner',
        estimatedMinutes: 12,
        description: 'The most common phishing method — fake emails designed to steal credentials or install malware.',
        objective:
          'Understand how email phishing works, recognize the anatomy of a phishing email, and know how to respond safely.',
        simpleExplanation:
          'Email phishing is the original and most common form. Attackers send bulk emails pretending to be from banks, services, or companies. The email contains a link to a fake website or a malicious attachment. Most phishing emails are sent in bulk — the attacker doesn\'t know who will click, but with millions of emails, even a 0.1% success rate yields thousands of victims.',
        technicalExplanation:
          'Email phishing relies on several technical mechanisms: (1) Domain spoofing — attackers register look-alike domains or spoof the "From" display name while the actual sending address differs. (2) HTML email manipulation — the displayed link text can differ from the actual href. (3) Open redirects — attackers use legitimate domains with redirect parameters to bypass email filters. (4) Homograph attacks — using Unicode characters that look identical to ASCII (е vs e). (5) Malicious attachments — Office documents with macros, PDFs with embedded JavaScript, or ZIP files containing executables.',
        realWorldExample:
          'Amit receives an email: From: Netflix <billing@netflix-payment-update.com>. Subject: "Your payment method was declined." The email looks exactly like Netflix — logo, colors, formatting. The button says "Update Payment Method." Clicking it takes him to a perfect clone of Netflix\'s payment page. He enters his credit card details. His card is immediately used for fraudulent purchases.',
        attackFlow: [
          'Attacker acquires bulk email lists (from data breaches or purchased lists)',
          'Registers a look-alike domain and obtains SSL certificate',
          'Clones a legitimate website\'s login/payment page',
          'Crafts a convincing email with spoofed branding',
          'Sends to thousands of targets',
          'Victims click links, enter credentials on fake pages',
          'Credentials are captured and used or sold',
        ],
        redFlags: [
          {
            title: 'Sender Domain Does Not Match the Company',
            why: 'billing@netflix-payment-update.com is NOT netflix.com. The company name appears in the subdomain or prefix — attackers rely on you reading only the word "Netflix" and not the full domain.',
          },
          {
            title: 'Hover Reveals a Different URL',
            why: 'The button text says "Login to Netflix" but hovering shows the real URL is something like http://bit.ly/xxxxx or a completely different domain.',
          },
          {
            title: 'Generic or Missing Personalization',
            why: 'Netflix, your bank, and Amazon all know your name. "Dear Customer" or "Dear User" indicates a mass phishing campaign without your personal data.',
          },
          {
            title: 'Unexpected Attachment',
            why: 'Unsolicited PDFs, Word files, ZIP archives, or EXE files from any source — even a name you recognize — should be treated with extreme caution.',
          },
        ],
        misconceptions: [
          {
            myth: 'If the email came from what looks like the right address, it\'s legitimate.',
            reality: 'Email "From" display names are trivially easy to fake. Anyone can set their display name to "HDFC Bank" even if they\'re sending from a@b.com. Always check the actual email address, not just the display name.',
          },
        ],
        keyTakeaways: [
          'Check the full sender email address, not just the display name.',
          'Hover over links before clicking to see the real destination URL.',
          'Legitimate services address you by your actual name, not "Dear Customer."',
          'Never open unexpected attachments, even from known contacts.',
          'If in doubt, open a new browser tab and navigate to the service directly.',
          'Email filters catch most phishing but sophisticated attacks bypass them.',
        ],
        flashcards: [
          {
            id: 'ep-fc-1',
            front: 'How do attackers fake an email "From" field?',
            back: 'They set the display name (e.g., "HDFC Bank") to a legitimate name while the actual sending address is different. Email clients often show only the display name, hiding the real address until you click on it.',
          },
          {
            id: 'ep-fc-2',
            front: 'What is a homograph attack in phishing?',
            back: 'Using Unicode characters that look identical to standard letters to create deceptive URLs. Example: Using the Cyrillic "а" (looks like "a") to create аpple.com, which appears to be apple.com but is a different domain.',
          },
          {
            id: 'ep-fc-3',
            front: 'Why should you hover over links before clicking?',
            back: 'The visible text of a link can say anything (e.g., "www.paypal.com") while the actual URL (shown on hover) points to a completely different domain. Hovering reveals the real destination.',
          },
          {
            id: 'ep-fc-4',
            front: 'What is the safest way to access your bank account when you receive a suspicious email?',
            back: 'Do not click any link in the email. Open a new browser tab and type your bank\'s official URL directly, or open the bank\'s official app on your phone.',
          },
          {
            id: 'ep-fc-5',
            front: 'What makes an email attachment dangerous?',
            back: 'Malicious attachments can contain: (1) Macros in Office documents that run malicious code, (2) Embedded scripts in PDFs, (3) Executable files (.exe, .bat) disguised with misleading names, or (4) Compressed files hiding malware.',
          },
        ],
        quiz: [
          {
            id: 'ep-q-1',
            type: 'scenario',
            scenario:
              'Email: From: "HDFC Bank" <security-alert@hdfcbank-verify.in> — Subject: "Action Required: Verify your account" — "Dear Customer, we detected unusual activity. Click here to verify: [Verify Account]"',
            question: 'What is the PRIMARY red flag in this email?',
            options: [
              'The subject line says "Action Required"',
              'The sender domain is hdfcbank-verify.in instead of hdfcbank.com',
              'The word "unusual activity" is used',
              'The email arrived unexpectedly',
            ],
            correctIndex: 1,
            explanation:
              'The sender domain (hdfcbank-verify.in) is the primary red flag. HDFC Bank\'s official domain is hdfcbank.com. "hdfcbank-verify.in" is a look-alike domain registered by an attacker. While "Dear Customer" and unexpected arrival are also red flags, the mismatched domain is the clearest technical indicator of impersonation.',
          },
          {
            id: 'ep-q-2',
            type: 'multiple_choice',
            question: 'You receive an email with an attachment called "Salary_Revision_2026.pdf" from your HR department. You were not expecting any salary update. What should you do?',
            options: [
              'Open it immediately — it sounds important',
              'Forward it to your colleagues to check if they received the same',
              'Contact your HR department through a separate, known communication channel to verify before opening',
              'Open it but don\'t enter any information it requests',
            ],
            correctIndex: 2,
            explanation:
              'The correct action is to verify through a separate channel. Call or message HR directly (not by replying to the email) to confirm they sent it. Unexpected attachments — even from known senders — are a common delivery mechanism for malware. Attackers can spoof HR department email addresses or compromise actual employee accounts.',
          },
        ],
      },
      {
        id: 'smishing',
        slug: 'smishing',
        title: 'Smishing (SMS Phishing)',
        level: 2,
        levelName: 'Types of Phishing',
        difficulty: 'Beginner',
        estimatedMinutes: 10,
        description: 'Phishing attacks delivered via SMS — delivery scams, bank alerts, and OTP fraud.',
        objective:
          'Understand how smishing works, recognize common smishing patterns, and know how to respond to suspicious SMS messages.',
        simpleExplanation:
          'Smishing is phishing via SMS. Attackers send text messages pretending to be your bank, a delivery service, the government, or your mobile provider. SMS messages feel more personal and urgent than emails — we\'re conditioned to respond to texts quickly. This makes smishing highly effective.',
        technicalExplanation:
          'Smishing exploits several SMS-specific factors: (1) SMS lacks authentication mechanisms like email\'s SPF/DKIM/DMARC, making sender spoofing trivial. (2) Mobile screens hide full URLs, making malicious links less obvious. (3) People respond to SMS faster than email (average response: 90 seconds). (4) Smishing kits are commercially available for under $50. Common vectors include fake delivery notifications, bank OTP fraud, government subsidy scams, and prize/lottery fraud. India-specific variants include UPI reversal scams, TRAI number block threats, and KYC update frauds.',
        realWorldExample:
          'Sunita receives: "HDFC BANK: Your debit card has been temporarily blocked. Update KYC immediately to avoid account closure: http://hdfc-kyc-update.xyz/login — Ref: HDV7829" — She clicks, enters her card number, PIN, and OTP. Her account is drained within minutes.',
        attackFlow: [
          'Attacker purchases bulk SMS sending service',
          'Spoofs sender ID to show "HDFC BANK" or "TRAI"',
          'SMS links to a mobile-optimized fake page',
          'Creates urgency: "blocked," "suspended," "immediate action"',
          'Victim clicks on mobile, can\'t see the full URL',
          'Enters credentials or OTP on fake page',
          'Account compromised immediately',
        ],
        redFlags: [
          {
            title: 'Shortened or Suspicious URL',
            why: 'Legitimate banks and institutions never use bit.ly, tinyurl, or random domains in official SMS messages. Their links always go to their own verified domain.',
          },
          {
            title: 'Asking for OTP via Link',
            why: 'You will NEVER need to enter an OTP on a website to "unblock" your bank account or "verify" your SIM. OTPs are for you to authenticate — never to share.',
          },
          {
            title: 'Urgency About Account Suspension',
            why: 'Banks send proper notices through registered mail and their app/email. An SMS threatening immediate suspension is almost always a smishing attempt.',
          },
        ],
        misconceptions: [
          {
            myth: 'My bank\'s name appeared as the SMS sender, so it must be real.',
            reality: 'SMS sender names (called Sender IDs) are trivially easy to spoof. An attacker can send an SMS that appears to come from "HDFC BANK" or "TRAI" on your phone.',
          },
        ],
        keyTakeaways: [
          'SMS sender IDs can be spoofed — the name alone does not verify authenticity.',
          'Never click links in SMS messages for sensitive actions — use the official app instead.',
          'Shortened URLs in official SMS from banks are a red flag.',
          'Mobile screens hide full URLs — always expand and verify before proceeding.',
          'Your UPI PIN is only for sending money — you never need it to receive money.',
          'If unsure, call your bank using the number on the back of your card.',
        ],
        flashcards: [
          {
            id: 'sm-fc-1',
            front: 'What is smishing?',
            back: 'SMS-based phishing. Attackers send deceptive text messages that impersonate banks, delivery services, governments, or other trusted entities to steal credentials, OTPs, or personal information.',
          },
          {
            id: 'sm-fc-2',
            front: 'Why is smishing often more effective than email phishing?',
            back: 'People respond to SMS faster (average 90 seconds vs. 90 minutes for email), phone screens hide full URLs making links harder to evaluate, and SMS feels more personal and urgent than email.',
          },
          {
            id: 'sm-fc-3',
            front: 'Why does a legitimate-looking SMS sender name NOT verify authenticity?',
            back: 'SMS Sender IDs can be freely spoofed by anyone using bulk SMS services. An attacker can send an SMS that shows "HDFC BANK" or "TRAI" as the sender while it originates from a fake server.',
          },
          {
            id: 'sm-fc-4',
            front: 'What is a UPI reversal scam?',
            back: 'The attacker sends a UPI payment request (not a credit) asking the victim to "enter your PIN to receive money." In reality, entering your UPI PIN authorizes a payment TO the attacker. You NEVER need your PIN to receive money.',
          },
          {
            id: 'sm-fc-5',
            front: 'What should you do when you receive an urgent SMS from your bank?',
            back: 'Do not click any link in the SMS. Open your bank\'s official app or call the number on the back of your debit/credit card to verify whether there is actually a problem with your account.',
          },
        ],
        quiz: [
          {
            id: 'sm-q-1',
            type: 'scenario',
            scenario: '"TRAI NOTICE: Your mobile number +91-XXXXX will be disconnected in 2 hours due to illegal activities. To avoid disconnection, call our officer immediately at 9988776655."',
            question: 'What type of scam is this and what should you do?',
            options: [
              'This is a legitimate government notice — call immediately to resolve',
              'This is vishing/smishing — TRAI never calls or texts individuals about disconnection. Report and ignore.',
              'This is a technical issue — contact your carrier',
              'This is spam — reply STOP to unsubscribe',
            ],
            correctIndex: 1,
            explanation:
              'This is a well-known "TRAI disconnection" smishing/vishing scam. TRAI (Telecom Regulatory Authority of India) does NOT call or text individual users about number disconnection. The "officer" number connects to scammers who will demand money or personal information. Report this to the Sanchar Saathi portal or block and delete. Never call numbers provided in unsolicited messages.',
          },
          {
            id: 'sm-q-2',
            type: 'true_false',
            question: 'You need to enter your UPI PIN to receive money into your account.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation:
              'False. Your UPI PIN is ONLY required to send money or make payments. To receive money, you share your UPI ID or let the sender scan your QR code — no PIN required. Any request to enter your PIN to "receive" money is a fraud attempt.',
          },
        ],
      },
      {
        id: 'spear-phishing',
        slug: 'spear-phishing',
        title: 'Spear Phishing',
        level: 2,
        levelName: 'Types of Phishing',
        difficulty: 'Intermediate',
        estimatedMinutes: 18,
        description: 'Highly targeted phishing attacks that use personal information to seem convincingly legitimate.',
        objective:
          'Understand what makes spear phishing different from bulk phishing, how attackers gather personal information, why personalization dramatically increases success rates, and how to protect against targeted attacks.',
        simpleExplanation:
          'Regular phishing is like spam — sent to millions hoping someone bites. Spear phishing is the opposite: the attacker specifically targets YOU. They research you on LinkedIn, Instagram, your college website, or data breaches — then craft a message that mentions your name, your role, your colleagues, or your recent activities. It feels real because much of it IS real information about you.',
        technicalExplanation:
          'Spear phishing is a targeted social engineering attack where reconnaissance is performed on the specific victim before crafting a highly personalized message. Reconnaissance sources include: OSINT (LinkedIn, social media, company websites, GitHub, public records), data breach dumps, and sometimes preliminary vishing or smishing to gather additional details. The attack\'s effectiveness scales with the quality of personalization — mentioning the victim\'s manager\'s name, referencing a real recent event, or using the organization\'s internal terminology eliminates the generic red flags that most phishing awareness training identifies. Business Email Compromise (BEC) is a sophisticated spear phishing variant targeting organizations for financial fraud.',
        realWorldExample:
          'Kavita is a finance manager at a mid-size company. An attacker finds her on LinkedIn, notes her company, her boss\'s name (Rajiv Sharma), and that the company recently announced a new office. She receives an email: "Hi Kavita, this is Rajiv. As you know, we\'re finalizing the Mumbai office setup. Our vendor Decor Solutions sent an invoice attached. Please process the payment of ₹4,50,000 by EOD — I\'m in meetings all afternoon. Let me know when done." The email uses Rajiv\'s name and references a real event. Kavita, not wanting to bother her busy boss, pays the invoice to an attacker-controlled account.',
        attackFlow: [
          'Attacker identifies high-value target (finance, HR, IT admin)',
          'Performs OSINT: LinkedIn, company website, social media',
          'Maps relationships: target\'s manager, colleagues, vendors',
          'Identifies recent events the pretext can reference',
          'Crafts personalized, context-appropriate email',
          'Often impersonates a trusted authority (CEO, manager)',
          'Creates urgency that prevents verification',
          'Target complies, transferring money or credentials',
        ],
        redFlags: [
          {
            title: 'Request That Bypasses Normal Process',
            why: 'Spear phishing often includes "process exceptions" — "skip the usual approval," "don\'t use the ticketing system," "transfer directly." Legitimate urgent requests still follow basic verification protocols.',
          },
          {
            title: 'Urgency Combined with Unavailability',
            why: '"I\'m in meetings all day, just do it" — the attacker makes the impersonated person unavailable for verification. Always establish an alternative verification method regardless.',
          },
          {
            title: 'Financial Requests via Email Alone',
            why: 'Any significant financial transaction initiated purely through email — without voice confirmation, purchase order, or established process — should be verified by calling the requester on a known number.',
          },
        ],
        misconceptions: [
          {
            myth: 'Only executives get spear phishing attacks.',
            reality: 'Finance clerks, HR assistants, IT helpdesk staff, and receptionists are frequently targeted because they have access to money, systems, or information without the same level of scrutiny applied to executives.',
          },
        ],
        keyTakeaways: [
          'Spear phishing uses real information about you, making generic red flags invisible.',
          'Reconnaissance from LinkedIn, social media, and public sources fuels personalized attacks.',
          'Verify all financial requests through voice or in-person, never email alone.',
          'Urgency + authority + unavailability is the classic spear phishing formula.',
          'Process compliance (following established verification steps) defeats spear phishing.',
          'Minimizing public OSINT exposure reduces personalization available to attackers.',
        ],
        flashcards: [
          {
            id: 'sp-fc-1',
            front: 'How does spear phishing differ from regular phishing?',
            back: 'Regular phishing is bulk, generic, and targets anyone. Spear phishing is targeted, personalized, and uses real information researched about the specific victim. Personalization makes spear phishing far more convincing and eliminates the generic red flags people are trained to spot.',
          },
          {
            id: 'sp-fc-2',
            front: 'What is OSINT and how do attackers use it for spear phishing?',
            back: 'OSINT (Open Source Intelligence) is information gathered from publicly available sources. Attackers use LinkedIn (job title, colleagues, company), social media (recent events, interests), and company websites (organizational structure) to personalize phishing messages.',
          },
          {
            id: 'sp-fc-3',
            front: 'What is Business Email Compromise (BEC)?',
            back: 'A spear phishing attack targeting organizations where attackers impersonate executives or trusted parties to authorize fraudulent financial transactions. BEC attacks have caused billions in losses globally and often involve no malware — just convincing emails.',
          },
          {
            id: 'sp-fc-4',
            front: 'What is the most reliable way to verify a suspicious financial request?',
            back: 'Call the requester on a previously known phone number (NOT the number in the email). Voice verification through an established, independent channel is the most reliable defense against spear phishing.',
          },
          {
            id: 'sp-fc-5',
            front: 'Why do attackers make the impersonated person "unavailable" in spear phishing?',
            back: 'To prevent the victim from calling or messaging the real person to verify. "I\'m in meetings all day" or "my phone is broken" eliminates the most reliable verification method. Real legitimate urgent requests still allow for some form of verification.',
          },
          {
            id: 'sp-fc-6',
            front: 'What is the role of reconnaissance in spear phishing?',
            back: 'Reconnaissance is the research phase where attackers gather personal information about the target. Better reconnaissance = more personalization = higher success rate. This is why minimizing your public digital footprint reduces spear phishing effectiveness.',
          },
        ],
        quiz: [
          {
            id: 'sp-q-1',
            type: 'multiple_choice',
            question: 'What is the PRIMARY factor that makes spear phishing more dangerous than generic phishing?',
            options: [
              'Spear phishing emails always contain malware',
              'Spear phishing uses personalization with real information, eliminating generic red flags',
              'Spear phishing bypasses all spam filters',
              'Spear phishing only targets executives',
            ],
            correctIndex: 1,
            explanation:
              'Personalization is the key differentiator. When an email mentions your name, your boss\'s name, your company\'s actual projects, and real recent events, the generic red flags (no name, wrong domain, generic greeting) that most training covers become irrelevant. The attack feels legitimate because much of the context IS legitimate — gathered from OSINT.',
          },
          {
            id: 'sp-q-2',
            type: 'scenario',
            scenario:
              'You are an accountant. Your CEO (Anita Desai) sends you an email at 5:30 PM: "Hi [Your Name], I need you to process an urgent wire transfer of ₹8 lakhs to a new vendor before the banks close. I\'m in a board meeting until 8 PM so call me only if absolutely necessary. Here are the account details: [Account number]. Process immediately." You can see Anita\'s profile photo in the email.',
            question: 'What should you do?',
            options: [
              'Process the transfer immediately — Anita is the CEO and it\'s urgent',
              'Process it but send Anita a confirmation email',
              'Do not process. Call Anita on her known mobile number to verify, regardless of the "board meeting" claim',
              'Wait until 8 PM and then process if Anita confirms by email',
            ],
            correctIndex: 2,
            explanation:
              'This is a textbook BEC (Business Email Compromise) / spear phishing attack. The profile photo, name, and timing are all designed to create legitimacy. The "board meeting" excuse is meant to prevent verification. The correct action is ALWAYS to call the requester on a previously known phone number for any significant financial transaction. A legitimate CEO will understand the security protocol. If the verification fails or the "CEO" objects to a call, that is your confirmation it\'s fraudulent.',
          },
          {
            id: 'sp-q-3',
            type: 'true_false',
            question: 'Reducing your LinkedIn profile details and social media public information can reduce your risk from spear phishing.',
            options: ['True', 'False'],
            correctIndex: 0,
            explanation:
              'True. Attackers rely on public OSINT (LinkedIn job titles, colleagues, company details, recent posts) to personalize spear phishing messages. While you don\'t need to delete your profiles, being mindful about what organizational information, colleague names, and project details you share publicly reduces the ammunition available to attackers.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Anatomy of an Attack',
    description: 'Dissect the technical components of phishing — URLs, fake pages, spoofing, and redirects.',
    topics: [
      {
        id: 'inspecting-urls',
        slug: 'inspecting-urls',
        title: 'Inspecting URLs',
        level: 3,
        levelName: 'Anatomy of an Attack',
        difficulty: 'Intermediate',
        estimatedMinutes: 16,
        description: 'Learn to read and analyze URLs to identify malicious or spoofed links.',
        objective:
          'Understand URL structure, identify how attackers manipulate URLs, and be able to analyze any URL to determine if it is suspicious.',
        simpleExplanation:
          'A URL (web address) has several parts. Attackers manipulate specific parts to make fake URLs look real. Learning to read a URL properly — especially the domain portion — is one of the most practical skills you can develop for online safety.',
        technicalExplanation:
          'A URL follows the structure: protocol://subdomain.domain.tld/path?query=params#fragment. The DOMAIN (and TLD) is the authority — everything else is controlled by the domain owner. Attackers exploit: (1) Subdomains — paypal.com.attacker.com (the domain is attacker.com, not paypal.com). (2) Look-alike TLDs — paypal.net, paypal.info instead of paypal.com. (3) Homograph attacks — using visually identical Unicode characters. (4) Hyphenated additions — paypal-secure.com, secure-paypal.com. (5) URL shorteners — hide the real destination. (6) Open redirects — using legitimate domains with redirect parameters to hop to malicious sites. (7) Path confusion — paypal.com.attacker.com/secure/login looks convincingly official.',
        realWorldExample:
          'You receive a link: https://secure.sbibank-verified.com/netbanking/login. At first glance, it looks legitimate. Breaking it down: Protocol: https (encrypted — doesn\'t mean safe), Subdomain: secure, Domain: sbibank-verified.com (NOT sbi.co.in), Path: /netbanking/login. The domain is "sbibank-verified.com" — registered by an attacker. The real SBI domain would be onlinesbi.sbi or sbi.co.in.',
        attackFlow: [
          'Attacker identifies target domain (e.g., paypal.com)',
          'Registers confusable domain (e.g., paypa1.com, paypal-secure.com)',
          'Obtains free SSL certificate for the fake domain',
          'Hosts credential-harvesting page with legitimate-looking path (/login, /secure)',
          'Distributes link via phishing email or SMS',
          'Victim sees HTTPS padlock and familiar-looking URL structure',
          'Enters credentials believing the site is legitimate',
        ],
        redFlags: [
          {
            title: 'The Domain Is Not Who You Think',
            why: 'paypal.com.login-secure.xyz — the actual domain is login-secure.xyz, not paypal.com. The rule: read the domain as the last two parts before the first "/" (excluding the protocol). Everything else is subdomain or path.',
          },
          {
            title: 'Hyphenated or Extended Domain Names',
            why: 'Legitimate companies own their simple brand domain. sbi.co.in is real. sbi-account-verify.com is an attacker\'s domain. Brand names in subdomains or paths are meaningless from a trust perspective.',
          },
          {
            title: 'URL Shorteners for Sensitive Actions',
            why: 'bit.ly/xyz tells you nothing about the destination. For sensitive financial or login actions, never follow a shortened URL. Expand it first using a safe URL expander service.',
          },
        ],
        misconceptions: [
          {
            myth: 'If a URL contains the company name, it\'s the company\'s website.',
            reality: 'Anyone can include any word in a subdomain or path. paypal.com.fake.com contains "paypal.com" but the actual domain is fake.com. Only the domain + TLD (before the first /) is the real authority.',
          },
        ],
        keyTakeaways: [
          'Focus on the DOMAIN — the part between the last // and the first /.',
          'Subdomains (before the domain) can be anything — they don\'t determine ownership.',
          'Paths (after the domain) can be anything — they don\'t determine ownership.',
          'HTTPS means encrypted connection only — not a safe destination.',
          'URL shorteners hide the real destination — always expand before proceeding.',
          'When in doubt, navigate to the official domain by typing it yourself.',
        ],
        flashcards: [
          {
            id: 'iu-fc-1',
            front: 'In the URL "https://secure.paypal.com.attacker.net/login", what is the actual domain?',
            back: 'attacker.net — The domain is the part between the last "//" and the first "/" of the path, specifically reading from the right: the TLD is .net, the domain is attacker. "secure.paypal.com" is a subdomain OF attacker.net. The real PayPal domain is paypal.com.',
          },
          {
            id: 'iu-fc-2',
            front: 'What is a "homograph attack" on URLs?',
            back: 'Using Unicode characters that look identical to ASCII letters to create visually indistinguishable fake domains. Example: аpple.com using Cyrillic "а" instead of Latin "a." The domain looks like apple.com but is a completely different address.',
          },
          {
            id: 'iu-fc-3',
            front: 'What URL structure components should you focus on to determine authenticity?',
            back: 'Focus on: 1) The DOMAIN + TLD (e.g., "hdfc.com" in "www.hdfc.com/netbanking"). 2) Check it matches the official domain. 3) Ignore subdomains and paths when assessing ownership — they can be anything.',
          },
          {
            id: 'iu-fc-4',
            front: 'Why are URL shorteners (bit.ly, tinyurl) dangerous in sensitive contexts?',
            back: 'They completely hide the real destination. You have no way to evaluate the legitimacy of the actual URL before clicking. For any sensitive action (banking, login, payment), never follow shortened URLs.',
          },
        ],
        quiz: [
          {
            id: 'iu-q-1',
            type: 'identify_redflag',
            scenario: 'You receive this link in an SMS: https://login.hdfc.in.secureupdate.com/netbanking',
            question: 'What is the actual domain of this URL?',
            options: [
              'hdfc.in (it\'s the real HDFC website)',
              'secureupdate.com (the actual domain — hdfc.in is just a subdomain)',
              'login.hdfc.in (the subdomain structure makes it HDFC)',
              'netbanking (the path indicates HDFC)',
            ],
            correctIndex: 1,
            explanation:
              'The actual domain is secureupdate.com. Reading from right to left: the TLD is .com, the domain is secureupdate. "login.hdfc.in" is a subdomain of secureupdate.com — it looks like HDFC\'s domain but has no relationship to it. HDFC\'s actual domains are hdfcbank.com and hdfc.com.',
          },
          {
            id: 'iu-q-2',
            type: 'multiple_choice',
            question: 'Which of these URLs would be the legitimate HDFC Bank website?',
            options: [
              'https://hdfc-netbanking-secure.in/login',
              'https://secure.hdfcbank.com/netbanking',
              'https://hdfcbank.com.login-verify.net/secure',
              'https://bit.ly/hdfc-login-2026',
            ],
            correctIndex: 1,
            explanation:
              'secure.hdfcbank.com is a subdomain of hdfcbank.com — the official HDFC Bank domain. Option A: hdfc-netbanking-secure.in is a look-alike domain, not HDFC. Option C: the actual domain is login-verify.net. Option D: a URL shortener — destination unknown.',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Human Psychology',
    description: 'Understand the psychological principles attackers exploit and how to recognize manipulation.',
    topics: [
      {
        id: 'psychology-of-phishing',
        slug: 'psychology-of-phishing',
        title: 'Psychology of Phishing',
        level: 4,
        levelName: 'Human Psychology',
        difficulty: 'Intermediate',
        estimatedMinutes: 20,
        description: 'Deep dive into the 7 psychological principles attackers weaponize in phishing attacks.',
        objective:
          'Understand and recognize the psychological manipulation techniques — authority, urgency, fear, curiosity, greed, trust, and social proof — used in phishing attacks.',
        simpleExplanation:
          'Phishing is fundamentally a psychological attack. Attackers have studied what makes people comply, and they weaponize those principles systematically. Understanding these principles lets you recognize when you\'re being manipulated — even in highly convincing attacks.',
        technicalExplanation:
          'Phishing messages are engineered to exploit documented psychological phenomena. Robert Cialdini\'s Principles of Influence (1984) — authority, reciprocity, commitment, social proof, liking, scarcity — remain foundational to social engineering. Additional mechanisms: loss aversion (fear of losing something is stronger than desire to gain), confirmation bias (we interpret ambiguous information consistent with expectations), and cognitive overload (complex or urgent situations reduce critical thinking capacity). Understanding these as designed manipulations — not random — allows you to pause and engage System 2 thinking.',
        realWorldExample:
          '"Congratulations! You have been selected for the Indian Government\'s Digital India Scholarship worth ₹50,000. This is available only to the first 100 applicants (Scarcity). As a student who has demonstrated academic excellence (Flattery/Liking), you have been pre-approved (Authority). Apply in the next 2 hours to secure your spot (Urgency). Your bank account will be credited within 24 hours. Share your account number and Aadhaar to claim (Action)." — This single message weaponizes 4 psychological principles simultaneously.',
        attackFlow: [
          'Identify target\'s likely psychological vulnerabilities',
          'Select appropriate psychological levers (fear, greed, authority, etc.)',
          'Craft message that activates multiple levers simultaneously',
          'Create pretext that aligns with target\'s expectations',
          'Include a clear, simple action for the target to take',
          'Ensure action bypasses verification habits',
        ],
        redFlags: [
          {
            title: 'Multiple Psychological Triggers Simultaneously',
            why: 'Legitimate messages rarely combine authority + urgency + fear + reward simultaneously. When a message makes you feel scared, excited, pressured, AND grateful all at once — recognize this as engineered manipulation.',
          },
          {
            title: 'Emotional Activation',
            why: 'If reading a message makes you feel urgent, fearful, excited, or grateful before you\'ve verified anything — pause. Strong emotions are the attackers\'s best tools. Your emotional state is the attack vector.',
          },
          {
            title: '"Act Now, Ask Questions Later"',
            why: 'Any request that frames action before verification as the correct order of operations is engineered to exploit impulsive decision-making. Legitimate organizations accept verification delays.',
          },
        ],
        misconceptions: [
          {
            myth: 'If I understand psychological manipulation, I\'m immune to it.',
            reality: 'Knowledge reduces but does not eliminate vulnerability. Our brains\' automatic responses predate conscious analysis — a well-crafted attack can still bypass intellectual awareness. Habits and verification protocols are more reliable than knowledge alone.',
          },
        ],
        keyTakeaways: [
          'Authority, Urgency, Fear, Curiosity, Greed, Trust, and Social Proof are the core psychological levers.',
          'Multiple simultaneous triggers = engineered attack.',
          'Your emotional state (fear, excitement, urgency) is often the attack vector.',
          'Recognize "pause moments" — any strong emotional reaction to a message should trigger verification.',
          'Verification habits protect you when psychological defenses fail.',
          'Attackers design messages based on documented psychological research.',
        ],
        flashcards: [
          {
            id: 'pop-fc-1',
            front: 'What is "Authority Bias" and how do phishers exploit it?',
            back: 'Authority Bias is our tendency to comply with requests from perceived authority figures. Phishers impersonate banks, government agencies, employers, or law enforcement to make requests feel mandatory and legitimate.',
          },
          {
            id: 'pop-fc-2',
            front: 'What is "Loss Aversion" and why is it so effective in phishing?',
            back: 'Loss Aversion is the psychological principle that the pain of losing something is roughly twice as powerful as the pleasure of gaining the same thing. "Your account will be blocked" (loss) is more motivating than "Win a prize" (gain). Attackers use loss aversion constantly.',
          },
          {
            id: 'pop-fc-3',
            front: 'What is the "Scarcity Principle" in social engineering?',
            back: 'Creating a sense of limited availability (time, quantity, or opportunity) to pressure immediate action. "Only 3 spots left," "Offer expires in 2 hours," "First 100 applicants only" — all designed to prevent thoughtful verification.',
          },
          {
            id: 'pop-fc-4',
            front: 'What is "Social Proof" and how is it weaponized in phishing?',
            back: 'Social proof is our tendency to follow what others do, especially in uncertain situations. "10,000 people have already claimed their reward" or "Your friend John shared this" makes the action seem safe and normal.',
          },
          {
            id: 'pop-fc-5',
            front: 'What is your strongest protective habit against psychological manipulation?',
            back: 'Pausing when you feel a strong emotional reaction. Fear, excitement, urgency, or greed triggered by a message should be your cue to slow down, not speed up. Always verify through an independent channel before acting.',
          },
        ],
        quiz: [
          {
            id: 'pop-q-1',
            type: 'identify_redflag',
            scenario: '"URGENT from Income Tax Department: We have detected tax fraud in your Aadhaar-linked account. A warrant for your arrest will be issued in 4 hours unless you pay the settlement amount of ₹25,000 via UPI to avoid legal action. This is your FINAL notice."',
            question: 'Identify which psychological principles this message exploits.',
            options: [
              'Only authority (Income Tax Department)',
              'Only fear (warrant/arrest)',
              'Authority, Fear, Urgency, and Loss Aversion — all simultaneously',
              'Social proof and curiosity',
            ],
            correctIndex: 2,
            explanation:
              'This message weaponizes: Authority (Income Tax Department — a powerful government authority), Fear (arrest warrant — existential threat), Urgency (4 hours — forces immediate action), and Loss Aversion (avoid legal action — framing action as preventing a loss). This is a well-documented "police/tax authority" phone/message scam. The Income Tax Department does not demand UPI payments to avoid arrest. Report to cybercrime.gov.in.',
          },
          {
            id: 'pop-q-2',
            type: 'multiple_choice',
            question: 'You receive an email with the subject "URGENT: Your account will be suspended." You feel immediately anxious and start to click the link. What should this emotional reaction signal to you?',
            options: [
              'Act immediately because the urgency means it\'s real',
              'Pause — this emotional reaction is exactly what attackers engineer. Verify independently.',
              'The urgency proves it\'s from your actual service provider',
              'Forward to IT immediately without reading further',
            ],
            correctIndex: 1,
            explanation:
              'Your emotional reaction (anxiety, urgency) IS the attack. Phishers engineer messages specifically to trigger these feelings because emotional arousal reduces analytical thinking. When you feel suddenly urgent, anxious, or excited about a message — that\'s your signal to SLOW DOWN and verify independently, not to act immediately.',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Detection & Verification',
    description: 'Develop practical skills to detect, analyze, and verify suspicious communications.',
    topics: [
      {
        id: 'message-red-flags',
        slug: 'message-red-flags',
        title: 'Message Red Flags',
        level: 5,
        levelName: 'Detection & Verification',
        difficulty: 'Beginner',
        estimatedMinutes: 14,
        description: 'A comprehensive guide to identifying warning signs in suspicious messages.',
        objective:
          'Develop a systematic mental checklist of red flags to evaluate any suspicious email, SMS, or message.',
        simpleExplanation:
          'Phishing messages share common characteristics. Learning these patterns creates a mental checklist you can apply to any suspicious communication — whether email, SMS, WhatsApp, or social media.',
        technicalExplanation:
          'Message-level red flag analysis is the most practical first-line defense against phishing. Key indicators span multiple dimensions: sender analysis (domain mismatch, display name ≠ actual address), content analysis (generic greeting, urgency language, grammar anomalies, logo inconsistencies), link analysis (mismatched URLs, shortened links, HTTP rather than HTTPS), attachment analysis (unexpected files, risky extensions), and request analysis (credential requests, payment requests, unusual process bypass). No single red flag guarantees phishing — but multiple concurrent indicators significantly increase the probability.',
        realWorldExample:
          'Analyzing a real phishing email systematically: "From: PayPal Security <secure@paypal-account-update.co>" — Sender red flag. "Subject: ⚠️ URGENT: Unusual Activity Detected!" — Urgency red flag. "Dear Account Holder," — Generic greeting. "We have detected suspicious login from Russia." — Fear trigger. "Verify now: [paypal.com/verify]" — Link text misleading (actual URL hidden). "Failure to verify in 24 hours will result in permanent account suspension." — Threat/loss aversion. Five distinct red flags in one email.',
        attackFlow: [
          'Attacker constructs message with multiple psychological triggers',
          'Designs sender information to appear legitimate at first glance',
          'Crafts body with urgency, authority, and fear elements',
          'Embeds links with misleading display text',
          'Sends in bulk or to targeted individual',
        ],
        redFlags: [
          {
            title: 'Sender Domain Mismatch',
            why: 'The most reliable technical indicator. The display name can say anything — the actual email domain reveals the true sender.',
          },
          {
            title: 'Generic Greeting',
            why: 'Services that have your account data always address you by name. "Dear Customer," "Dear User," or "Dear Account Holder" signals a mass campaign without your personal information.',
          },
          {
            title: 'Urgency and Threats',
            why: 'Artificial time pressure ("24 hours," "immediately," "or else") is designed to prevent verification. Legitimate organizations provide reasonable timeframes.',
          },
          {
            title: 'Grammar and Spelling Errors',
            why: 'Professional organizations have editorial standards. While advanced attacks have perfect grammar, obvious errors are a quick filter for lower-quality phishing.',
          },
          {
            title: 'Requests for Sensitive Information',
            why: 'Banks, governments, and legitimate services NEVER ask for passwords, PINs, OTPs, or full card numbers via email or SMS.',
          },
          {
            title: 'Unexpected Attachments',
            why: 'Any attachment you didn\'t request or expect — even from a known contact — could be malicious. Verify before opening.',
          },
        ],
        misconceptions: [
          {
            myth: 'I can always detect phishing by its bad grammar.',
            reality: 'Modern AI tools help attackers generate grammatically perfect, well-styled phishing emails. Grammar alone is not a reliable detector — focus on sender domain, links, and the nature of the request.',
          },
        ],
        keyTakeaways: [
          'Check the sender domain first — it\'s the most reliable technical indicator.',
          'Generic greetings, urgency, and threats are the most common content red flags.',
          'Never trust linked text — always verify the actual URL destination.',
          'Legitimate organizations never ask for OTPs, passwords, or PINs by message.',
          'Multiple concurrent red flags dramatically increase the probability of phishing.',
          'When multiple red flags are present, verify independently before any action.',
        ],
        flashcards: [
          {
            id: 'mrf-fc-1',
            front: 'Name 5 common red flags in phishing messages.',
            back: '1. Sender domain mismatch (display name ≠ actual domain)\n2. Generic greeting ("Dear Customer")\n3. Urgency/threats ("24 hours," "suspended")\n4. Mismatched or suspicious URLs (hover to verify)\n5. Request for passwords/OTPs/PINs',
          },
          {
            id: 'mrf-fc-2',
            front: 'Why is grammar checking an unreliable primary indicator of phishing?',
            back: 'AI tools help modern attackers generate grammatically perfect phishing emails. While obvious errors are a quick filter, sophisticated attacks have flawless grammar. Rely on sender domain, URL inspection, and the nature of the request as more reliable indicators.',
          },
          {
            id: 'mrf-fc-3',
            front: 'What is the "hover test" for email links?',
            back: 'Hovering your mouse over a link (without clicking) reveals the actual URL the link points to in the browser\'s status bar. If the actual URL differs from what the link text shows, it\'s a major red flag.',
          },
        ],
        quiz: [
          {
            id: 'mrf-q-1',
            type: 'identify_redflag',
            scenario:
              'From: Amazon Customer Service <noreply@amazon-order-verify.com>\nSubject: Your order has been flagged\nDear Valued Customer,\nWe have detected suspicious activity on your Amazon account. Your order #AM-3928 has been flagged for verification. Click below to verify your identity and prevent account suspension within 12 hours.\n[Verify Now]\nAmazon Security Team',
            question: 'How many distinct red flags can you identify?',
            options: [
              '1 — just the urgent subject line',
              '2 — urgency and generic greeting',
              '4 or more — sender domain, generic greeting, urgency/threat, suspicious link destination',
              'None — this looks like a real Amazon email',
            ],
            correctIndex: 2,
            explanation:
              'There are at least 4 red flags: (1) Sender domain: amazon-order-verify.com is NOT amazon.in or amazon.com. (2) Generic greeting: "Dear Valued Customer" — Amazon knows your name. (3) Urgency + threat: "within 12 hours" + "account suspension." (4) Request to click a link for "identity verification" — Amazon uses in-app verification, not external links in emails. When 4+ red flags appear together, the probability of phishing is extremely high.',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Real-World Scenarios',
    description: 'Apply your knowledge to realistic, India-specific phishing scenarios.',
    topics: [
      {
        id: 'upi-scams',
        slug: 'upi-scams',
        title: 'UPI & Banking Scams',
        level: 6,
        levelName: 'Real-World Scenarios',
        difficulty: 'Beginner',
        estimatedMinutes: 16,
        description: 'India-specific UPI scams, bank phishing, and how to protect your accounts.',
        objective:
          'Understand the most common India-specific financial phishing scams — UPI reversal fraud, OTP sharing, KYC update scams — and how to protect yourself.',
        simpleExplanation:
          'India has some of the world\'s highest rates of UPI usage, making UPI-based scams extremely common. Attackers exploit the PIN-to-pay model, the urgency of financial transactions, and the fear of account suspension to steal money directly.',
        technicalExplanation:
          'UPI (Unified Payments Interface) scams exploit misunderstanding of the payment flow. Key attack vectors: (1) Collect requests — attacker sends a UPI collect/payment request, victim enters PIN thinking they\'re "receiving" money, but actually sending it. (2) Screen sharing — victim is convinced to install a screen-sharing app (AnyDesk, TeamViewer) under the pretext of "technical support," attacker then captures OTPs in real time. (3) SIM swap — attacker impersonates the victim to their mobile carrier to get the victim\'s number transferred to the attacker\'s SIM, then controls all OTPs. (4) Fake KYC — victim is directed to a fake bank website to "update KYC" and surrenders full credentials.',
        realWorldExample:
          'Vikram wants to sell his bicycle on OLX. A "buyer" calls: "I\'ll pay ₹8,000 via UPI. Let me send you ₹1 to verify your UPI ID works." Vikram receives a collect request notification on his UPI app. The caller says "Enter your PIN to confirm receipt." Vikram enters his PIN — and ₹8,000 is deducted from his account, not added. The "collect request" was a payment request, not a credit.',
        attackFlow: [
          'Attacker contacts victim under a plausible pretext (buyer, bank, refund)',
          'Sends UPI collect request (payment TO attacker)',
          'Tells victim "enter your PIN to receive the money"',
          'Victim enters PIN, authorizing the payment',
          'Money transferred to attacker immediately',
          'Attacker disconnects and becomes unreachable',
        ],
        redFlags: [
          {
            title: 'Asked to Enter PIN to "Receive" Money',
            why: 'This is the most common UPI scam misunderstanding. You NEVER enter your PIN to receive money. Your PIN is ONLY for authorizing outgoing payments. If someone tells you to enter your PIN to receive, they are stealing from you.',
          },
          {
            title: 'Buyer/Refund Caller Sends UPI Request',
            why: 'Legitimate payments don\'t require the receiver to do anything beyond sharing their UPI ID. Any additional action — especially PIN entry via a notification — should raise immediate suspicion.',
          },
          {
            title: '"Install This App for Easy Payment"',
            why: 'Requests to install apps like AnyDesk, TeamViewer, or "bank support apps" are used to enable screen sharing, through which attackers capture OTPs and credentials in real time.',
          },
        ],
        misconceptions: [
          {
            myth: 'If someone is sending me money, I can\'t lose anything.',
            reality: 'UPI collect requests look identical to payment confirmations. Entering your PIN on a collect request sends money OUT of your account, not into it. The interface can look identical.',
          },
        ],
        keyTakeaways: [
          'You NEVER need your UPI PIN to receive money.',
          'PIN entry always authorizes an outgoing payment — verify the direction first.',
          'Never install screen-sharing apps at the request of an unknown caller.',
          'KYC updates are done through your bank\'s official app, never via phone or link.',
          'OTPs are for your eyes only — no bank, government, or company will ever ask for them.',
          'If you receive an unexpected UPI request while on a call with a stranger, hang up.',
        ],
        flashcards: [
          {
            id: 'upi-fc-1',
            front: 'When do you enter your UPI PIN?',
            back: 'ONLY when you are initiating an outgoing payment or transfer. NEVER to receive money. NEVER to verify your account. NEVER to confirm your UPI ID.',
          },
          {
            id: 'upi-fc-2',
            front: 'What is a "UPI collect request" scam?',
            back: 'The attacker sends a UPI payment request (which looks like a notification) to the victim. The victim is told it\'s for "receiving" money and enters their PIN. But entering the PIN actually authorizes a payment FROM the victim TO the attacker.',
          },
          {
            id: 'upi-fc-3',
            front: 'Why is screen-sharing app installation dangerous during a call with a stranger?',
            back: 'Screen-sharing apps (AnyDesk, TeamViewer) give the remote person full visibility of your screen. They can see OTPs as they arrive, capture banking credentials, and perform transactions on your behalf in real time.',
          },
          {
            id: 'upi-fc-4',
            front: 'What is a SIM swap fraud?',
            back: 'An attacker impersonates the victim to their mobile carrier (with stolen personal information) to get the victim\'s phone number transferred to a new SIM. This gives the attacker control of all OTPs sent to that number.',
          },
        ],
        quiz: [
          {
            id: 'upi-q-1',
            type: 'scenario',
            scenario:
              'You listed your old laptop for ₹15,000 on an online marketplace. A buyer calls and says "I\'m ready to transfer the money. I\'ll send ₹1 first to confirm your UPI. Please enter your PIN when the notification arrives to confirm your number is working." A UPI notification appears on your phone.',
            question: 'What should you do?',
            options: [
              'Enter your PIN — you\'re just confirming your UPI ID',
              'Do NOT enter your PIN. This is the "collect request" scam. Close the notification and report the caller.',
              'Enter your PIN but only for the ₹1 — it\'s a small amount',
              'Ask the buyer to use NEFT instead',
            ],
            correctIndex: 1,
            explanation:
              'This is the classic OLX/marketplace UPI scam. The "notification" is a UPI collect request — if you enter your PIN, you\'ll be authorizing a payment FROM your account to the attacker\'s account. You NEVER need to enter your PIN to receive money. To receive UPI payment, you just share your UPI ID/QR code. Hang up, reject the collect request, and report the incident.',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Protection & Hygiene',
    description: 'Build lasting digital security habits — passwords, MFA, safe browsing, and more.',
    topics: [
      {
        id: 'mfa-2fa',
        slug: 'mfa-2fa',
        title: 'MFA & Two-Factor Authentication',
        level: 7,
        levelName: 'Protection & Hygiene',
        difficulty: 'Beginner',
        estimatedMinutes: 14,
        description: 'Understand MFA, how it protects you, and why it\'s your most important security layer.',
        objective:
          'Understand what MFA/2FA is, why it dramatically reduces phishing risk, how different MFA methods compare in security, and how to enable it on your accounts.',
        simpleExplanation:
          'Multi-Factor Authentication (MFA) means that even if someone steals your password, they can\'t log in without a second verification — like a code from your phone or a fingerprint. It\'s the single most effective step you can take to protect your accounts.',
        technicalExplanation:
          'MFA adds authentication factors beyond the password. Factors are: Something you KNOW (password, PIN), Something you HAVE (authenticator app, hardware key, phone), Something you ARE (biometrics — fingerprint, face). MFA types ranked by security: Hardware keys (FIDO2/WebAuthn — most secure, phishing-resistant), Authenticator apps (TOTP like Google Authenticator — strong, not phishing-resistant if you approve on a fake site), SMS OTP (weakest MFA — vulnerable to SIM swap and SS7 attacks), Email OTP (slightly more secure than SMS). Even SMS OTP, while imperfect, dramatically reduces account compromise risk compared to password-only.',
        realWorldExample:
          'Priya\'s password for her Gmail is stolen in a data breach. The attacker tries to log in. Without MFA: account is immediately compromised. With Google Authenticator (TOTP): the attacker is stopped at the second-factor screen — they don\'t have her phone, so they can\'t generate the 6-digit code. Her account is safe despite the stolen password.',
        attackFlow: [
          'Attacker obtains password (phishing, data breach, or guessing)',
          'Attempts login to the account',
          'Without MFA: instant access',
          'With MFA: blocked at second factor',
          'Attacker may attempt to bypass MFA (SIM swap for SMS, or real-time phishing for TOTP)',
          'Hardware keys are completely phishing-resistant — cannot be bypassed remotely',
        ],
        redFlags: [
          {
            title: 'Someone Asks for Your OTP',
            why: 'OTPs generated by authenticator apps or sent via SMS are personal verification codes. No bank, company, or government agency will EVER ask you to share your OTP. If someone calls and asks for it, hang up.',
          },
          {
            title: 'Unexpected MFA Request',
            why: 'If you receive an MFA prompt without initiating a login, someone else has your password and is trying to access your account. Do not approve the request — change your password immediately.',
          },
        ],
        misconceptions: [
          {
            myth: 'My password is strong, so I don\'t need MFA.',
            reality: 'Even the strongest passwords can be stolen via phishing, data breaches, or keyloggers. The victim\'s password strength is irrelevant when it\'s captured on a fake website. MFA protects you when your password is compromised — which is a "when," not an "if."',
          },
        ],
        keyTakeaways: [
          'MFA is your most important security layer after your password.',
          'Even weak MFA (SMS OTP) dramatically reduces account compromise risk.',
          'TOTP authenticator apps are significantly more secure than SMS OTP.',
          'Hardware keys (YubiKey) are completely phishing-resistant.',
          'NEVER share your OTP, authenticator code, or approve unexpected MFA prompts.',
          'Enable MFA on every account that supports it — starting with email, banking, and social media.',
        ],
        flashcards: [
          {
            id: 'mfa-fc-1',
            front: 'What is Multi-Factor Authentication (MFA)?',
            back: 'Adding a second (or third) verification step beyond your password. Even if an attacker has your password, they cannot access your account without the additional factor (e.g., a code from your authenticator app or your fingerprint).',
          },
          {
            id: 'mfa-fc-2',
            front: 'Rank MFA methods from most to least secure.',
            back: '1. Hardware security keys (FIDO2/YubiKey) — phishing-resistant\n2. Authenticator apps (Google Authenticator, Authy) — TOTP codes\n3. SMS OTP — vulnerable to SIM swap\n4. Email OTP — similar vulnerabilities to SMS\n5. No MFA — least secure',
          },
          {
            id: 'mfa-fc-3',
            front: 'Why should you NEVER approve an unexpected MFA prompt?',
            back: 'An unexpected MFA prompt means someone else has your password and is attempting to log in. Approving it grants them access. If you receive an unexpected MFA request, reject it and immediately change your password.',
          },
          {
            id: 'mfa-fc-4',
            front: 'What is an "MFA fatigue" or "MFA bombing" attack?',
            back: 'An attacker with your password repeatedly sends MFA approval requests to your phone, hoping you\'ll eventually approve one out of frustration or confusion. Never approve unexpected MFA prompts, regardless of how many arrive.',
          },
        ],
        quiz: [
          {
            id: 'mfa-q-1',
            type: 'true_false',
            question: 'You receive a phone call from someone claiming to be from your bank. They say they need your SMS OTP to "verify your identity" before updating your account. You should provide it.',
            options: ['True', 'False'],
            correctIndex: 1,
            explanation:
              'False. Banks NEVER call and ask for your OTP. OTPs are one-time codes meant to verify that YOU are performing an action — not to identify you to someone else. When you share an OTP, you are authorizing whatever transaction the attacker initiated. Hang up and call your bank using the number on the back of your card.',
          },
          {
            id: 'mfa-q-2',
            type: 'multiple_choice',
            question: 'You wake up and find 8 MFA approval notifications on your phone for your Google account. You did not attempt to login. What should you do?',
            options: [
              'Approve one to see what\'s happening',
              'Ignore them — it\'s probably a glitch',
              'Reject ALL prompts immediately, then change your Google password NOW',
              'Turn off MFA to stop the notifications',
            ],
            correctIndex: 2,
            explanation:
              'This is an MFA bombing/fatigue attack. Someone has your Google password and is flooding you with approval requests hoping you\'ll accidentally or frustratedly approve one. Reject ALL prompts immediately and change your password as soon as possible. Turning off MFA would make it worse — the attacker would then have unimpeded access with just your password.',
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Incident Response',
    description: 'Know exactly what to do when you\'ve been phished — step-by-step recovery.',
    topics: [
      {
        id: 'after-clicking',
        slug: 'after-clicking',
        title: 'What To Do After Clicking a Phishing Link',
        level: 8,
        levelName: 'Incident Response',
        difficulty: 'Beginner',
        estimatedMinutes: 12,
        description: 'Immediate steps to take if you accidentally clicked a phishing link.',
        objective:
          'Know the exact steps to take immediately after clicking a phishing link — to minimize damage and recover your accounts.',
        simpleExplanation:
          'Clicking a phishing link doesn\'t mean it\'s over. How quickly and correctly you respond determines the extent of the damage. There are clear steps to follow — and acting fast matters.',
        technicalExplanation:
          'After clicking a phishing link, the risk level depends on what happened: (1) Click only — risk of drive-by download malware, but often minimal if browser/OS is patched. (2) Credentials entered — account is likely compromised; immediate password change required. (3) OTP shared — transaction may have been executed; contact bank immediately. (4) App installed — device may be compromised; factory reset may be required. Response actions: disconnect from network (prevent data exfiltration), run malware scan, change passwords from a clean device, enable MFA on affected accounts, review recent account activity, report to relevant authorities.',
        realWorldExample:
          'Arjun clicked a link in a phishing email and entered his Gmail password. Within an hour, his Google account is sending spam emails and his Google Drive files are being accessed. If he had acted immediately after realizing — changed his password, revoked active sessions, enabled 2FA — the attacker\'s access would have been cut off within minutes.',
        attackFlow: [
          'Victim clicks phishing link',
          'Lands on credential-harvesting page',
          'Enters credentials',
          'Credentials immediately tested on real service',
          'Attacker gains access, changes recovery email/phone',
          'Account locked out, data exfiltrated',
          'Lateral movement to other accounts using same password',
        ],
        redFlags: [],
        misconceptions: [
          {
            myth: 'If I just clicked the link but didn\'t enter anything, I\'m safe.',
            reality: 'Sometimes. Some phishing sites attempt drive-by malware installation through browser exploits. While less common with updated browsers, "just clicking" is not always risk-free. Run a malware scan and check for unexpected installed software.',
          },
        ],
        keyTakeaways: [
          'Act immediately — speed matters in limiting damage.',
          'If credentials were entered: change the password from a DIFFERENT device first.',
          'Revoke all active sessions after changing the password.',
          'If OTP was shared: call your bank immediately — do not wait.',
          'Enable MFA on the compromised account after securing it.',
          'Check all connected accounts and apps using the same password.',
          'Report to cybercrime.gov.in and the impersonated organization.',
        ],
        flashcards: [
          {
            id: 'ac-fc-1',
            front: 'What is the FIRST thing to do if you entered your password on a phishing site?',
            back: 'Change the password on the real account immediately — from a different, trusted device if possible. Then revoke all active sessions in the account\'s security settings.',
          },
          {
            id: 'ac-fc-2',
            front: 'Why should you change your password from a DIFFERENT device after a phishing incident?',
            back: 'If you clicked a malicious link, your current device may be compromised with malware that could capture your new password as you type it. Using a separate, clean device ensures the attacker doesn\'t intercept your recovery.',
          },
          {
            id: 'ac-fc-3',
            front: 'What should you do if you shared an OTP with a scammer?',
            back: 'Call your bank immediately using the number on the back of your card. Do not use any link or number from the scammer\'s message. Report the transaction and request a block/reversal if possible.',
          },
          {
            id: 'ac-fc-4',
            front: 'What does "revoking active sessions" mean and why is it important after a phishing incident?',
            back: 'Most accounts (Google, Facebook, etc.) let you see and terminate all active login sessions. Revoking sessions signs out the attacker even if they\'re currently using your account — forcing them to re-authenticate, which they can\'t without your new password + MFA.',
          },
        ],
        quiz: [
          {
            id: 'ac-q-1',
            type: 'multiple_choice',
            question: 'You entered your email password on a phishing site. What is the MOST URGENT first step?',
            options: [
              'Tell your friends on social media to be careful',
              'Change the password of your email account immediately from a trusted device',
              'Run a virus scan on your computer',
              'Report to cybercrime.gov.in',
            ],
            correctIndex: 1,
            explanation:
              'Changing the password immediately is the most urgent step. Every minute of delay is time the attacker has unimpeded access to your account. Use a different, trusted device if possible. After changing the password, revoke all active sessions. Then run a malware scan, check other accounts, and report — but the password change is the critical first action.',
          },
        ],
      },
      {
        id: 'reporting-and-recovery',
        slug: 'reporting-and-recovery',
        title: 'Reporting and Long-Term Recovery',
        level: 8,
        levelName: 'Incident Response',
        difficulty: 'Intermediate',
        estimatedMinutes: 10,
        description: 'How to properly report a scam to authorities and protect yourself long-term after an incident.',
        objective: 'Learn the correct channels to report cyber fraud in India and understand the long-term steps to secure your identity.',
        simpleExplanation: 'Reporting a scam isn\'t just about trying to get your money back — it helps authorities track down networks and prevents others from being victimized. It also provides you with an official record if your identity was stolen.',
        technicalExplanation: 'In India, the primary reporting mechanism is the National Cyber Crime Reporting Portal (cybercrime.gov.in) and the 1930 helpline. For financial fraud, the "Golden Hour" reporting principle applies — reporting within 24 hours significantly increases the chance of freezing the fraudulent transaction through the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS).',
        realWorldExample: 'Neha lost ₹20,000 in a UPI scam. She called 1930 within 30 minutes. The system tracked the money to a secondary account and froze it before the scammer could withdraw it via ATM. She eventually got her money back.',
        attackFlow: [
          'Victim realizes they have been scammed',
          'Victim calls 1930 immediately (Golden Hour)',
          '1930 operator registers the complaint on CFCFRMS',
          'System alerts the destination bank/wallet',
          'Destination bank freezes the disputed amount',
          'Formal complaint filed on cybercrime.gov.in'
        ],
        redFlags: [],
        misconceptions: [
          {
            myth: 'Reporting cybercrime means I have to go to a police station and deal with harassment.',
            reality: 'The 1930 helpline and cybercrime.gov.in portal allow you to report financial fraud entirely online or over the phone from your home.'
          }
        ],
        keyTakeaways: [
          'Call 1930 immediately for any financial cyber fraud.',
          'Report all other cybercrimes at cybercrime.gov.in.',
          'Save all evidence (screenshots, transaction IDs, phone numbers) before blocking the scammer.',
          'Alert your bank independently in addition to calling 1930.',
        ],
        flashcards: [
          { id: 'rr-fc-1', front: 'What is the national helpline number for reporting cyber fraud in India?', back: '1930' }
        ],
        quiz: [
          {
            id: 'rr-q-1',
            type: 'multiple_choice',
            question: 'What is the best immediate action after realizing you have been financially scammed online?',
            options: ['Wait and see if the money comes back', 'Call 1930 immediately', 'Post about it on social media', 'Go to the local police station the next day'],
            correctIndex: 1,
            explanation: 'Calling 1930 immediately gives you the best chance of freezing the funds before the scammer withdraws them.'
          }
        ]
      }
    ],
  },
  {
    id: 9,
    name: 'Advanced Threats',
    description: 'Learn about the cutting edge of phishing, including AI-generated deepfakes.',
    topics: [
      {
        id: 'ai-deepfakes',
        slug: 'ai-deepfakes',
        title: 'AI and Voice Deepfakes',
        level: 9,
        levelName: 'Advanced Threats',
        difficulty: 'Advanced',
        estimatedMinutes: 15,
        description: 'How attackers use artificial intelligence to clone voices and faces.',
        objective: 'Understand how AI deepfakes work and how to establish verification methods with your family and company.',
        simpleExplanation: 'Attackers can now take a 3-second audio clip of your voice from a YouTube video or social media post and use AI to make it say anything they want. They call your family, sounding exactly like you, claiming to be in an emergency and needing money.',
        technicalExplanation: 'Voice cloning (audio deepfakes) utilizes deep learning models (like VALL-E or ElevenLabs) to synthesize speech that preserves the speaker\'s timbre, emotion, and acoustic environment, requiring as little as 3 seconds of reference audio. This elevates vishing from generic impersonation to hyper-targeted, biometric spoofing.',
        realWorldExample: 'A mother receives a phone call from an unknown number. She hears her daughter\'s exact voice crying, saying she was in an accident and the hospital needs a deposit immediately. It was a scammer using an AI clone of the daughter\'s voice from her public TikTok videos.',
        attackFlow: [
          'Attacker scrapes target\'s voice from social media',
          'Attacker trains an AI model on the voice sample',
          'Attacker calls the target\'s family member',
          'AI generates speech in real-time or pre-recorded',
          'Family member sends money out of panic'
        ],
        redFlags: [
          { title: 'The "Emergency" Call from an Unknown Number', why: 'Even if it sounds like them, if they are calling from a different number and asking for money, it is highly suspicious.' }
        ],
        misconceptions: [
          { myth: 'I would definitely be able to tell if it was an AI mimicking my child.', reality: 'Modern AI voice cloning is indistinguishable from the real person over a phone connection, complete with background noise and emotion.' }
        ],
        keyTakeaways: [
          'Establish a "safeword" with your family for emergencies.',
          'If someone calls with an emergency, hang up and call their actual number.',
          'Limit the amount of public audio/video of yourself online.'
        ],
        flashcards: [
          { id: 'ai-fc-1', front: 'How much audio does an AI need to clone a voice?', back: 'As little as 3 seconds of clear audio.' }
        ],
        quiz: [
          {
            id: 'ai-q-1',
            type: 'multiple_choice',
            question: 'Your son calls from an unknown number, sounding panicked, asking for money. What should you do?',
            options: ['Send the money immediately', 'Ask him for the family safeword or call his actual number', 'Tell him to call the police', 'Ask him his birth date'],
            correctIndex: 1,
            explanation: 'Asking for a pre-arranged safeword or hanging up to call their known number are the best defenses against AI voice cloning.'
          }
        ]
      }
    ]
  },
]

export function getTopicById(id: string): Topic | undefined {
  for (const level of curriculum) {
    const topic = level.topics.find((t) => t.id === id)
    if (topic) return topic
  }
  return undefined
}

export function getTopicBySlug(slug: string): Topic | undefined {
  for (const level of curriculum) {
    const topic = level.topics.find((t) => t.slug === slug)
    if (topic) return topic
  }
  return undefined
}

export function getAllTopics(): Topic[] {
  return curriculum.flatMap((level) => level.topics)
}

export function getNextTopic(currentTopicId: string): Topic | undefined {
  const allTopics = getAllTopics()
  const currentIndex = allTopics.findIndex((t) => t.id === currentTopicId)
  if (currentIndex >= 0 && currentIndex < allTopics.length - 1) {
    return allTopics[currentIndex + 1]
  }
  return undefined
}

export function getPreviousTopic(currentTopicId: string): Topic | undefined {
  const allTopics = getAllTopics()
  const currentIndex = allTopics.findIndex((t) => t.id === currentTopicId)
  if (currentIndex > 0) {
    return allTopics[currentIndex - 1]
  }
  return undefined
}

export const totalTopicsCount = curriculum.reduce((acc, level) => acc + level.topics.length, 0)
