import { Download } from 'lucide-react'
import { useI18n } from '../../hooks/useI18n'
import { pdfFileName } from '../../utils/cvFormatting'
import Button from '../ui/Button'

/**
 * Opens the browser's print dialog for the CV. The user picks "Save as PDF".
 * Everything happens locally: the CV is never uploaded anywhere.
 */
export default function PDFExportButton({ cv, lang, hasErrors, onAttempt, onStatus, size = 'md', className = '' }) {
  const { t } = useI18n()

  const handleClick = () => {
    if (hasErrors) {
      // Reveal "required" messages, then take the user to the first problem.
      onAttempt?.()
      onStatus?.({ tone: 'warning', text: t.fixErrorsForPdf })
      setTimeout(() => {
        const invalid = document.querySelector('[aria-invalid="true"]')
        invalid?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        invalid?.focus({ preventScroll: true })
      }, 0)
      return
    }

    const previousTitle = document.title
    const restore = () => {
      document.title = previousTitle
      window.removeEventListener('afterprint', restore)
    }
    document.title = pdfFileName(cv.personal.fullName, lang)
    window.addEventListener('afterprint', restore)
    onStatus?.({ tone: 'info', text: t.printHint })
    window.print()
    // Some browsers return from print() before the dialog closes; afterprint restores the title then.
    setTimeout(restore, 1000)
  }

  return (
    <Button variant="primary" size={size} icon={Download} onClick={handleClick} className={className}>
      {t.downloadPdf}
    </Button>
  )
}
