import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

function MdxLink({ href = '', children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const isInternal = href.startsWith('/') || href.startsWith('#')
    if (isInternal) {
        return (
            <Link href={href} className="font-medium text-primary underline underline-offset-4 hover:no-underline">
                {children}
            </Link>
        )
    }
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4 hover:no-underline" {...props}>
            {children}
        </a>
    )
}

const components = {
    h2: (props: { children?: ReactNode }) => <h2 className="mt-10 mb-4 font-display text-2xl font-bold tracking-tight" {...props} />,
    h3: (props: { children?: ReactNode }) => <h3 className="mt-8 mb-3 font-display text-xl font-semibold tracking-tight" {...props} />,
    p: (props: { children?: ReactNode }) => <p className="my-4 leading-relaxed text-muted-foreground" {...props} />,
    ul: (props: { children?: ReactNode }) => <ul className="my-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />,
    ol: (props: { children?: ReactNode }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />,
    li: (props: { children?: ReactNode }) => <li className="leading-relaxed" {...props} />,
    strong: (props: { children?: ReactNode }) => <strong className="font-semibold text-foreground" {...props} />,
    blockquote: (props: { children?: ReactNode }) => <blockquote className="my-6 border-l-2 border-primary pl-4 text-foreground italic" {...props} />,
    code: (props: { children?: ReactNode }) => <code className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />,
    hr: () => <hr className="my-8 border-border" />,
    a: MdxLink,
}

export function MdxContent({ source }: { source: string }) {
    return <MDXRemote source={source} components={components} />
}
