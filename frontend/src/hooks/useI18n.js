import { createContext, useContext } from 'react'
import { STRINGS } from '../utils/localization'

export const I18nContext = createContext({ uiLang: 'en', t: STRINGS.en })

/** Returns { uiLang, t } where t is the interface-string dictionary for the current interface language. */
export const useI18n = () => useContext(I18nContext)
