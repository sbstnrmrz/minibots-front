import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Headphones, CalendarCheck, TrendingUp, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  GeneralInformationForm,
  type GeneralInfoValues,
} from '@/features/agents/forms/general-information-form'

type AgentTypeId = 'customer-support' | 'scheduling' | 'sales'

const agentMeta: Record<
  AgentTypeId,
  {
    label: string
    icon: React.ComponentType<{ className?: string }>
    iconBg: string
    iconColor: string
    placeholder: string
  }
> = {
  'customer-support': {
    label: 'Atención al Cliente',
    icon: Headphones,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    placeholder:
      'Eres un asistente de atención al cliente amable y profesional. Tu objetivo es resolver las dudas y problemas de los clientes de manera eficiente. Siempre mantén un tono cordial y empático...',
  },
  scheduling: {
    label: 'Agendamientos',
    icon: CalendarCheck,
    iconBg: 'bg-sidebar-primary/10',
    iconColor: 'text-sidebar-primary',
    placeholder:
      'Eres un asistente de agendamiento. Ayudas a los clientes a agendar, modificar y cancelar citas de manera sencilla. Confirmas siempre los detalles antes de registrar cualquier cambio...',
  },
  sales: {
    label: 'Tienda',
    icon: TrendingUp,
    iconBg: 'bg-secondary/60',
    iconColor: 'text-secondary-foreground',
    placeholder:
      'Eres un asistente de tienda. Presentas el catálogo de productos de forma clara, respondes preguntas sobre disponibilidad y precios, y guías al cliente durante el proceso de compra...',
  },
}

const instructionsSchema = z.object({
  instructions: z.string().min(1, 'Las instrucciones son requeridas'),
})

const textareaCls = cn(
  'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] resize-none',
  'placeholder:text-muted-foreground',
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  'dark:bg-input/30',
)

export const Route = createFileRoute('/agent-setup')({
  validateSearch: (search) => ({
    type: (search.type as AgentTypeId) ?? 'customer-support',
  }),
  component: AgentSetup,
})

function StepIndicator({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground">
          1
        </div>
        <span className={cn('text-sm font-medium', current === 1 ? 'text-foreground' : 'text-muted-foreground')}>
          Información general
        </span>
      </div>
      <div className="flex-1 h-px bg-border" />
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
            current === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          2
        </div>
        <span className={cn('text-sm font-medium', current === 2 ? 'text-foreground' : 'text-muted-foreground')}>
          Configuración del agente
        </span>
      </div>
    </div>
  )
}

function AgentSetup() {
  const navigate = useNavigate()
  const { type } = Route.useSearch()
  const meta = agentMeta[type] ?? agentMeta['customer-support']
  const Icon = meta.icon

  const [step, setStep] = useState<1 | 2>(1)
  const [generalValues, setGeneralValues] = useState<GeneralInfoValues | null>(null)

  const configForm = useForm({
    defaultValues: { instructions: '' },
    onSubmit: ({ value }) => {
      console.log('Submit', { general: generalValues, ...value })
    },
  })

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate({ to: '/agent-tiers' }))}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          {step === 2 ? 'Paso anterior' : 'Volver'}
        </button>

        <div className="text-center mb-10">
          <div className={cn('size-14 rounded-xl flex items-center justify-center mx-auto mb-4', meta.iconBg)}>
            <Icon className={cn('size-7', meta.iconColor)} />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Configura tu Agente</h1>
          <p className="text-muted-foreground">
            Agente de <span className="text-foreground font-medium">{meta.label}</span>
          </p>
        </div>

        <StepIndicator current={step} />

        {step === 1 && (
          <GeneralInformationForm
            onSubmit={(values) => {
              setGeneralValues(values)
              setStep(2)
            }}
          />
        )}

        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              configForm.handleSubmit()
            }}
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <configForm.Field
                name="instructions"
                validators={{ onSubmit: instructionsSchema.shape.instructions }}
              >
                {(f) => (
                  <>
                    <label htmlFor="instructions" className="block text-sm font-medium text-foreground mb-2">
                      Instrucciones del agente <span className="text-destructive">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Describe cómo debe comportarse, qué tono usar y qué objetivos tiene el agente.
                    </p>
                    <textarea
                      id="instructions"
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                      onBlur={f.handleBlur}
                      placeholder={meta.placeholder}
                      rows={8}
                      className={cn(
                        textareaCls,
                        f.state.meta.errors.length > 0 &&
                          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50',
                      )}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {f.state.meta.errors.length > 0 ? (
                        <p className="text-xs text-destructive">{String(f.state.meta.errors[0])}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">{f.state.value.length} caracteres</span>
                    </div>
                  </>
                )}
              </configForm.Field>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" size="lg" className="px-10">
                Crear Agente
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
