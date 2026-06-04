import { Quote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Алина Жакупова',
    role: 'Студентка, уровень HSK 4',
    initials: 'АЖ',
    text: 'Боялась тонов и думала, что китайский не для меня. Преподаватель объяснял так спокойно и по полочкам, что через полгода я свободно болтала в разговорном клубе. Атмосфера тёплая, никто не давит.',
  },
  {
    name: 'Руслан Ермеков',
    role: 'Предприниматель',
    initials: 'РЕ',
    text: 'Учил для работы с поставщиками из Гуанчжоу. Программа сразу заточена под практику: лексика по моей сфере, разбор переписки, переговоры. Окупилось на первой же сделке без посредника.',
  },
  {
    name: 'Марина Лебедева',
    role: 'Мама ученика',
    initials: 'МЛ',
    text: 'Сын ходит в детскую группу. Никаких слёз перед занятиями — наоборот, сам напоминает про урок. Преподаватель присылает обратную связь после каждой недели, видно реальный прогресс.',
  },
]

export function Testimonials() {
  return (
    <section className="relative bg-porcelain-deep py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Отзывы"
          title="Что говорят наши студенты"
          description="Честные истории людей, которые начинали с нуля — школьников, профессионалов и родителей."
        />

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col rounded-lg border border-ink/10 bg-white/70 p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="h-8 w-8 text-cinnabar/30" strokeWidth={1.5} />
                <blockquote className="mt-4 flex-1 text-pretty text-[0.97rem] leading-relaxed text-ink-soft">
                  {t.text}
                </blockquote>
                <div className="mt-6 flex items-center gap-1 text-gold-deep" aria-label="Оценка 5 из 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-md bg-cinnabar font-sans text-sm font-700 text-porcelain',
                    )}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-600 leading-tight text-ink">{t.name}</span>
                    <span className="block text-xs text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
