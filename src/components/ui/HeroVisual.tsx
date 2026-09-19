export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 50% 25%, transparent 0%, var(--color-bg) 78%)',
        }}
      />

      <div className="absolute left-1/2 top-[6%] h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
      <div className="absolute right-[10%] top-[22%] h-[200px] w-[200px] rounded-full bg-accent-cyan/15 blur-[90px]" />

      <svg
        className="absolute -right-16 top-24 hidden w-[420px] text-border-strong opacity-70 lg:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="199" stroke="currentColor" strokeDasharray="2 8" />
        <circle cx="200" cy="200" r="140" stroke="currentColor" strokeOpacity="0.6" />
        <path d="M200 1V60" stroke="currentColor" />
        <path d="M200 340V399" stroke="currentColor" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  )
}
