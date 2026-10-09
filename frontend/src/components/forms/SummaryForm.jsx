import { AlignLeft } from 'lucide-react'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import { TextArea } from '../ui/Field'
import { SectionCard } from '../ui/SectionCard'

export default function SummaryForm() {
  const { t } = useI18n()
  const { cv, actions } = useBuilder()

  return (
    <SectionCard id="section-summary" title={t.summary} icon={AlignLeft}>
      <TextArea label={t.summaryLabel} value={cv.summary} onChange={actions.setSummary} hint={t.summaryHint} rows={4} maxLength={2000} />
    </SectionCard>
  )
}
