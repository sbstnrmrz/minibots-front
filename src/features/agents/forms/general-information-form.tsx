import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import {
  Plus,
  Trash2,
  FileText,
  Briefcase,
  Target,
  Eye,
  Megaphone,
  HelpCircle,
  Info,
  Share2,
  Globe,
} from 'lucide-react'

import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'
import { TikTokIcon } from '@/components/icons/TikTokIcon'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const req = z.string().min(1, 'Este campo es requerido')

export const generalInfoSchema = z.object({
  description: req,
  services: req,
  mission: req,
  vision: req,
  'sales-pitch': req,
  faq: z.array(
    z.object({
      question: z.string().min(1, 'La pregunta es requerida'),
      answer: z.string().min(1, 'La respuesta es requerida'),
    }),
  ),
  'additional-info': z.string().optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    tiktok: z.string().optional(),
    website: z.string().optional(),
  }),
})

export type GeneralInfoValues = z.input<typeof generalInfoSchema>

const defaultValues: GeneralInfoValues = {
  description: '',
  services: '',
  mission: '',
  vision: '',
  'sales-pitch': '',
  faq: [],
  'additional-info': '',
  socialMedia: {
    instagram: '',
    facebook: '',
    linkedin: '',
    tiktok: '',
    website: '',
  },
}

const socialPlatforms: {
  name: keyof GeneralInfoValues['socialMedia']
  label: string
  placeholder: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { name: 'instagram', label: 'Instagram', placeholder: 'tuempresa', icon: InstagramIcon },
  { name: 'facebook', label: 'Facebook', placeholder: 'tuempresa', icon: FacebookIcon },
  { name: 'linkedin', label: 'LinkedIn', placeholder: 'tuempresa', icon: LinkedInIcon },
  { name: 'tiktok', label: 'TikTok', placeholder: 'tuempresa', icon: TikTokIcon },
  { name: 'website', label: 'Sitio web', placeholder: 'https://tuempresa.com', icon: Globe },
]

const inputCls = cn(
  'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow]',
  'placeholder:text-muted-foreground',
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  'dark:bg-input/30',
)
const textareaCls = cn(inputCls, 'resize-none')
const errorCls = 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50'

function FieldError({ errors }: { errors: unknown[] }) {
  if (!errors.length) return null
  return <p className="text-xs text-destructive mt-1">{String(errors[0])}</p>
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="pt-1 pb-2 border-b border-border">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {children}
      </p>
    </div>
  )
}

type Props = {
  onSubmit: (values: GeneralInfoValues) => void
}

