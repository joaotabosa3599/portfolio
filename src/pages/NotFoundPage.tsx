import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-sm text-accent-light">404</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-text-secondary">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button to="/" className="mt-8" icon={<ArrowLeft size={16} />} iconPosition="left">
        Voltar para o início
      </Button>
    </section>
  )
}
