import { FlaskConical, FolderGit2, Plus } from 'lucide-react'
import { newProject } from '../../data/sectionDefinitions'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import Button from '../ui/Button'
import { SelectField, TextArea, TextField } from '../ui/Field'
import { EmptyHint, EntryCard, SectionCard } from '../ui/SectionCard'

export default function ProjectsResearchForm() {
  const { t } = useI18n()
  const { cv, actions, errors } = useBuilder()
  const list = cv.projects

  return (
    <SectionCard
      id="section-projects"
      title={t.projects}
      icon={FolderGit2}
      badge={list.length || null}
      actions={
        <>
          <Button size="sm" icon={Plus} onClick={() => actions.addEntry('projects', newProject('project'))}>
            {t.addProject}
          </Button>
          <Button size="sm" icon={FlaskConical} onClick={() => actions.addEntry('projects', newProject('research'))}>
            {t.addResearch}
          </Button>
        </>
      }
    >
      {list.length === 0 && <EmptyHint />}
      {list.map((entry, index) => {
        const set = (key) => (value) => actions.updateEntry('projects', entry.id, { [key]: value })
        const research = entry.type === 'research'
        const urlError = errors[`projects.${entry.id}.url`]
        return (
          <EntryCard
            key={entry.id}
            title={entry.title || t.untitled}
            onRemove={() => actions.removeEntry('projects', entry.id)}
            onMoveUp={index > 0 ? () => actions.moveEntry('projects', entry.id, -1) : undefined}
            onMoveDown={index < list.length - 1 ? () => actions.moveEntry('projects', entry.id, 1) : undefined}
          >
            <TextField label={t.title} value={entry.title} onChange={set('title')} maxLength={200} />
            <SelectField
              label={t.type}
              value={entry.type}
              onChange={set('type')}
              options={[
                { value: 'project', label: t.typeProject },
                { value: 'research', label: t.typeResearch },
              ]}
            />
            <TextField
              label={t.description}
              value={entry.description}
              onChange={set('description')}
              hint={research ? t.descriptionHintResearch : t.descriptionHintProject}
              maxLength={1000}
              className="sm:col-span-2"
            />
            <TextArea label={t.work} value={entry.work} onChange={set('work')} hint={t.workHint} rows={4} maxLength={5000} className="sm:col-span-2" />
            <TextField
              label={research ? t.toolsResearch : t.toolsProject}
              value={entry.tools}
              onChange={set('tools')}
              hint={t.listHint}
              optionalLabel={t.optional}
              maxLength={1000}
              className="sm:col-span-2"
            />
            <TextArea
              label={t.outcomes}
              value={entry.outcomes}
              onChange={set('outcomes')}
              hint={t.outcomesHint}
              optionalLabel={t.optional}
              rows={2}
              maxLength={5000}
              className="sm:col-span-2"
            />
            <TextField
              label={t.projectUrl}
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
