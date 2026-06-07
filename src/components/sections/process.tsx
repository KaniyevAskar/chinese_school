import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'

const steps = [
  {
    n: '01',
    title: 'Знакомство и тест уровня',
    text: 'На пробном уроке определяем ваш уровень, цели и сроки. Подбираем группу или индивидуальный формат.',
  },
  {
    n: '02',
    title: 'Личный план обучения',
    text: 'Методист составляет маршрут до нужного уровня HSK с понятными контрольными точками и расписанием.',
  },
  {
    n: '03',
    title: 'Живые занятия и практика',
    text: 'Уроки с преподавателем плюс разговорные клубы с носителями. Говорите с первого занятия, а не через год.',
  },
  {
    n: '04',
    title: 'Контроль и обратная связь',
    text: 'Каждый месяц — срез знаний и разбор ошибок. Вы видите прогресс в личном кабинете и не теряете мотивацию.',
  },
  {
    n: '05',
    title: 'Сертификация HSK',
    text: 'Готовим к экзамену, проводим пробные тесты и сопровождаем при регистрации. Результат — официальный сертификат.',
  },
]

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Как проходит обучение"
            title={
              <>
                Путь от новичка
                <br />к <span className="text-cinnabar">сертификату</span>
              </>
            }
            description="Понятная система из пяти шагов. Без хаоса и «учим всё подряд» — каждый этап приближает к конкретной цели."
          />

          <RevealGroup className="relative">
            {/* vertical line */}
            <span className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-cinnabar/50 via-gold/40 to-transparent" aria-hidden="true" />
            <ol className="flex flex-col gap-8">
              {steps.map((s) => (
                <RevealItem key={s.n}>
                  <li className="group relative flex gap-6">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-cinnabar/30 bg-porcelain font-display text-xl font-700 text-cinnabar-deep transition-colors duration-300 group-hover:bg-cinnabar group-hover:text-porcelain">
                      {s.n}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-display text-2xl font-600 text-ink">{s.title}</h3>
                      <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">{s.text}</p>
                    </div>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
