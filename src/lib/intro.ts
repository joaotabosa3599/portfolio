import { useSyncExternalStore } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Estado da abertura, compartilhado entre a overlay (`Intro`) e o hero.
 *
 *   playing  → a cena se monta na overlay; o hero espera escondido
 *   landing  → a cena voa para o lugar dela no hero; o texto do hero entra
 *   done     → overlay sai; o hero mostra a própria cena no mesmo quadro
 *   skipped  → não houve (ou não terminou) abertura: o hero faz a entrada normal
 */
export type IntroStatus = 'playing' | 'landing' | 'done' | 'skipped'

const STORAGE_KEY = 'jt-intro-seen'

let status: IntroStatus | null = null
const listeners = new Set<(status: IntroStatus) => void>()

/**
 * A abertura só faz sentido uma vez por sessão, na home, chegando pelo topo,
 * sem `prefers-reduced-motion` e sem economia de dados. `?intro` força.
 */
function decide(): IntroStatus {
  if (typeof window === 'undefined') return 'skipped'

  const forced = new URLSearchParams(window.location.search).has('intro')
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  let seen = false
  try {
    seen = sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    seen = false
  }

  const play =
    forced ||
    (!seen &&
      !prefersReducedMotion() &&
      !connection?.saveData &&
      window.location.pathname === '/' &&
      !window.location.hash &&
      window.scrollY < 40)

  if (play) {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // sem storage, a abertura simplesmente roda de novo na próxima vez
    }
  }
  return play ? 'playing' : 'skipped'
}

export const intro = {
  get status(): IntroStatus {
    if (status === null) status = decide()
    return status
  },
  set(next: IntroStatus) {
    status = next
    for (const listener of listeners) listener(next)
  },
  subscribe(listener: (status: IntroStatus) => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

export function useIntroStatus() {
  return useSyncExternalStore(intro.subscribe, () => intro.status, () => 'skipped' as IntroStatus)
}
