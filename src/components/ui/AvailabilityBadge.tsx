import { cn } from '@/lib/utils'

interface AvailabilityBadgeProps {
  label: string
  className?: string
}

export function AvailabilityBadge({ label, className }: AvailabilityBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3.5 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm',
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="badge-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {label}
    </div>
  )
}
