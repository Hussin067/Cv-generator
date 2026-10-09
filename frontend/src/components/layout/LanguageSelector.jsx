import { useId } from 'react'

/** Two-option segmented control (English / العربية). */
export default function LanguageSelector({ label, value, onChange, icon: Icon }) {
  const id = useId()
  const options = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ]
  return (
    <div role="radiogroup" aria-labelledby={id} className="flex items-center gap-1.5">
      <span id={id} className="flex items-center gap-1 text-xs font-medium text-slate-500">
        {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
        <span className="hidden xl:inline">{label}</span>
        <span className="sr-only xl:hidden">{label}</span>
      </span>
      <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            lang={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded px-2 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 ${
              value === option.value ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
