import { useState, type FormEvent } from 'react'
import { Phone, Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScalePattern } from '@/components/ui/scale-pattern'

const levels = ['С нуля', 'HSK 1–2', 'HSK 3–4', 'HSK 5–6', 'Подготовка к экзамену', 'Для ребёнка']

// В нашей версии Lucide нет бренд-иконок, поэтому используем встроенные SVG.
type IconProps = React.SVGProps<SVGSVGElement>

function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94" />
    </svg>
  )
}

type Contact = {
  // допускаем любые SVG-пропсы (lucide-иконки + наш WhatsAppIcon)
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
  href: string
  external?: boolean
}

const contacts: Contact[] = [
  { icon: Phone, label: 'Телефон', value: '+7 702 366 4904', href: 'tel:+77023664904' },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: '+7 702 366 4904', href: 'https://wa.me/77023664904', external: true },
  { icon: InstagramIcon, label: 'Instagram', value: '@tomiris_chinese', href: 'https://www.instagram.com/tomiris_chinese/', external: true },
  { icon: FacebookIcon, label: 'Facebook', value: 'Tomiris Chinese School', href: 'https://www.facebook.com/121198601081163/', external: true },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Enroll() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [level, setLevel] = useState(levels[0])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMsg(null)
    setStatus('loading')

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      level: String(data.get('level') ?? '').trim(),
      comment: String(data.get('comment') ?? '').trim(),
      // honeypot — настоящие пользователи это поле не видят и не заполняют
      website: String(data.get('website') ?? ''),
    }

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error ?? `Сервер ответил статусом ${res.status}`)
      }

      form.reset()
      setLevel(levels[0])
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.',
      )
    }
  }

  function reset() {
    setStatus('idle')
    setErrorMsg(null)
  }

  return (
    <section id="enroll" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ScalePattern className="absolute -left-10 bottom-0 h-80 w-80 text-cinnabar opacity-[0.12]" />
      </div>
      <div className="container-px">
        <div className="grid overflow-hidden rounded-lg border border-ink/12 shadow-lift lg:grid-cols-2">
          {/* Info side */}
          <div className="relative flex flex-col justify-between bg-ink p-9 text-porcelain sm:p-12">
            <ScalePattern className="absolute inset-0 hidden h-full w-full text-porcelain opacity-[0.07] sm:block" />
            <div className="relative">
              <span className="eyebrow text-gold-soft before:bg-gold-soft">Запись на обучение</span>
              <h2 className="mt-6 font-display text-4xl font-600 leading-tight sm:text-5xl">
                Первый шаг —<br />
                <span className="text-gold-soft">Записаться на пробный урок</span>
              </h2>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-porcelain/75">
                Оставьте заявку — методист свяжется в течение рабочего дня, определит ваш уровень и
                подберёт формат. Без обязательств и навязывания.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {['Тест уровня и личный план', 'Знакомство с преподавателем', 'Ответы на все вопросы'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-porcelain/85">
                    <Check className="h-4 w-4 text-gold-soft" strokeWidth={2.4} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-10 flex flex-col gap-4 border-t border-porcelain/15 pt-7">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-3.5 text-sm"
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-porcelain/20 text-gold-soft transition-colors group-hover:bg-porcelain/10">
                    <c.icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-wide text-porcelain/50">{c.label}</span>
                    <span className="text-porcelain/90">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div className="bg-porcelain p-9 sm:p-12">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-cinnabar text-porcelain">
                  <Check className="h-8 w-8" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 font-display text-3xl font-600 text-ink">Заявка принята!</h3>
                <p className="mt-3 max-w-sm text-ink-soft">
                  Спасибо за доверие. Мы свяжемся с вами в ближайшее время и договоримся об удобном
                  времени для пробного урока. <span className="font-han text-cinnabar">谢谢！</span>
                </p>
                <Button variant="outline" className="mt-7" onClick={reset}>
                  Отправить ещё одну
                </Button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                {/* honeypot — спрятан от людей, виден ботам */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Как вас зовут" required>
                    <input id="name" name="name" required placeholder="Имя и фамилия" className={inputCls} />
                  </Field>
                  <Field id="phone" label="Телефон" required>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      placeholder="+7 ___ ___ __ __"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field id="email" label="Электронная почта">
                  <input id="email" name="email" type="email" placeholder="you@example.com" className={inputCls} />
                </Field>

                <Field id="level" label="Желаемый уровень">
                  <div className="flex flex-wrap gap-2">
                    {levels.map((l) => (
                      <button
                        type="button"
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`rounded-md border px-3.5 py-2 text-sm font-500 transition-colors ${
                          level === l
                            ? 'border-cinnabar bg-cinnabar text-porcelain'
                            : 'border-ink/15 text-ink-soft hover:border-cinnabar/50'
                        }`}
                        aria-pressed={level === l}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="level" value={level} />
                </Field>

                <Field id="comment" label="Комментарий">
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    placeholder="Расскажите о ваших целях — для чего учите китайский"
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {status === 'error' && errorMsg && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-md border border-cinnabar/40 bg-cinnabar/5 p-3 text-sm text-cinnabar-deep"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <Button type="submit" size="lg" className="mt-1 w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Записаться на пробный урок
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-ink-muted">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inputCls =
  'w-full rounded-md border border-ink/15 bg-white px-4 py-3 font-sans text-[0.95rem] text-ink placeholder:text-ink-muted/70 transition-colors focus:border-cinnabar focus:outline-none focus:ring-2 focus:ring-cinnabar/20'

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-sm font-600 text-ink">
        {label}
        {required && <span className="ml-1 text-cinnabar">*</span>}
      </label>
      {children}
    </div>
  )
}
