import { motion } from 'framer-motion'
import type { TimelineItem } from '@/data/experience'
import { cn } from '@/lib/utils'

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative ml-1 space-y-8 border-l border-border pl-8">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <span
            className={cn(
              'absolute -left-[2.28rem] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2',
              item.status === 'upcoming'
                ? 'border-border-strong bg-bg'
                : 'border-accent bg-accent shadow-[0_0_12px_-2px_rgba(127,90,245,0.8)]',
            )}
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-base font-semibold text-text">{item.title}</h3>
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted">{item.period}</span>
          </div>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-secondary">{item.description}</p>
        </motion.li>
      ))}
    </ol>
  )
}
