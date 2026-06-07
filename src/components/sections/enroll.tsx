import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin, Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScalePattern } from '@/components/ui/scale-pattern'

const levels = ['С нуля', 'HSK 1–2', 'HSK 3–4', 'HSK 5–6', 'Подготовка к экзамену', 'Для ребёнка']

const contacts = [
  { icon: Phone, label: 'Телефон', value: '+7 (700) 318‑22‑09', href: 'tel:+77003182209' },
  { icon: Mail, label: 'Почта', value: 'hello@tomiris.school', href: 'mailto:hello@tomiris.school' },
  { icon: MapPin, label: 'Студия', value: 'Алматы, пр. Достык 91, 3 этаж', href: '#' },
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
        <ScalePattern className="absolute -left-10 bottom-0 h-80 w-80 text-cinnabar/12" />
      </div>
      <div className="container-px">
        <div className="grid overflow-hidden rounded-lg border border-ink/12 shadow-lift lg:grid-cols-2">
          {/* Info side */}
          <div className="relative flex flex-col justify-between bg-ink p-9 text-porcelain sm:p-12">
            <ScalePattern className="absolute inset-0 h-full w-full text-porcelain/6" />
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
                <a key={c.label} href={c.href} className="group flex items-center gap-3.5 text-sm">
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
