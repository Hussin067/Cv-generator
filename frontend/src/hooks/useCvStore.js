/**
 * In-memory CV state. Nothing here is persisted: no localStorage, sessionStorage,
 * IndexedDB, or cookies. Refreshing or closing the tab discards everything.
 */

import { useMemo, useReducer } from 'react'
import { emptyCv } from '../data/sectionDefinitions'

export const initialState = () => ({
  cvs: { en: emptyCv(), ar: emptyCv() },
  cvLang: 'en',
  copyDismissed: { en: false, ar: false },
})

function moveItem(list, id, direction) {
  const index = list.findIndex((item) => item.id === id)
  const target = index + direction
  if (index < 0 || target < 0 || target >= list.length) return list
  const copy = [...list]
  ;[copy[index], copy[target]] = [copy[target], copy[index]]
  return copy
}

function withCv(state, lang, update) {
  return { ...state, cvs: { ...state.cvs, [lang]: update(state.cvs[lang]) } }
}

export function cvReducer(state, action) {
  const lang = state.cvLang
  switch (action.type) {
    case 'updatePersonal':
      return withCv(state, lang, (cv) => ({ ...cv, personal: { ...cv.personal, ...action.patch } }))
    case 'setSummary':
      return withCv(state, lang, (cv) => ({ ...cv, summary: action.value }))
    case 'addEntry':
      return withCv(state, lang, (cv) => ({ ...cv, [action.section]: [...cv[action.section], action.entry] }))
    case 'updateEntry':
      return withCv(state, lang, (cv) => ({
        ...cv,
        [action.section]: cv[action.section].map((item) => (item.id === action.id ? { ...item, ...action.patch } : item)),
      }))
    case 'removeEntry':
      return withCv(state, lang, (cv) => ({ ...cv, [action.section]: cv[action.section].filter((item) => item.id !== action.id) }))
    case 'moveEntry':
      return withCv(state, lang, (cv) => ({ ...cv, [action.section]: moveItem(cv[action.section], action.id, action.direction) }))
    case 'copyFrom':
      // Starts the current language version from a copy of the other one.
      return withCv(state, lang, () => structuredClone(state.cvs[action.from]))
    case 'setCvLang':
      return { ...state, cvLang: action.lang }
    case 'dismissCopy':
      return { ...state, copyDismissed: { ...state.copyDismissed, [action.lang]: true } }
    case 'reset':
      // Replace every reference with fresh empty objects; the previous state becomes unreachable.
      return initialState()
    default:
      return state
  }
}

export function useCvStore() {
  const [state, dispatch] = useReducer(cvReducer, undefined, initialState)
  const cv = state.cvs[state.cvLang]

  const actions = useMemo(
    () => ({
      updatePersonal: (patch) => dispatch({ type: 'updatePersonal', patch }),
      setSummary: (value) => dispatch({ type: 'setSummary', value }),
      addEntry: (section, entry) => dispatch({ type: 'addEntry', section, entry }),
      updateEntry: (section, id, patch) => dispatch({ type: 'updateEntry', section, id, patch }),
      removeEntry: (section, id) => dispatch({ type: 'removeEntry', section, id }),
      moveEntry: (section, id, direction) => dispatch({ type: 'moveEntry', section, id, direction }),
      copyFrom: (from) => dispatch({ type: 'copyFrom', from }),
      setCvLang: (lang) => dispatch({ type: 'setCvLang', lang }),
      dismissCopy: (lang) => dispatch({ type: 'dismissCopy', lang }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  )

  return { state, cv, actions }
}
