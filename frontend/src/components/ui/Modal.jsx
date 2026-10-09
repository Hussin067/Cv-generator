import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../../hooks/useI18n'

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Accessible modal dialog: traps focus, closes on Escape, and restores focus when closed.
 * Rendered in a portal so ancestors with transforms/filters (e.g. the blurred header) cannot clip it.
 */
export default function Modal({ title, onClose, children, footer, size = 'md' }) {
  const { t } = useI18n()
  const titleId = useId()
  const panel = useRef(null)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const first = panel.current?.querySelector(FOCUSABLE)
    first?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        closeRef.current()
      }
      if (event.key === 'Tab' && panel.current) {
        const items = [...panel.current.querySelectorAll(FOCUSABLE)]
        if (!items.length) return
        const [firstItem, lastItem] = [items[0], items[items.length - 1]]
        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault()
          lastItem.focus()
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault()
          firstItem.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [])

  const width = size === 'lg' ? 'max-w-4xl' : size === 'sm' ? 'max-w-md' : 'max-w-2xl'

  return createPortal(
    <div dir={document.documentElement.dir} className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4">
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`flex max-h-[92vh] w-full ${width} flex-col rounded-t-xl bg-white shadow-xl sm:rounded-xl`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3">
          <h2 id={titleId} className="text-base font-semibold text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 px-5 py-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
