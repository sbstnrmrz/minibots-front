import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Headphones, CalendarCheck, TrendingUp, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AgentOption = {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  features: string[]
  iconBg: string
  iconColor: string
}

const agentOptions: AgentOption[] = [
  {
    id: 'customer-support',
    name: 'Atención al Cliente',
    icon: Headphones,
    description:
      'Responde preguntas, resuelve problemas y brinda soporte a tus clientes de forma automática.',
    features: [
      'Respuestas instantáneas 24/7',
      'Escalamiento inteligente',
      'Historial de conversaciones',
      'Integración con CRM',
    ],
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 'scheduling',
    name: 'Agendamientos',
    icon: CalendarCheck,
    description:
      'Gestiona citas, reservas y calendarios sin intervención humana.',
    features: [
      'Sincronización de calendarios',
      'Recordatorios automáticos',
      'Gestión de disponibilidad',
      'Confirmaciones y cancelaciones',
    ],
    iconBg: 'bg-sidebar-primary/10',
    iconColor: 'text-sidebar-primary',
  },
  {
    id: 'sales',
    name: 'Tienda',
    icon: TrendingUp,
    description:
      'Convierte visitantes en clientes con conversaciones personalizadas de ventas.',
    features: [
      'Calificación de leads',
      'Catálogo de productos',
      'Seguimiento de oportunidades',
      'Cierre automatizado',
    ],
    iconBg: 'bg-secondary/60',
    iconColor: 'text-secondary-foreground',
  },
]

export const Route = createFileRoute('/agent-tiers')({
  component: AgentTiers,
})

function AgentTiers() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Elige tu tipo de Agente
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Selecciona el agente que mejor se adapte a las necesidades de tu
            negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agentOptions.map((agent) => {
            const Icon = agent.icon
            const isSelected = selected === agent.id

            return (
              <button
                key={agent.id}
                onClick={() => setSelected(agent.id)}
                className={cn(
                  'relative flex flex-col text-left rounded-xl border-2 bg-card p-6 transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer',
                  isSelected
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-primary/40',
                )}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 size-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="size-3 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={cn(
                    'size-12 rounded-lg flex items-center justify-center mb-4',
                    agent.iconBg,
                  )}
                >
                  <Icon className={cn('size-6', agent.iconColor)} />
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {agent.name}
                </h2>

                <p className="text-sm text-muted-foreground mb-5">
                  {agent.description}
                </p>

                <ul className="space-y-2 mt-auto">
                  {agent.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Check className="size-3.5 text-sidebar-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            size="lg"
            disabled={!selected}
            className="px-10"
            onClick={() =>
              navigate({ to: '/agent-setup', search: { type: selected! } })
            }
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
