import { ArrowRight, Columns2, Download, Globe, Languages, ShieldCheck } from 'lucide-react'
import { Logo } from '../components/layout/Header'
import LanguageSelector from '../components/layout/LanguageSelector'
import { PrivacyDetails } from '../components/layout/PrivacyNotice'
import Button from '../components/ui/Button'
import { useI18n } from '../hooks/useI18n'

export default function HomePage({ uiLang, onUiLangChange, onStart }) {
  const { t } = useI18n()
  const features = [
    [Download, t.featurePdfTitle, t.featurePdfBody],
    [Columns2, t.featureAtsTitle, t.featureAtsBody],
    [Languages, t.featureBilingualTitle, t.featureBilingualBody],
    [ShieldCheck, t.featurePrivacyTitle, t.featurePrivacyBody],
  ]

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <LanguageSelector label={t.interfaceLanguage} icon={Globe} value={uiLang} onChange={onUiLangChange} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{t.heroTitle}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{t.heroBody}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={onStart} className="h-11 px-5 text-base">
                {t.startBuilding}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Button>
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-800">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                {t.privacyBadge}
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-500">{t.noGuarantee}</p>
          </div>

          {/* Simple illustration of the single-column template */}
          <div aria-hidden="true" className="mx-auto w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-md">
            <div className="mx-auto h-3 w-32 rounded bg-slate-800" />
            <div className="mx-auto mt-2 h-2 w-24 rounded bg-slate-300" />
            <div className="mx-auto mt-2 h-1.5 w-48 rounded bg-slate-200" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="mt-5">
                <div className="h-2 w-20 rounded bg-slate-700" />
                <div className="mt-1.5 h-px w-full bg-slate-300" />
                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-slate-200" />
                  <div className="h-1.5 w-11/12 rounded bg-slate-200" />
                  <div className="h-1.5 w-4/5 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, title, body]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-5 w-5 text-slate-700" aria-hidden="true" />
              <h2 className="mt-3 text-sm font-semibold text-slate-900">{title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            {t.privacyTitle}
          </h2>
          <PrivacyDetails />
        </section>
      </main>
    </div>
  )
}
