import { LoaderCircle } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400',
  secondary: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 disabled:text-slate-400',
  ghost: 'text-slate-700 hover:bg-slate-100 disabled:text-slate-400',
  danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50 disabled:text-red-300',
  dangerSolid: 'bg-red-700 text-white hover:bg-red-800 disabled:bg-red-300',
  ai: 'border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 disabled:text-indigo-300',
}

const SIZES = {
  sm: 'h-8 px-2.5 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  icon: 'h-8 w-8 justify-center',
}

export default function Button({
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  loading = false,
  className = '',
  children,
  type = 'button',
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex shrink-0 items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
      {children}
    </button>
  )
}
