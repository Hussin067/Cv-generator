import { UserRound } from 'lucide-react'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import { TextField } from '../ui/Field'
import { SectionCard } from '../ui/SectionCard'

export default function PersonalInfoForm() {
  const { t } = useI18n()
  const { cv, actions, errors } = useBuilder()
  const p = cv.personal
  const set = (key) => (value) => actions.updatePersonal({ [key]: value })
  const err = (key) => (errors[`personal.${key}`] ? t[errors[`personal.${key}`]] : undefined)

  return (
    <SectionCard id="section-personal" title={t.personalInfo} icon={UserRound}>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label={t.fullName} value={p.fullName} onChange={set('fullName')} required hint={t.fullNameHint} maxLength={200} autoComplete="name" className="sm:col-span-2" />
        <TextField label={t.jobTitle} value={p.jobTitle} onChange={set('jobTitle')} optionalLabel={t.optional} maxLength={200} className="sm:col-span-2" />
        <TextField label={t.email} type="email" dir="ltr" value={p.email} onChange={set('email')} error={err('email')} optionalLabel={t.optional} maxLength={200} />
        <TextField label={t.phone} type="tel" dir="ltr" value={p.phone} onChange={set('phone')} optionalLabel={t.optional} maxLength={40} />
        <TextField label={t.location} value={p.location} onChange={set('location')} optionalLabel={t.optional} maxLength={200} className="sm:col-span-2" />
        <TextField label={t.linkedin} dir="ltr" value={p.linkedin} onChange={set('linkedin')} error={err('linkedin')} placeholder="linkedin.com/in/…" optionalLabel={t.optional} maxLength={200} />
        <TextField label={t.github} dir="ltr" value={p.github} onChange={set('github')} error={err('github')} placeholder="github.com/…" optionalLabel={t.optional} maxLength={200} />
        <TextField label={t.portfolio} dir="ltr" value={p.portfolio} onChange={set('portfolio')} error={err('portfolio')} placeholder="https://…" optionalLabel={t.optional} maxLength={200} className="sm:col-span-2" />
      </div>
    </SectionCard>
  )
}
