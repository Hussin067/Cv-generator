import { createContext, useContext } from 'react'

/**
 * Builder-wide context: { cv, lang, state, actions, errors, notify }.
 * Values come from in-memory React state only.
 */
export const BuilderContext = createContext(null)

export const useBuilder = () => useContext(BuilderContext)
