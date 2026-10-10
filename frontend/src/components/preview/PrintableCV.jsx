import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { buildCvView } from '../../utils/cvFormatting'
import ATSResumeTemplate from './ATSResumeTemplate'

/**
 * Full-size copy of the CV used only when printing ("Save as PDF").
 * It is hidden on screen; index.css hides the app and shows only this element in print.
 * Rendered next to #root so no app layout, scaling, or controls affect the printed page.
 *
 * The printed page has no browser margin (@page margin: 0), which leaves the browser no room for its
 * own header/footer (date, page title, URL, page number). The CV's top and bottom margins come from
 * the table's header and footer rows, which browsers repeat on every printed page.
 */
export default function PrintableCV({ cv, lang }) {
  const view = useMemo(() => buildCvView(cv, lang), [cv, lang])
  return createPortal(
    <div className="print-root" aria-hidden="true">
      <table className="print-layout">
        <thead>
          <tr>
            <td className="print-margin" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ATSResumeTemplate view={view} />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="print-margin" />
          </tr>
        </tfoot>
      </table>
    </div>,
    document.body,
  )
}
