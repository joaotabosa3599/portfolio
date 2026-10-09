/**
 * Atmosfera do hero: duas massas de luz e uma grade local, por trás da cena.
 *
 * A luz principal nasce atrás do visual (o "interface" é a fonte); a segunda
 * massa, mais fria e fraca, equilibra o canto oposto. Nada é circular: as
 * massas são elipses rotacionadas, grandes demais para serem lidas como forma.
 * Tudo é gradiente + transform: a camada é composta, nunca re-rasterizada.
 */
export function HeroAtmosphere() {
  return (
    <div data-hero-atmo className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="fog fog-a"
        style={{
          right: '-18%',
          top: '-22%',
          width: '82vw',
          height: '56vw',
          maxWidth: 1240,
          maxHeight: 860,
          background:
            'radial-gradient(closest-side, rgba(127,90,245,0.2), rgba(127,90,245,0.085) 42%, rgba(127,90,245,0.02) 68%, transparent 100%)',
        }}
      />
      <div
        className="fog fog-b"
        style={{
          left: '-26%',
          bottom: '-34%',
          width: '64vw',
          height: '40vw',
          maxWidth: 980,
          maxHeight: 620,
          background: 'radial-gradient(closest-side, rgba(94,234,212,0.07), rgba(94,234,212,0.02) 55%, transparent 100%)',
        }}
      />

      {/* Grade: só ao redor da cena, com máscara. Some com o scroll. */}
      <div
        data-hero-grid
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          backgroundPosition: 'center center',
          WebkitMaskImage: 'radial-gradient(ellipse 34% 48% at 74% 52%, rgba(0,0,0,0.9) 0%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 34% 48% at 74% 52%, rgba(0,0,0,0.9) 0%, transparent 100%)',
        }}
      />

      {/* Vinheta: apaga as bordas e dá foco ao centro. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 42%, transparent 55%, var(--color-bg) 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  )
}
