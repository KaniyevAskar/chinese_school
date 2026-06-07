import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const programs = [
  {
    tag: '入门',
    level: 'Начальный',
    hsk: 'HSK 1–2',
    duration: '3 месяца · 2 раза в неделю',
    summary: 'С нуля до первых диалогов. Ставим произношение, тоны и пиньинь без зубрёжки.',
    points: ['150 базовых иероглифов', 'Уверенное произношение и тоны', 'Бытовые диалоги и фразы'],
    featured: false,
  },
  {
    tag: '进阶',
    level: 'Средний',
    hsk: 'HSK 3–4',
    duration: '6 месяцев · 2 раза в неделю',
    summary: 'Самый выбираемый курс. Переходим к свободной речи и письму на бытовые темы.',
    points: ['600+ иероглифов', 'Грамматика сложных предложений', 'Аудирование на скорости носителя', 'Переписка и короткие эссе'],
    featured: true,
  },
  {
    tag: '高级',
    level: 'Продвинутый',
    hsk: 'HSK 5–6',
    duration: '1 месяцев · 2 раза в неделю',
    summary: 'Профессиональный уровень: деловые переговоры, академические тексты, нюансы.',
    points: ['2500+ иероглифов', 'Деловая и академическая лексика', 'Свободные дискуссии и доклады', 'Понимание новостей и фильмов'],
    featured: false,
  },
  {
    tag: '备考',
    level: 'Подготовка к HSK',
    hsk: 'HSK 1–6',
    duration: '',
    summary: 'Целевая подготовка к экзамену: разбор формата, стратегии и пробные тесты.',
    points: ['Разбор всех частей экзамена', 'Банк из 1000+ заданий', 'Пробные тесты с проверкой', 'Тайм-менеджмент на экзамене'],
    featured: false,
  },
]

export function Programs() {
  return (
    <section id="programs" className="relative bg-porcelain-deep py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Программы обучения"
          title={
            <>
              Уровень для каждого — <span className="text-cinnabar">от первого слова</span>
            </>
          }
          description="Прозрачная программа с измеримым результатом на каждом этапе. Вы всегда знаете, к какому уровню HSK идёте и сколько это займёт."
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((p) => (
            <RevealItem key={p.level} className="h-full">
              <article
                className={cn(
                  'relative flex h-full flex-col rounded-lg border p-7 transition-all duration-300 hover:-translate-y-1.5',
                  p.featured
                    ? 'border-cinnabar/50 bg-ink text-porcelain shadow-lift'
                    : 'border-ink/10 bg-white/70 shadow-soft hover:shadow-lift hover:border-cinnabar/30',
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-sm bg-gold px-3 py-1 font-sans text-[0.65rem] font-700 uppercase tracking-widest text-ink">
                    Выбор студентов
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'font-han text-2xl font-700',
                      p.featured ? 'text-gold-soft' : 'text-cinnabar',
                    )}
                  >
                    {p.tag}
                  </span>
                  <span
                    className={cn(
                      'rounded-sm border px-2.5 py-1 font-sans text-xs font-600',
                      p.featured ? 'border-porcelain/30 text-porcelain' : 'border-cinnabar/30 text-cinnabar-deep',
                    )}
                  >
                    {p.hsk}
                  </span>
                </div>

                <h3 className={cn('mt-5 font-display text-3xl font-600', p.featured ? 'text-porcelain' : 'text-ink')}>
                  {p.level}
                </h3>
                <p className={cn('mt-1 text-xs font-500 uppercase tracking-wide', p.featured ? 'text-porcelain/60' : 'text-ink-muted')}>
                  {p.duration}
                </p>
                <p className={cn('mt-4 text-[0.92rem] leading-relaxed', p.featured ? 'text-porcelain/85' : 'text-ink-soft')}>
                  {p.summary}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn('mt-0.5 h-4 w-4 shrink-0', p.featured ? 'text-gold-soft' : 'text-cinnabar')}
                        strokeWidth={2.4}
                      />
                      <span className={p.featured ? 'text-porcelain/90' : 'text-ink-soft'}>{pt}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={p.featured ? 'gold' : 'outline'}
                  size="md"
                  className={cn('mt-7 w-full', p.featured && 'bg-gold text-ink hover:bg-gold-soft')}
                >
                  <a href="#enroll">Выбрать уровень</a>
                </Button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
