export interface Faq {
    question: string
    answer: string
}

export const faqs: Faq[] = [
    {
        question: 'What is Remem?',
        answer: "Remem is a local-first browser memory that remembers information you've already shared, so you never have to repeat yourself. Fill your profile once, review suggestions, and reuse your information across forms, applications, and websites. Your data stays on your device.",
    },
    {
        question: 'How do I get Remem?',
        answer: "Install it from the Chrome Web Store — it's free and takes under a minute. It also works in other Chromium browsers like Edge, Brave, and Arc.",
    },
    {
        question: 'How is this different from browser autofill?',
        answer: 'Browser autofill only fills fixed fields like your name, email, or address. Remem understands entire forms, matches equivalent questions across different websites, remembers long-form answers, and helps complete complex applications—not just simple inputs.',
    },
    {
        question: 'Is this an AI autofill extension?',
        answer: 'No. Remem is a browser memory first, not an AI autofill tool. Your saved information fills deterministic fields like your name, email, and address using local logic. AI is used for open-ended writing and, when needed, to understand complex or ambiguous form fields',
    },
    {
        question: 'Does it use AI at all?',
        answer: 'Yes—but only where it makes sense. AI helps draft answers for questions like "Tell us about yourself," cover letters, or statements of purpose. It never decides factual information or fills forms without your approval.',
    },
    {
        question: 'Where is my data stored?',
        answer: 'Your data is stored locally on your device by default. If you enable cloud backup, everything is encrypted before being uploaded to your own Google Drive and not on our servers.',
    },
    {
        question: 'Will it auto-submit forms?',
        answer: 'Never. Remem only fills fields after you trigger it, lets you review every suggestion, and never clicks the submit button. You stay in complete control.',
    },
    {
        question: 'Can I back up my data?',
        answer: 'Yes. You can securely back up your entire memory to your own Google Drive. Every backup is encrypted before it leaves your device, remains under your control, and can be restored on another device using Remem.',
    },
    {
        question: 'Can I import existing data?',
        answer: "Yes. You can restore your encrypted backup from Google Drive or quickly build your memory by importing documents like your resume or CV. Every extracted detail is reviewed and confirmed before it's saved.",
    },
    {
        question: 'Can I delete everything?',
        answer: 'Yes. You can permanently delete all local data with a single action. If you enabled cloud backup, you can also remove the encrypted backup stored in your own Google Drive.',
    },
    {
        question: 'Is signing in required?',
        answer: 'No. You can use Remem in guest mode for core features like storing your basic profile and filling common form fields such as your name, address, work experience, education, and skills. Sign in with your Google account to unlock your complete browser memory, including personal stories, AI-powered writing, and encrypted backup and restore through your own Google Drive.',
    },
    {
        question: 'Can I use multiple profiles?',
        answer: 'Not yet. Today, Remem is designed around a single personal profile. Multiple profiles are on our roadmap and will let you maintain separate memories for different use cases in the future.',
    },
    {
        question: 'What forms does it work on?',
        answer: 'Remem works on most modern web forms, with a strong focus on job applications. It supports platforms like Greenhouse, Lever, Workday, and Ashby, with broader support for government, university, insurance, onboarding, and other repetitive forms continuing to expand.',
    },
    {
        question: 'Which browsers are supported?',
        answer: 'Remem supports Chromium-based browsers including Chrome, Edge, Brave, Arc etc. Firefox and Safari support are planned.',
    },
    {
        question: 'Do you sell my data?',
        answer: "No. It's hard to sell something we never collect. Your memory lives on your device, and optional backups are encrypted before they're stored in your own Google Drive.",
    },
    {
        question: 'Does Remem monitor my browsing?',
        answer: "No. Remem only scans the page after you explicitly ask it to. It doesn't watch the websites you visit or collect information in the background. After filling a form, it temporarily stays active on that page so it can learn from any edits you make before submission.",
    },
    {
        question: 'What does it cost?',
        answer: "Remem is currently free. We haven't finalized our pricing yet because we're focused on validating the product and improving it with feedback from early users.",
    },
    {
        question: 'How is my data protected?',
        answer: "By default, your memory stays locally in your browser and isn't uploaded anywhere. If you enable cloud backup, your memory is encrypted before it leaves your device and stored securely in your own Google Drive.",
    },
    {
        question: 'Can I edit suggestions before submitting?',
        answer: "Absolutely. Once Remem fills a form, you're free to review, edit, or replace any suggestion. You can also rewrite AI-generated responses before submitting the form. Changes you make can also help Remem improve your memory for future forms.",
    },
    {
        question: 'Can websites detect that I use Remem?',
        answer: "No special integration is required. Remem behaves like a user filling a form and doesn't require websites to support it.",
    },
    {
        question: 'What information can Remem remember?',
        answer: 'Anything you choose—from basic details like your name and address to work history, education, skills, certifications, preferences, and reusable long-form answers.',
    },
]
