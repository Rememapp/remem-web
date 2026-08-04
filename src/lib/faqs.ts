export interface Faq {
    question: string
    answer: string
}

export const faqs: Faq[] = [
    {
        question: 'What is Remem?',
        answer: 'Remem is a browser extension that acts as a private memory for your information. You fill in your details once — employment history, education, addresses, documents — and Remem helps you reuse them on any web form. Your data stays on your device, and you review everything before it is filled.',
    },
    {
        question: 'How is this different from browser autofill?',
        answer: 'Browser autofill matches a handful of fixed fields like name and credit card, and breaks on anything unusual. Remem understands whole forms — multi-step job applications, government portals, university admissions — and knows that “Given name” and “Legal first name” are the same question. It also handles open-ended questions, which autofill cannot touch.',
    },
    {
        question: 'Is this an AI autofill extension?',
        answer: 'No. Deterministic fields — your name, email, address, dates — are filled with deterministic logic from your stored profile, exactly as you saved them. AI is used only for genuinely open-ended writing, like a cover letter or a motivation answer, and you review every word before it goes anywhere.',
    },
    {
        question: 'Does it use AI at all?',
        answer: 'Yes, narrowly. AI drafts answers to open-ended questions — cover letters, essays, statements of purpose — using the context you have stored. It never decides what your address is, and it never acts without you asking.',
    },
    {
        question: 'Where is my data stored?',
        answer: 'On your device, encrypted. Remem is local-first: your memory lives in your browser’s storage on your machine. Nothing is uploaded unless you explicitly enable encrypted cloud backup.',
    },
    {
        question: 'Will it auto-submit forms?',
        answer: 'Never. Remem fills fields only when you trigger it, shows you exactly what it plans to fill first, and always leaves the submit button to you. This is a hard rule, not a setting.',
    },
    {
        question: 'Can I export my data?',
        answer: 'Yes, anytime, in a standard readable format. Your data is yours — export it, inspect it, move it somewhere else. There is no lock-in.',
    },
    {
        question: 'Can I import existing data?',
        answer: 'Yes. You can import a previous Remem export, and you can seed your memory quickly by uploading documents like your CV — Remem extracts the facts and shows you each one for confirmation before saving.',
    },
    {
        question: 'Can I delete everything?',
        answer: 'Yes, in one action. Because your data lives on your device, deleting it actually deletes it — there is no server copy to chase down. If you enabled cloud backup, that encrypted copy is deleted too.',
    },
    {
        question: 'Is cloud sync required?',
        answer: 'No. Remem is fully functional without any account or cloud connection. Encrypted cloud backup is optional, off by default, and end-to-end encrypted so we cannot read what you back up.',
    },
    {
        question: 'Does it work offline?',
        answer: 'Filling forms from your stored memory works offline, because your memory is local. Only the AI writing assistant needs a connection, since drafting runs on our API — without ever storing your memory server-side.',
    },
    {
        question: 'Can I use multiple profiles?',
        answer: 'Yes. Keep separate profiles — for example one per career track, or personal versus business details — and choose which one a form should draw from.',
    },
    {
        question: 'What forms does it work on?',
        answer: 'Any standard web form. It is built to shine on the long, repetitive ones: ATS platforms like Greenhouse, Lever, Workday, and Ashby, government and visa forms, university applications, insurance, healthcare intake, and SaaS onboarding.',
    },
    {
        question: 'Which browsers are supported?',
        answer: 'Chrome, Edge, Brave, and Arc — anything Chromium-based — at launch. Firefox and Safari are on the roadmap.',
    },
    {
        question: 'Do you sell my data?',
        answer: 'No, and structurally we could not: your data is on your device, not on our servers. Our business model is a paid product, not your information.',
    },
    {
        question: 'Does Remem see the forms I fill?',
        answer: 'Form matching happens locally in your browser. Pages are never uploaded automatically. The only data that leaves your device is the context you choose to send when you ask the AI to draft an open-ended answer — and it is not persisted.',
    },
    {
        question: 'Is Remem open source?',
        answer: 'The extension is open source, so you can verify that the privacy claims are real by reading the code. The hosted AI API is the closed-source part.',
    },
    {
        question: 'What does it cost?',
        answer: 'The core local memory and form filling will be free. AI writing will be part of a paid plan. Waitlist members get early access and launch pricing.',
    },
]
