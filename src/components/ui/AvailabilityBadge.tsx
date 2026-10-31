import { cn } from '@/lib/utils'

interface AvailabilityBadgeProps {
  label: string
  className?: string
}

/** Status real de disponibilidade. A cor de sucesso só aparece aqui e na timeline. */
export function AvailabilityBadge({ label, className }: AvailabilityBadgeProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-3 pr-3.5 text-[0.8125rem] text-text-secondary',
        className,
      )}
    >
      <span className="relative flex size-1.5" aria-hidden="true">
        <span className="status-ping absolute inset-0 rounded-full bg-success" />
        <span className="relative size-1.5 rounded-full bg-success" />
      </span>
      {label}
    </p>
  )
}
