import { GraduationCap, Plus } from 'lucide-react'
import { newEducation } from '../../data/sectionDefinitions'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import { Checkbox, MonthField, TextArea, TextField } from '../ui/Field'
import { EmptyHint, EntryCard, SectionCard } from '../ui/SectionCard'

export default function EducationForm() {
  const { t } = useI18n()
  const { cv, actions, errors } = useBuilder()
  const list = cv.education

  return (
    <SectionCard
      id="section-education"
      title={t.education}
      icon={GraduationCap}
      badge={list.length || null}
      actions={
        <Button size="sm" icon={Plus} onClick={() => actions.addEntry('education', newEducation())}>
          {t.addEducation}
        </Button>
      }
    >
      {list.length === 0 && <EmptyHint />}
      {list.map((entry, index) => {
        const set = (key) => (value) => actions.updateEntry('education', entry.id, { [key]: value })
        const dateError = errors[`education.${entry.id}.endDate`]
        return (
          <EntryCard
            key={entry.id}
            title={[entry.degree, entry.institution].filter(Boolean).join(' — ') || t.untitled}
            onRemove={() => actions.removeEntry('education', entry.id)}
            onMoveUp={index > 0 ? () => actions.moveEntry('education', entry.id, -1) : undefined}
            onMoveDown={index < list.length - 1 ? () => actions.moveEntry('education', entry.id, 1) : undefined}
          >
            <TextField label={t.degree} value={entry.degree} onChange={set('degree')} maxLength={200} />
            <TextField label={t.major} value={entry.major} onChange={set('major')} maxLength={200} />
            <TextField label={t.institution} value={entry.institution} onChange={set('institution')} maxLength={200} />
            <TextField label={t.location} value={entry.location} onChange={set('location')} optionalLabel={t.optional} maxLength={200} />
            <MonthField label={t.startDate} value={entry.startDate} onChange={set('startDate')} optionalLabel={t.optional} />
            <div>
              <MonthField label={t.graduationDate} value={entry.endDate} onChange={set('endDate')} error={dateError && t[dateError]} />
              <Checkbox className="mt-2" label={t.expectedGraduation} checked={entry.expected} onChange={set('expected')} />
            </div>
            <TextField label={t.gpa} dir="ltr" value={entry.gpa} onChange={set('gpa')} optionalLabel={t.optional} placeholder="3.8 / 4.0" maxLength={30} />
            <TextField label={t.coursework} value={entry.coursework} onChange={set('coursework')} hint={t.courseworkHint} optionalLabel={t.optional} maxLength={1000} />
            <TextArea
              label={t.achievements}
              value={entry.achievements}
              onChange={set('achievements')}
              hint={t.linesHint}
              optionalLabel={t.optional}
              rows={3}
              maxLength={5000}
              className="sm:col-span-2"
            />
          </EntryCard>
        )
      })}
    </SectionCard>
  )
}
