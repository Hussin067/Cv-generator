import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

/** Asks for confirmation, then resets every piece of CV state held in memory. */
export default function ClearAllDataButton({ onConfirm, compact = false }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="danger" size={compact ? 'icon' : 'md'} icon={Trash2} onClick={() => setOpen(true)} aria-label={compact ? t.clearAll : undefined} title={t.clearAll}>
        {!compact && <span className="hidden lg:inline">{t.clearAll}</span>}
      </Button>
      {open && (
        <Modal
          title={t.clearConfirmTitle}
          onClose={() => setOpen(false)}
          size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                {t.cancel}
              </Button>
              <Button
                variant="dangerSolid"
                icon={Trash2}
                onClick={() => {
                  setOpen(false)
                  onConfirm()
                }}
              >
                {t.clearConfirm}
              </Button>
            </>
          }
        >
          <p className="text-sm text-slate-700">{t.clearConfirmBody}</p>
        </Modal>
      )}
    </>
  )
}
