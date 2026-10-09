import { Briefcase, Plus } from 'lucide-react'
import { newExperience } from '../../data/sectionDefinitions'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import { Checkbox, MonthField, TextArea, TextField } from '../ui/Field'
import { EmptyHint, EntryCard, SectionCard } from '../ui/SectionCard'

export default function ExperienceForm() {
  const { t } = useI18n()
  const { cv, actions, errors } = useBuilder()
  const list = cv.experience

  return (
    <SectionCard
      id="section-experience"
      title={t.experience}
      icon={Briefcase}
      badge={list.length || null}
      actions={
        <Button size="sm" icon={Plus} onClick={() => actions.addEntry('experience', newExperience())}>
          {t.addExperience}
        </Button>
      }
    >
      {list.length === 0 && <EmptyHint />}
      {list.map((entry, index) => {
        const set = (key) => (value) => actions.updateEntry('experience', entry.id, { [key]: value })
        const dateError = errors[`experience.${entry.id}.endDate`]
        return (
          <EntryCard
            key={entry.id}
            title={[entry.title, entry.company].filter(Boolean).join(' — ') || t.untitled}
            onRemove={() => actions.removeEntry('experience', entry.id)}
            onMoveUp={index > 0 ? () => actions.moveEntry('experience', entry.id, -1) : undefined}
            onMoveDown={index < list.length - 1 ? () => actions.moveEntry('experience', entry.id, 1) : undefined}
          >
            <TextField label={t.role} value={entry.title} onChange={set('title')} maxLength={200} />
            <TextField label={t.company} value={entry.company} onChange={set('company')} maxLength={200} />
            <TextField label={t.location} value={entry.location} onChange={set('location')} optionalLabel={t.optional} maxLength={200} className="sm:col-span-2" />
            <MonthField label={t.startDate} value={entry.startDate} onChange={set('startDate')} />
            <div>
              <MonthField label={t.endDate} value={entry.current ? '' : entry.endDate} onChange={set('endDate')} disabled={entry.current} error={dateError && t[dateError]} />
              <Checkbox className="mt-2" label={t.currentlyWorking} checked={entry.current} onChange={set('current')} />
            </div>
            <TextArea
              label={t.responsibilities}
              value={entry.description}
              onChange={set('description')}
              hint={t.responsibilitiesHint}
              rows={5}
              maxLength={5000}
              className="sm:col-span-2"
            />
            <TextField
              label={t.technologies}
              value={entry.technologies}
              onChange={set('technologies')}
              hint={t.listHint}
              optionalLabel={t.optional}
              maxLength={1000}
              className="sm:col-span-2"
            />
          </EntryCard>
        )
      })}
    </SectionCard>
  )
}
