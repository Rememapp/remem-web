import { Briefcase, GraduationCap, HeartPulse, Landmark, ListChecks, Rocket, ShoppingCart, Umbrella, type LucideIcon } from 'lucide-react'

import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

interface ProblemCard {
    icon: LucideIcon
    title: string
    detail: string
    tint: string
}

const problems: ProblemCard[] = [
    { icon: Briefcase, title: 'Job applications', detail: 'The same employment history, retyped into every ATS.', tint: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
    { icon: Landmark, title: 'Government forms', detail: 'Passport numbers and addresses, again and again.', tint: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { icon: GraduationCap, title: 'University applications', detail: 'Every portal asks for the same transcript details.', tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
    { icon: ListChecks, title: 'Surveys', detail: 'Demographics you have answered a hundred times.', tint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { icon: ShoppingCart, title: 'Checkout', detail: 'Shipping and billing, spelled out one more time.', tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
    { icon: Umbrella, title: 'Insurance', detail: 'Policy after policy asking who you are.', tint: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
    { icon: HeartPulse, title: 'Healthcare', detail: 'Intake forms that never remember your last visit.', tint: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
    { icon: Rocket, title: 'SaaS onboarding', detail: 'Company, role, team size — the usual questionnaire.', tint: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
]

export function Problem() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading
                eyebrow="The problem"
                title="The web keeps asking. You keep typing."
                description="Your name, your history, your documents — the same answers, demanded by every site as if it were the first time."
            />
            <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {problems.map((problem) => (
                    <StaggerItem key={problem.title}>
                        <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                            <div className={`flex size-10 items-center justify-center rounded-xl ${problem.tint}`}>
                                <problem.icon aria-hidden className="size-5" />
                            </div>
                            <h3 className="mt-4 font-medium">{problem.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{problem.detail}</p>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    )
}
