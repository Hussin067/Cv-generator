import { LayoutList, Plus } from 'lucide-react'
import { useState } from 'react'
import { ADDITIONAL_KINDS, newAdditionalSection } from '../../data/sectionDefinitions'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import { SelectField, TextArea, TextField } from '../ui/Field'
import { EmptyHint, EntryCard, SectionCard } from '../ui/SectionCard'

const INLINE_KINDS = new Set(['languages', 'coursework'])

export default function AdditionalSectionsForm() {
  const { t } = useI18n()
  const { cv, actions } = useBuilder()
  const list = cv.additional
  const [kindToAdd, setKindToAdd] = useState('volunteer')

  return (
    <SectionCard id="section-additional" title={t.additional} icon={LayoutList} badge={list.length || null}>
      <div className="flex flex-wrap items-end gap-2">
        <SelectField
          label={t.sectionKind}
          value={kindToAdd}
          onChange={setKindToAdd}
          options={ADDITIONAL_KINDS.map((kind) => ({ value: kind, label: t.kinds[kind] }))}
          className="min-w-48 flex-1"
        />
        <Button icon={Plus} onClick={() => actions.addEntry('additional', newAdditionalSection(kindToAdd))}>
          {t.addSection}
        </Button>
      </div>
      {list.length === 0 && <EmptyHint />}
      {list.map((entry, index) => {
        const set = (key) => (value) => actions.updateEntry('additional', entry.id, { [key]: value })
        const inline = INLINE_KINDS.has(entry.kind)
        return (
          <EntryCard
            key={entry.id}
            title={entry.kind === 'custom' ? entry.title || t.kinds.custom : t.kinds[entry.kind]}
            onRemove={() => actions.removeEntry('additional', entry.id)}
            onMoveUp={index > 0 ? () => actions.moveEntry('additional', entry.id, -1) : undefined}
            onMoveDown={index < list.length - 1 ? () => actions.moveEntry('additional', entry.id, 1) : undefined}
          >
            {entry.kind === 'custom' && (
              <TextField label={t.customTitle} value={entry.title} onChange={set('title')} maxLength={200} className="sm:col-span-2" />
            )}
            {inline ? (
              <TextField label={t.items} value={entry.items} onChange={set('items')} hint={t.itemsHintInline} maxLength={5000} className="sm:col-span-2" />
            ) : (
              <TextArea label={t.items} value={entry.items} onChange={set('items')} hint={t.linesHint} rows={3} maxLength={5000} className="sm:col-span-2" />
            )}
          </EntryCard>
        )
      })}
    </SectionCard>
  )
}