export function GeneralInformationForm({ onSubmit }: Props) {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => onSubmit(value),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">Información general</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Esta información le dará contexto al agente sobre tu empresa para que pueda responder correctamente.
          </p>
        </div>

        {/* Description */}
        <form.Field name="description" validators={{ onSubmit: req }}>
          {(f) => (
            <div>
              <label htmlFor="description" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                <FileText className="size-4 text-muted-foreground" />
                Descripción de la empresa <span className="text-destructive">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                Cuéntanos una descripción breve sobre qué hace tu empresa y cualquier dato importante que consideres debería tener el bot.
              </p>
              <textarea
                id="description"
                value={f.state.value}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                placeholder="Somos una empresa de tecnología que..."
                rows={4}
                className={cn(textareaCls, f.state.meta.errors.length > 0 && errorCls)}
              />
              <FieldError errors={f.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Services */}
        <form.Field name="services" validators={{ onSubmit: req }}>
          {(f) => (
            <div>
              <label htmlFor="services" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                <Briefcase className="size-4 text-muted-foreground" />
                Servicios <span className="text-destructive">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">¿Qué servicios ofrecen?</p>
              <textarea
                id="services"
                value={f.state.value}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                placeholder="Ofrecemos desarrollo de software, consultoría tecnológica..."
                rows={3}
                className={cn(textareaCls, f.state.meta.errors.length > 0 && errorCls)}
              />
              <FieldError errors={f.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <SectionLabel icon={Target}>Identidad corporativa</SectionLabel>

        {/* Mission */}
        <form.Field name="mission" validators={{ onSubmit: req }}>
          {(f) => (
            <div>
              <label htmlFor="mission" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                <Target className="size-4 text-muted-foreground" />
                Misión <span className="text-destructive">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">¿Cuál es la misión de la empresa?</p>
              <textarea
                id="mission"
                value={f.state.value}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                placeholder="Nuestra misión es..."
                rows={3}
                className={cn(textareaCls, f.state.meta.errors.length > 0 && errorCls)}
              />
              <FieldError errors={f.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Vision */}
        <form.Field name="vision" validators={{ onSubmit: req }}>
          {(f) => (
            <div>
              <label htmlFor="vision" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                <Eye className="size-4 text-muted-foreground" />
                Visión <span className="text-destructive">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">¿Cuál es la visión de la empresa?</p>
              <textarea
                id="vision"
                value={f.state.value}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                placeholder="Nuestra visión es..."
                rows={3}
                className={cn(textareaCls, f.state.meta.errors.length > 0 && errorCls)}
              />
              <FieldError errors={f.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <SectionLabel icon={Megaphone}>Propuesta comercial</SectionLabel>

        {/* Sales Pitch */}
        <form.Field name="sales-pitch" validators={{ onSubmit: req }}>
          {(f) => (
            <div>
              <label htmlFor="sales-pitch" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                <Megaphone className="size-4 text-muted-foreground" />
                Pitch de ventas <span className="text-destructive">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-2">¿Cuál es tu pitch de ventas o propuesta comercial?</p>
              <textarea
                id="sales-pitch"
                value={f.state.value}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                placeholder="Con nuestra solución, tus clientes podrán..."
                rows={3}
                className={cn(textareaCls, f.state.meta.errors.length > 0 && errorCls)}
              />
              <FieldError errors={f.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <SectionLabel icon={HelpCircle}>Preguntas frecuentes</SectionLabel>

        {/* FAQ */}
        <form.Field name="faq" mode="array">
          {(faqField) => (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground -mt-2">
                ¿Cuáles son las preguntas más frecuentes que te hacen? Agrégalas con su respuesta.
              </p>

              {faqField.state.value.map((_, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-3 bg-background">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Pregunta {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => faqField.removeValue(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <form.Field
                    name={`faq[${index}].question`}
                    validators={{ onSubmit: z.string().min(1, 'La pregunta es requerida') }}
                  >
                    {(f) => (
                      <div>
                        <input
                          type="text"
                          value={f.state.value}
                          onChange={(e) => f.handleChange(e.target.value)}
                          onBlur={f.handleBlur}
                          placeholder="¿Cuál es la pregunta frecuente?"
                          className={cn(inputCls, f.state.meta.errors.length > 0 && errorCls)}
                        />
                        <FieldError errors={f.state.meta.errors} />
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name={`faq[${index}].answer`}
                    validators={{ onSubmit: z.string().min(1, 'La respuesta es requerida') }}
                  >
                    {(f) => (
                      <div>
                        <textarea
                          value={f.state.value}
                          onChange={(e) => f.handleChange(e.target.value)}
                          onBlur={f.handleBlur}
                          placeholder="Respuesta..."
                          rows={2}
                          className={cn(textareaCls, f.state.meta.errors.length > 0 && errorCls)}
                        />
                        <FieldError errors={f.state.meta.errors} />
                      </div>
                    )}
                  </form.Field>
                </div>
              ))}

              <Button
                type="button"
                size="sm"
                className="w-full"
                onClick={() => faqField.pushValue({ question: '', answer: '' })}
              >
                <Plus className="size-4 mr-2" />
                Agregar pregunta
              </Button>
            </div>
          )}
        </form.Field>

        <SectionLabel icon={Info}>Información adicional</SectionLabel>

        {/* Additional Info */}
        <form.Field name="additional-info">
          {(f) => (
            <div>
              <label htmlFor="additional-info" className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                <Info className="size-4 text-muted-foreground" />
                Información adicional
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                ¿Qué información adicional te gustaría que tuviera el chatbot para contestar a los clientes?
              </p>
              <textarea
                id="additional-info"
                value={f.state.value}
                onChange={(e) => f.handleChange(e.target.value)}
                onBlur={f.handleBlur}
                placeholder="Horarios de atención, políticas de devolución, zonas de cobertura..."
                rows={3}
                className={textareaCls}
              />
            </div>
          )}
        </form.Field>

        <SectionLabel icon={Share2}>Redes sociales</SectionLabel>

        {/* Social Media */}
        <div>
          <p className="text-xs text-muted-foreground mb-4">
            Indica los links de tus redes sociales para que el agente pueda compartirlos cuando sea relevante.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialPlatforms.map((platform) => (
              <form.Field key={platform.name} name={`socialMedia.${platform.name}`}>
                {(f) => (
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1">
                      <platform.icon className="size-3.5" />
                      {platform.label}
                    </label>
                    <input
                      type="text"
                      value={f.state.value}
                      onChange={(e) => f.handleChange(e.target.value)}
                      onBlur={f.handleBlur}
                      placeholder={platform.placeholder}
                      className={inputCls}
                    />
                  </div>
                )}
              </form.Field>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" size="lg" className="px-10">
          Continuar
        </Button>
      </div>
    </form>
  )
}
