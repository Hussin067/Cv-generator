import { useEffect } from 'react'

/** Asks the browser to confirm before leaving or refreshing while the CV has unsaved content. */
export function useBeforeUnloadWarning(active) {
  useEffect(() => {
    if (!active) return undefined
    const handler = (event) => {
      event.preventDefault()
      // Required by some browsers to show the native confirmation dialog.
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [active])
}
