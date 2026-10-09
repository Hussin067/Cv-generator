import { Copy, Eye, PenLine } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AdditionalSectionsForm from '../components/forms/AdditionalSectionsForm'
import CertificationsForm from '../components/forms/CertificationsForm'
import EducationForm from '../components/forms/EducationForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ProjectsResearchForm from '../components/forms/ProjectsResearchForm'
import SkillsForm from '../components/forms/SkillsForm'
import SummaryForm from '../components/forms/SummaryForm'
import ClearAllDataButton from '../components/layout/ClearAllDataButton'
import Header from '../components/layout/Header'
import PrivacyNotice from '../components/layout/PrivacyNotice'
import CVPreview from '../components/preview/CVPreview'
import PDFExportButton from '../components/preview/PDFExportButton'
import PrintableCV from '../components/preview/PrintableCV'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { useBeforeUnloadWarning } from '../hooks/useBeforeUnloadWarning'
import { BuilderContext } from '../hooks/useBuilder'
import { useCvStore } from '../hooks/useCvStore'
import { useI18n } from '../hooks/useI18n'
import { cvHasContent } from '../utils/cvFormatting'
import { languageName } from '../utils/localization'
import { validateCv } from '../utils/validation'

const otherLang = (lang) => (lang === 'en' ? 'ar' : 'en')

export default function BuilderPage({ uiLang, onUiLangChange, onHome }) {
  const { t } = useI18n()
  const { state, cv, actions } = useCvStore()
  const lang = state.cvLang
  const [session, setSession] = useState(0) // remounts editors on Clear All so no local copies survive
  const [mobileView, setMobileView] = useState('editor')
  const [status, setStatus] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const statusTimer = useRef(null)

  const errors = useMemo(() => validateCv(cv), [cv])
  const hasErrors = Object.keys(errors).length > 0
  const anyContent = cvHasContent(state.cvs.en) || cvHasContent(state.cvs.ar)
  useBeforeUnloadWarning(anyContent)

  const notify = useCallback((message) => {
    clearTimeout(statusTimer.current)
    setStatus(message)
    statusTimer.current = setTimeout(() => setStatus(null), message.tone === 'error' ? 9000 : 5000)
  }, [])
  useEffect(() => () => clearTimeout(statusTimer.current), [])

  const other = otherLang(lang)
  const showCopyBanner = !cvHasContent(cv) && cvHasContent(state.cvs[other]) && !state.copyDismissed[lang]

  const clearAll = () => {
    actions.reset()
    setSession((n) => n + 1)
    setMobileView('editor')
    setPreviewOpen(false)
    notify({ tone: 'success', text: t.cleared })
  }

  const contextValue = { cv, lang, state, actions, errors, notify }
  const pdfButton = (size) => <PDFExportButton cv={cv} lang={lang} hasErrors={hasErrors} onStatus={notify} size={size} />

  return (
    <BuilderContext.Provider value={contextValue}>
      <Header
        uiLang={uiLang}
        onUiLangChange={onUiLangChange}
        cvLang={lang}
        onCvLangChange={actions.setCvLang}
        onHome={onHome}
        onPreview={() => setPreviewOpen(true)}
        pdfButton={pdfButton('md')}
        clearButton={<ClearAllDataButton onConfirm={clearAll} />}
      />

      {/* Mobile editor/preview switch */}
      <div className="border-b border-slate-200 bg-white px-4 py-2 lg:hidden">
        <div role="tablist" aria-label={`${t.editor} / ${t.preview}`} className="grid grid-cols-2 rounded-md border border-slate-300 p-0.5">
          {[
            ['editor', t.editor, PenLine],
            ['preview', t.preview, Eye],
          ].map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mobileView === key}
              onClick={() => setMobileView(key)}
              className={`flex items-center justify-center gap-1.5 rounded py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
                mobileView === key ? 'bg-slate-900 text-white' : 'text-slate-700'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto grid max-w-[1600px] gap-6 px-4 py-5 lg:grid-cols-2">
        {/* Editor */}
        <div key={session} className={`min-w-0 space-y-4 ${mobileView === 'editor' ? '' : 'hidden lg:block'}`}>
          {showCopyBanner && (
            <Alert tone="info" title={t.copyBannerTitle}>
              <p>{t.copyBannerBody(languageName(other, uiLang))}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button size="sm" icon={Copy} onClick={() => actions.copyFrom(other)}>
                  {t.copyFrom(languageName(other, uiLang))}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // Contact details are language-neutral, so they carry over to the new version.
                    const { fullName, email, phone, linkedin, github, portfolio } = state.cvs[other].personal
                    actions.updatePersonal({ fullName, email, phone, linkedin, github, portfolio })
                    actions.dismissCopy(lang)
                  }}
                >
                  {t.startEmpty}
                </Button>
              </div>
            </Alert>
          )}

          <PersonalInfoForm />
          <SummaryForm />
          <EducationForm />
          <ExperienceForm />
          <SkillsForm />
          <CertificationsForm />
          <ProjectsResearchForm />
          <AdditionalSectionsForm />
          <PrivacyNotice variant="inline" />
        </div>

        {/* Preview */}
        <aside className={`min-w-0 ${mobileView === 'preview' ? '' : 'hidden lg:block'}`} aria-label={t.preview}>
          <div className="lg:sticky lg:top-24">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-700">
                {t.preview} · {languageName(lang, uiLang)}
              </h2>
              <div className="lg:hidden">{pdfButton('sm')}</div>
            </div>
            <div className="rounded-lg bg-slate-200/70 p-3 sm:p-5 lg:max-h-[calc(100vh-8.5rem)] lg:overflow-y-auto">
              <CVPreview cv={cv} lang={lang} />
            </div>
          </div>
        </aside>
      </main>

      {previewOpen && (
        <Modal title={`${t.preview} · ${languageName(lang, uiLang)}`} onClose={() => setPreviewOpen(false)} size="lg" footer={pdfButton('md')}>
          <div className="rounded-md bg-slate-200/70 p-3 sm:p-5">
            <CVPreview cv={cv} lang={lang} />
          </div>
        </Modal>
      )}

      <PrintableCV cv={cv} lang={lang} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        {status && (
          <div className="pointer-events-auto max-w-md">
            <Alert tone={status.tone}>{status.text}</Alert>
          </div>
        )}
      </div>
    </BuilderContext.Provider>
  )
}
