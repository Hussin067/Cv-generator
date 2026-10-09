import { Plus, Wrench } from 'lucide-react'
import { useId } from 'react'
import { newSkillCategory, SKILL_CATEGORY_PRESETS } from '../../data/sectionDefinitions'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import { TextField } from '../ui/Field'
import { EmptyHint, EntryCard, SectionCard } from '../ui/SectionCard'

export default function SkillsForm() {
  const { t } = useI18n()
  const { cv, lang, actions } = useBuilder()
  const list = cv.skills
  const presetsId = useId()
  const usedCategories = new Set(list.map((s) => s.category))

  return (
    <SectionCard
      id="section-skills"
      title={t.skills}
      icon={Wrench}
      badge={list.length || null}
      actions={
        <Button size="sm" icon={Plus} onClick={() => actions.addEntry('skills', newSkillCategory())}>
          {t.addCategory}
        </Button>
      }
    >
      <datalist id={presetsId}>
        {SKILL_CATEGORY_PRESETS[lang]
          .filter((name) => !usedCategories.has(name))
          .map((name) => (
            <option key={name} value={name} />
          ))}
      </datalist>
      {list.length === 0 && <EmptyHint />}
      {list.map((entry, index) => {
        const set = (key) => (value) => actions.updateEntry('skills', entry.id, { [key]: value })
        return (
          <EntryCard
            key={entry.id}
            title={entry.category || t.untitled}
            onRemove={() => actions.removeEntry('skills', entry.id)}
            onMoveUp={index > 0 ? () => actions.moveEntry('skills', entry.id, -1) : undefined}
            onMoveDown={index < list.length - 1 ? () => actions.moveEntry('skills', entry.id, 1) : undefined}
          >
            <TextField label={t.category} value={entry.category} onChange={set('category')} placeholder={t.categoryPlaceholder} list={presetsId} maxLength={200} />
            <TextField label={t.skillItems} value={entry.items} onChange={set('items')} hint={t.skillItemsHint} maxLength={1000} />
          </EntryCard>
        )
      })}
    </SectionCard>
  )
}
