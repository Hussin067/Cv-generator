import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { buildCvView } from '../../utils/cvFormatting'
import ATSResumeTemplate from './ATSResumeTemplate'

/**
 * Full-size copy of the CV used only when printing ("Save as PDF").
 * It is hidden on screen; index.css hides the app and shows only this element in print.
 * Rendered next to #root so no app layout, scaling, or controls affect the printed page.
 */
export default function PrintableCV({ cv, lang }) {
  const view = useMemo(() => buildCvView(cv, lang), [cv, lang])
  return createPortal(
    <div className="print-root" aria-hidden="true">
      <ATSResumeTemplate view={view} />
    </div>,
    document.body,
  )
}
