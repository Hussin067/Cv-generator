import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

const STYLES = {
  info: ['border-sky-200 bg-sky-50 text-sky-900', Info],
  warning: ['border-amber-200 bg-amber-50 text-amber-900', AlertTriangle],
  error: ['border-red-200 bg-red-50 text-red-900', XCircle],
  success: ['border-emerald-200 bg-emerald-50 text-emerald-900', CheckCircle2],
}

export default function Alert({ tone = 'info', title, children, action, className = '' }) {
  const [style, Icon] = STYLES[tone]
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`flex gap-3 rounded-md border px-3 py-2.5 text-sm ${style} ${className}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={title ? 'mt-0.5' : ''}>{children}</div>}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  )
}
