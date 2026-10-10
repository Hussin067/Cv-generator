import { UserRound } from 'lucide-react'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import { shortenUrl } from '../../utils/cvFormatting'
import { TextField } from '../ui/Field'
import { SectionCard } from '../ui/SectionCard'

export default function PersonalInfoForm() {
  const { t } = useI18n()
  const { cv, actions, errors, exportAttempted } = useBuilder()
  const p = cv.personal
  const set = (key) => (value) => actions.updatePersonal({ [key]: value })
  const err = (key) => {
    const code = errors[`personal.${key}`]
    // "Required" messages appear only after a download attempt, so a new form isn't covered in red.
    if (!code || (code === 'requiredField' && !exportAttempted)) return undefined
    return t[code]
  }
  // Long pasted links are trimmed to their meaningful part when the field loses focus.
  const shorten = (key) => () => {
    const short = shortenUrl(p[key])
    if (short !== p[key]) actions.updatePersonal({ [key]: short })
  }

  return (
    <SectionCard id="section-personal" title={t.personalInfo} icon={UserRound}>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label={t.fullName}
          value={p.fullName}
          onChange={set('fullName')}
          error={err('fullName')}
          required
          hint={t.fullNameHint}
          maxLength={200}
          autoComplete="name"
          className="sm:col-span-2"
        />
        <TextField label={t.jobTitle} value={p.jobTitle} onChange={set('jobTitle')} optionalLabel={t.optional} maxLength={200} className="sm:col-span-2" />
        <TextField label={t.email} type="email" dir="ltr" value={p.email} onChange={set('email')} error={err('email')} required maxLength={200} autoComplete="email" />
        <TextField label={t.phone} type="tel" dir="ltr" value={p.phone} onChange={set('phone')} error={err('phone')} required maxLength={40} autoComplete="tel" />
        <TextField
          label={t.linkedin}
          dir="ltr"
          value={p.linkedin}
          onChange={set('linkedin')}
          onBlur={shorten('linkedin')}
          error={err('linkedin')}
          placeholder="linkedin.com/in/…"
          hint={t.linkHint}
          optionalLabel={t.optional}
          maxLength={300}
        />
        <TextField
          label={t.github}
          dir="ltr"
          value={p.github}
          onChange={set('github')}
          onBlur={shorten('github')}
          error={err('github')}
          placeholder="github.com/…"
          optionalLabel={t.optional}
          maxLength={300}
        />
        <TextField
          label={t.portfolio}
          dir="ltr"
          value={p.portfolio}
          onChange={set('portfolio')}
          onBlur={shorten('portfolio')}
          error={err('portfolio')}
          placeholder="https://…"
          optionalLabel={t.optional}
          maxLength={300}
          className="sm:col-span-2"
        />
      </div>
    </SectionCard>
  )
}
