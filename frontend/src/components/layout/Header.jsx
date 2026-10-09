import { Eye, FileText, Globe, Languages } from 'lucide-react'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import LanguageSelector from './LanguageSelector'
import PrivacyNotice from './PrivacyNotice'

export function Logo({ onClick }) {
  const { t } = useI18n()
  const content = (
    <>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
        <FileText className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-slate-900">{t.appName}</span>
        <span className="hidden text-xs text-slate-500 md:block">{t.tagline}</span>
      </span>
    </>
  )
  return onClick ? (
    <button type="button" onClick={onClick} aria-label={t.home} className="flex items-center gap-2 rounded-md text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600">
      {content}
    </button>
  ) : (
    <div className="flex items-center gap-2">{content}</div>
  )
}

export default function Header({ uiLang, onUiLangChange, cvLang, onCvLangChange, onHome, onPreview, pdfButton, clearButton }) {
  const { t } = useI18n()
  return (
    <header className="z-40 border-b border-slate-200 bg-white/95 backdrop-blur lg:sticky lg:top-0">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
        <Logo onClick={onHome} />
        <div className="hidden sm:block">
          <PrivacyNotice />
        </div>
        <div className="ms-auto flex flex-wrap items-center gap-3">
          <LanguageSelector label={t.interfaceLanguage} icon={Globe} value={uiLang} onChange={onUiLangChange} />
          <LanguageSelector label={t.cvLanguage} icon={Languages} value={cvLang} onChange={onCvLangChange} />
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button variant="secondary" icon={Eye} onClick={onPreview} className="hidden sm:inline-flex">
            {t.preview}
          </Button>
          <div className="ms-auto flex items-center gap-2 sm:ms-0">
            {pdfButton}
            {clearButton}
          </div>
        </div>
        <div className="w-full sm:hidden">
          <PrivacyNotice />
        </div>
      </div>
    </header>
  )
}
