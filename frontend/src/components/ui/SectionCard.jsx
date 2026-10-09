import { ArrowDown, ArrowUp, ChevronDown, Trash2 } from 'lucide-react'
import { useId, useState } from 'react'
import { useI18n } from '../../hooks/useI18n'

/** Collapsible editor section. */
export function SectionCard({ id, title, icon: Icon, badge, actions, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()
  return (
    <section id={id} className="scroll-mt-28 rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <h2 className="m-0">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={contentId}
            className="flex items-center gap-2 rounded-md text-start text-base font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          >
            <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${open ? '' : 'ltr:-rotate-90 rtl:rotate-90'}`} aria-hidden="true" />
            {Icon && <Icon className="h-4 w-4 text-slate-600" aria-hidden="true" />}
            {title}
            {badge ? <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{badge}</span> : null}
          </button>
        </h2>
        {open && actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {open && (
        <div id={contentId} className="space-y-4 border-t border-slate-100 px-4 py-4">
          {children}
        </div>
      )}
    </section>
  )
}

/** One entry (education, job, project...) with reorder and remove controls. */
export function EntryCard({ title, onRemove, onMoveUp, onMoveDown, children, footer }) {
  const { t } = useI18n()
  const iconButton =
    'rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600'
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/60">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-2">
        <p className="truncate text-sm font-medium text-slate-800" dir="auto">
          {title}
        </p>
        <div className="flex shrink-0 items-center">
          <button type="button" className={iconButton} onClick={onMoveUp} disabled={!onMoveUp} aria-label={`${t.moveUp}: ${title}`}>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" className={iconButton} onClick={onMoveDown} disabled={!onMoveDown} aria-label={`${t.moveDown}: ${title}`}>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${iconButton} hover:text-red-700`}
            onClick={onRemove}
            aria-label={`${t.remove}: ${title}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="grid gap-3 p-3 sm:grid-cols-2">{children}</div>
      {footer && <div className="border-t border-slate-200 px-3 py-2">{footer}</div>}
    </div>
  )
}

export function EmptyHint() {
  const { t } = useI18n()
  return <p className="text-sm text-slate-500">{t.emptySectionHint}</p>
}
