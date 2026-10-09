import { useEffect, useMemo, useState } from 'react'
import { I18nContext } from './hooks/useI18n'
import BuilderPage from './pages/BuilderPage'
import HomePage from './pages/HomePage'
import { STRINGS } from './utils/localization'

/**
 * Top-level shell. Navigation is plain React state (no router, nothing in the URL),
 * and the interface language is independent from the CV language.
 */
export default function App() {
  const [uiLang, setUiLang] = useState('en')
  const [page, setPage] = useState('home')
  const [started, setStarted] = useState(false)
  const i18n = useMemo(() => ({ uiLang, t: STRINGS[uiLang] }), [uiLang])

  useEffect(() => {
    document.documentElement.lang = uiLang
    document.documentElement.dir = uiLang === 'ar' ? 'rtl' : 'ltr'
  }, [uiLang])

  return (
    <I18nContext.Provider value={i18n}>
      <div className={uiLang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {page === 'home' && (
          <HomePage
            uiLang={uiLang}
            onUiLangChange={setUiLang}
            onStart={() => {
              setStarted(true)
              setPage('builder')
            }}
          />
        )}
        {/* The builder stays mounted after it is opened, so visiting Home never discards the CV. */}
        {started && (
          <div hidden={page !== 'builder'}>
            <BuilderPage uiLang={uiLang} onUiLangChange={setUiLang} onHome={() => setPage('home')} />
          </div>
        )}
      </div>
    </I18nContext.Provider>
  )
}
