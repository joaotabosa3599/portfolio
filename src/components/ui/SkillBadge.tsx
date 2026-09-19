interface SkillBadgeProps {
  label: string
}

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <li className="rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-light/50 hover:text-text">
      {label}
    </li>
  )
}
