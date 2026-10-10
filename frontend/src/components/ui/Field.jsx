import { useId, useState } from 'react'
import { useI18n } from '../../hooks/useI18n'

const inputClass = (error) =>
  `block w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 ${
    error ? 'border-red-500' : 'border-slate-300'
  }`

function FieldShell({ id, label, hint, error, required, optionalLabel, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 flex items-baseline gap-1.5 text-sm font-medium text-slate-800">
        {label}
        {required && <span className="text-red-600" aria-hidden="true">*</span>}
        {optionalLabel && <span className="text-xs font-normal text-slate-500">{optionalLabel}</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

const describedBy = (id, hint, error) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

export function TextField({ label, value, onChange, hint, error, required, optionalLabel, className, type = 'text', dir = 'auto', ...props }) {
  const id = useId()
  return (
    <FieldShell {...{ id, label, hint, error, required, optionalLabel, className }}>
      <input
        id={id}
        type={type}
        dir={dir}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={required || undefined}
        autoComplete="off"
        className={inputClass(error)}
        {...props}
      />
    </FieldShell>
  )
}

export function TextArea({ label, value, onChange, hint, error, optionalLabel, className, rows = 4, ...props }) {
  const id = useId()
  return (
    <FieldShell {...{ id, label, hint, error, optionalLabel, className }}>
      <textarea
        id={id}
        dir="auto"
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputClass(error)} resize-y leading-relaxed`}
        {...props}
      />
    </FieldShell>
  )
}

export function SelectField({ label, value, onChange, options, hint, className }) {
  const id = useId()
  return (
    <FieldShell {...{ id, label, hint, className }}>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass(false)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

// Years offered in date dropdowns: from 1970 to a few years ahead (for expected graduation dates).
const YEARS = (() => {
  const years = []
  for (let y = new Date().getFullYear() + 8; y >= 1970; y -= 1) years.push(String(y))
  return years
})()

/**
 * Month + year picker built from two plain dropdowns. It looks the same in every browser,
 * shows month names in the interface language, and stores "YYYY-MM" ('' until both parts are chosen).
 */
export function MonthField({ label, value, onChange, error, disabled, optionalLabel, className }) {
  const id = useId()
  const { t } = useI18n()
  // Keeps a half-finished choice (only month or only year) until the other part is picked.
  const [draft, setDraft] = useState({ month: '', year: '' })
  const [valueYear, valueMonth] = value ? value.split('-') : ['', '']
  const month = value ? valueMonth : draft.month
  const year = value ? valueYear : draft.year

  const update = (nextMonth, nextYear) => {
    if (nextMonth && nextYear) {
      setDraft({ month: '', year: '' })
      onChange(`${nextYear}-${nextMonth}`)
    } else {
      setDraft({ month: nextMonth, year: nextYear })
      if (value) onChange('')
    }
  }

  const selectClass = `${inputClass(error)} disabled:bg-slate-100 disabled:text-slate-400`

  return (
    <FieldShell {...{ id, label, error, optionalLabel, className }}>
      <div className="grid grid-cols-[3fr_2fr] gap-2">
        <select
          id={id}
          value={month}
          disabled={disabled}
          onChange={(event) => update(event.target.value, year)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={selectClass}
        >
          <option value="">{t.monthPlaceholder}</option>
          {t.monthNames.map((name, index) => (
            <option key={name} value={String(index + 1).padStart(2, '0')}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={year}
          disabled={disabled}
          onChange={(event) => update(month, event.target.value)}
          aria-label={`${label} – ${t.yearPlaceholder}`}
          aria-invalid={error ? true : undefined}
          className={selectClass}
        >
          <option value="">{t.yearPlaceholder}</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </FieldShell>
  )
}

export function Checkbox({ label, checked, onChange, className = '' }) {
  const id = useId()
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-sky-600"
      />
      <label htmlFor={id} className="text-sm text-slate-700">
        {label}
      </label>
    </div>
  )
}
