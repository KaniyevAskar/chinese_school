import { Briefcase, Globe2, GraduationCap, Compass } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'

const reasons = [
  {
    icon: Briefcase,
    han: '事业',
    title: 'Карьера и доход',
    text: 'Специалисты со знанием китайского зарабатывают в среднем на 30–40% больше. Логистика, IT, торговля и переводы открывают вакансии, недоступные другим.',
  },
  {
    icon: Globe2,
    han: '商业',
    title: 'Международный бизнес',
    text: 'Китай — крупнейший торговый партнёр региона. Умение вести переговоры на языке партнёра ценится выше любого посредника и экономит на сделках.',
  },
  {
    icon: GraduationCap,
    han: '教育',
    title: 'Образование за рубежом',
    text: 'Гранты и стипендии в университетах Китая покрывают обучение и проживание. Сертификат HSK — обязательное условие для большинства программ.',
  },
  {
    icon: Compass,
    han: '文化',
    title: 'Путешествия и культура',
    text: 'Полтора миллиарда носителей, тысячелетняя история и кухня, кино, каллиграфия. Язык превращает поездку в погружение, а не в роль туриста.',
  },
]

export function WhyChinese() {
  return (
    <section id="why" className="relative py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Зачем учить китайский"
          title={
            <>
              Один язык — <span className="text-cinnabar">четыре</span> новые траектории
            </>
          }
          description="Китайский перестал быть экзотикой. Сегодня это практичный инструмент, который заметно расширяет возможности в работе, учёбе и жизни."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <RevealItem key={r.title}>
              <article className="group relative h-full overflow-hidden rounded-lg border border-ink/10 bg-white/55 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-cinnabar/40 hover:shadow-lift">
                <span className="pointer-events-none absolute -right-3 -top-2 font-han text-6xl font-700 text-cinnabar/8 transition-colors duration-300 group-hover:text-cinnabar/15">
                  {r.han}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cinnabar/25 bg-cinnabar-tint text-cinnabar-deep">
                  <r.icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-600 text-ink">{r.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{r.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
