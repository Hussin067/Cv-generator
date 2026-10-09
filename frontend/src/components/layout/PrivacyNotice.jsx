import { ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

export function PrivacyDetails() {
  const { t } = useI18n()
  return (
    <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-slate-700">
      {t.privacyPoints.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  )
}

/** Compact privacy indicator with a details dialog. */
export default function PrivacyNotice({ variant = 'badge' }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <>
      {variant === 'badge' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
        >
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {t.privacyBadge}
        </button>
      ) : (
        <div className="flex items-start gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
          <p>
            {t.privacyShort}{' '}
            <button type="button" onClick={() => setOpen(true)} className="font-medium text-slate-900 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600">
              {t.learnMore}
            </button>
          </p>
        </div>
      )}
      {open && (
        <Modal title={t.privacyTitle} onClose={() => setOpen(false)} size="md" footer={<Button variant="primary" onClick={() => setOpen(false)}>{t.close}</Button>}>
          <PrivacyDetails />
        </Modal>
      )}
    </>
  )
}
