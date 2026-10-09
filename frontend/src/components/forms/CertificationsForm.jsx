import { BadgeCheck, Plus } from 'lucide-react'
import { newCertification } from '../../data/sectionDefinitions'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import { MonthField, TextField } from '../ui/Field'
import { EmptyHint, EntryCard, SectionCard } from '../ui/SectionCard'

export default function CertificationsForm() {
  const { t } = useI18n()
  const { cv, actions, errors } = useBuilder()
  const list = cv.certifications

  return (
    <SectionCard
      id="section-certifications"
      title={t.certifications}
      icon={BadgeCheck}
      badge={list.length || null}
      actions={
        <Button size="sm" icon={Plus} onClick={() => actions.addEntry('certifications', newCertification())}>
          {t.addCertification}
        </Button>
      }
    >
      {list.length === 0 && <EmptyHint />}
      {list.map((entry, index) => {
        const set = (key) => (value) => actions.updateEntry('certifications', entry.id, { [key]: value })
        const urlError = errors[`certifications.${entry.id}.url`]
        const dateError = errors[`certifications.${entry.id}.expiryDate`]
        return (
          <EntryCard
            key={entry.id}
            title={entry.name || t.untitled}
            onRemove={() => actions.removeEntry('certifications', entry.id)}
            onMoveUp={index > 0 ? () => actions.moveEntry('certifications', entry.id, -1) : undefined}
            onMoveDown={index < list.length - 1 ? () => actions.moveEntry('certifications', entry.id, 1) : undefined}
          >
            <TextField label={t.certName} value={entry.name} onChange={set('name')} maxLength={200} />
            <TextField label={t.issuer} value={entry.issuer} onChange={set('issuer')} maxLength={200} />
            <MonthField label={t.issueDate} value={entry.issueDate} onChange={set('issueDate')} optionalLabel={t.optional} />
            <MonthField label={t.expiryDate} value={entry.expiryDate} onChange={set('expiryDate')} optionalLabel={t.optional} error={dateError && t[dateError]} />
            <TextField
              label={t.credentialUrl}
              dir="ltr"
              value={entry.url}
              onChange={set('url')}
              error={urlError && t[urlError]}
              optionalLabel={t.optional}
              placeholder="https://…"
              maxLength={300}
              className="sm:col-span-2"
            />
          </EntryCard>
        )
      })}
    </SectionCard>
  )
}
