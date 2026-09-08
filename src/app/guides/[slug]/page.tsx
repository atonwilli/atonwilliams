import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGuide, getGuides } from '@/lib/content'
import { SpecGuidePage } from '@/components/SpecGuide'
import { GuideTools } from '@/components/GuideTools'
import { ProBox } from '@/components/ProBox'

export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const g = getGuide(slug)
  return g ? { title: g.title, description: g.desc } : {}
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const g = getGuide(slug)
  if (!g) notFound()
  return (
    <>
      {g.kind === 'html' && <style dangerouslySetInnerHTML={{ __html: g.css }} />}
      <main>
        {g.kind === 'html' ? (
          <>
            <section className={`band${g.band}`}><div className="wrap" dangerouslySetInnerHTML={{ __html: g.heroHtml }} /></section>
            <section className="kit" aria-label="What you get"><div className="wrap" dangerouslySetInnerHTML={{ __html: g.kitHtml }} /></section>
            <article className="article">
              <div className="wrap" dangerouslySetInnerHTML={{ __html: g.articleHtml }} />
              <div className="wrap"><ProBox guide={g.slug} num={99} /></div>
            </article>
          </>
        ) : (
          <SpecGuidePage g={g} />
        )}
      </main>
      <GuideTools />
    </>
  )
}
