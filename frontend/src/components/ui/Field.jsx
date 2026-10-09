import { useId } from 'react'

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

export function MonthField({ label, value, onChange, error, disabled, optionalLabel, className }) {
  const id = useId()
  return (
    <FieldShell {...{ id, label, error, optionalLabel, className }}>
      <input
        id={id}
        type="month"
        dir="ltr"
        min="1950-01"
        max="2100-12"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass(error)} disabled:bg-slate-100 disabled:text-slate-400`}
      />
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
