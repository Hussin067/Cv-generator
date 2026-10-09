import { FileText } from 'lucide-react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../../hooks/useI18n'
import { buildCvView } from '../../utils/cvFormatting'
import ATSResumeTemplate from './ATSResumeTemplate'

const MM = 96 / 25.4 // CSS pixels per millimetre
const SHEET_WIDTH = 210 * MM
const MARGIN_TOP = 15 * MM
const PAGE_CONTENT_HEIGHT = (297 - 30) * MM

/** A4 sheet that scales down to fit its container and marks approximate page breaks. */
export default function CVPreview({ cv, lang, compact = false }) {
  const { t } = useI18n()
  const view = useMemo(() => buildCvView(cv, lang), [cv, lang])
  const container = useRef(null)
  const sheet = useRef(null)
  const [scale, setScale] = useState(1)
  const [sheetHeight, setSheetHeight] = useState(297 * MM)
  const isEmpty = !view.header.name && view.sections.length === 0
  const showSheet = !isEmpty || compact

  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => {
      if (container.current) setScale(Math.min(1, container.current.clientWidth / SHEET_WIDTH))
      if (sheet.current) setSheetHeight(sheet.current.offsetHeight)
    })
    if (container.current) observer.observe(container.current)
    if (sheet.current) observer.observe(sheet.current)
    return () => observer.disconnect()
  }, [showSheet])

  const breaks = []
  for (let y = MARGIN_TOP + PAGE_CONTENT_HEIGHT; y < sheetHeight - MARGIN_TOP; y += PAGE_CONTENT_HEIGHT) breaks.push(y)

  return (
    <div ref={container} className="w-full" aria-label={t.preview} role="region">
      {!showSheet ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-24 text-center text-sm text-slate-500">
          <FileText className="h-8 w-8 text-slate-400" aria-hidden="true" />
          <p>{t.previewEmpty}</p>
        </div>
      ) : (
        <div style={{ height: sheetHeight * scale }} className="relative" dir="ltr">
          <div
            ref={sheet}
            className="cv-sheet absolute left-0 top-0 origin-top-left"
            style={{ transform: `scale(${scale})`, width: SHEET_WIDTH }}
          >
            <ATSResumeTemplate view={view} />
            {breaks.map((y, index) => (
              <div key={y} className="cv-page-break" style={{ top: y }} aria-hidden="true">
                <span>
                  {t.pageBreak} · {index + 2}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
