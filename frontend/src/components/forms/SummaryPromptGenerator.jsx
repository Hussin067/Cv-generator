import { Check, ClipboardCopy, RotateCcw, Wand2 } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { useBuilder } from '../../hooks/useBuilder'
import { useI18n } from '../../hooks/useI18n'
import { buildSummaryPrompt, CAREER_LEVELS, promptValuesFromCv } from '../../utils/summaryPrompt'
import Button from '../ui/Button'
import { SelectField, TextArea, TextField } from '../ui/Field'
import Modal from '../ui/Modal'

/**
 * Generates a ready-to-copy prompt for writing the professional summary with any AI assistant.
 * The app itself never sends the prompt anywhere; the user copies and pastes it.
 */
export default function SummaryPromptGenerator() {
  const { t } = useI18n()
  const { cv, lang } = useBuilder()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState(null)
  const [copied, setCopied] = useState(false)
  const outputId = useId()

  const openGenerator = () => {
    setValues(promptValuesFromCv(cv, lang))
    setCopied(false)
    setOpen(true)
  }
  const set = (key) => (value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setCopied(false)
  }
  const prompt = useMemo(() => (values ? buildSummaryPrompt(values) : ''), [values])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      // Clipboard API unavailable (e.g. non-secure context): select the text so the user can copy it.
      const box = document.getElementById(outputId)
      box?.focus()
      box?.select()
      document.execCommand?.('copy')
    }
    setCopied(true)
  }

  return (
    <>
      <div>
        <Button size="sm" icon={Wand2} onClick={openGenerator}>
          {t.promptGenerator}
        </Button>
      </div>
      {open && values && (
        <Modal
          title={t.promptGenerator}
          onClose={() => setOpen(false)}
          size="lg"
          footer={
            <>
              <Button variant="ghost" icon={RotateCcw} onClick={() => setValues(promptValuesFromCv(cv, lang))}>
                {t.promptRefill}
              </Button>
              <Button variant="primary" icon={copied ? Check : ClipboardCopy} onClick={copy}>
                {copied ? t.promptCopied : t.promptCopy}
              </Button>
            </>
          }
        >
          <p className="mb-4 text-sm text-slate-600">{t.promptIntro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField
              label={t.promptCareerLevel}
              value={values.career_level}
              onChange={set('career_level')}
              options={[{ value: '', label: t.promptChoose }, ...CAREER_LEVELS.map((level) => ({ value: level, label: t.careerLevels[level] }))]}
            />
            <SelectField
              label={t.promptLanguage}
              value={values.language}
              onChange={set('language')}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Arabic', label: 'العربية' },
              ]}
            />
            <TextField label={t.promptField} value={values.field} onChange={set('field')} maxLength={200} />
            <TextField label={t.promptTargetRole} value={values.target_role} onChange={set('target_role')} maxLength={200} />
            <TextArea label={t.promptEducation} value={values.education} onChange={set('education')} rows={2} className="sm:col-span-2" />
            <TextArea label={t.promptSkills} value={values.skills} onChange={set('skills')} rows={2} className="sm:col-span-2" />
            <TextArea label={t.promptExperience} value={values.experience} onChange={set('experience')} rows={3} className="sm:col-span-2" />
            <TextArea
              label={t.promptStrengths}
              value={values.strengths}
              onChange={set('strengths')}
              hint={t.promptStrengthsHint}
              rows={2}
              className="sm:col-span-2"
            />
          </div>

          <label htmlFor={outputId} className="mb-1 mt-5 block text-sm font-semibold text-slate-800">
            {t.promptOutput}
          </label>
          <textarea
            id={outputId}
            readOnly
            dir="ltr"
            rows={10}
            value={prompt}
            className="block w-full resize-y rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
          <p className="mt-2 text-xs text-slate-500">{t.promptHowTo}</p>
        </Modal>
      )}
    </>
  )
}
