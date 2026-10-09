import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Remove a extensão de um caminho de imagem (`/a/b.jpg` → `/a/b`). */
export function imageBase(path: string) {
  return path.replace(/\.[a-z0-9]+$/i, '')
}
