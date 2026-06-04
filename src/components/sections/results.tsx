import { TrendingUp, Award, Users2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal'
import { ScalePattern } from '@/components/ui/scale-pattern'

const stats = [
  { value: '1 200+', label: 'студентов получили сертификат HSK' },
  { value: '94%', label: 'сдают экзамен с первой попытки' },
  { value: '4.9', label: 'средняя оценка школы по отзывам' },
  { value: '38', label: 'студентов поступили в вузы Китая' },
]

const stories = [
  {
    icon: Award,
    name: 'Карина, 17 лет',
    badge: 'HSK 4 за 8 месяцев',
    text: 'Поступила на бюджетную программу с языковой стипендией в Тяньцзине. Год назад не знала ни одного иероглифа.',
  },
  {
    icon: TrendingUp,
    name: 'Тимур, 29 лет',
    badge: 'HSK 5 · логист',
    text: 'Перешёл на позицию менеджера по работе с китайскими поставщиками. Теперь веду переговоры без переводчика.',
  },
  {
    icon: Users2,
    name: 'Семья Нурлановых',
    badge: 'HSK 2 · родители и дети',
    text: 'Записали сына в детскую группу, а через месяц присоединились сами. Учим китайский всей семьёй по выходным.',
  },
]

export function Results() {
  return (
    <section id="results" className="relative py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Результаты студентов"
          title={
            <>
              Цифры, за которыми — <span className="text-cinnabar">реальные истории</span>
            </>
          }
          description="Мы измеряем успех не количеством уроков, а сертификатами, поступлениями и карьерой наших выпускников."
        />

        {/* Stats band */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-lg border border-ink/10 bg-ink text-porcelain">
            <ScalePattern className="absolute inset-0 h-full w-full text-porcelain/8" />
            <span className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 font-han text-[10rem] font-700 leading-none text-cinnabar/20">
              成
            </span>
            <div className="relative grid divide-y divide-porcelain/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {stats.map((s) => (
                <div key={s.label} className="px-8 py-9">
                  <div className="font-display text-5xl font-700 text-gold-soft">{s.value}</div>
                  <div className="mt-2 text-sm leading-snug text-porcelain/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Success stories */}
        <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <RevealItem key={s.name} className="h-full">
              <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-white/60 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cinnabar-tint text-cinnabar-deep">
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <span className="rounded-sm bg-cinnabar/10 px-2.5 py-1 font-sans text-xs font-600 text-cinnabar-deep">
                    {s.badge}
                  </span>
                </div>
                <p className="mt-5 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">«{s.text}»</p>
                <p className="mt-5 font-display text-lg font-600 text-ink">{s.name}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
