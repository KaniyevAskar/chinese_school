import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Алина',
    role: 'Студентка, уровень HSK 4',
    initials: 'А',
    text: '下午好老师👋\
    我学习中文已经一年了.\
    Мне очень понравились наши занятия, и вы просто замечательный преподаватель.\
    Спасибо вам огромное за ваш труд, терпение и полезные знания. Я желаю вам замечательных учеников!\
    我会好想您必',
  },
  {
    name: 'Сабина',
    role: 'Студентка, уровень HSK 3',
    initials: 'С',
    text: '您好Tomiris 老师！\
    Сегодня ровно 2 года, как я изучаю китайский язык с Вами!\
    Прекрасные 2 года интересных, разнообразных занятий🥹\
    Учить 汉语 с Вами одно\
    удовольствие, это мой relax time (хотя бывает, что Вы дадите жару\
    ). Спасибо за терпение\
    и яркие, красочные уроки\
    Хочу добраться вместе с Вами до HSK 6\
    Успехов и процветания Вам！',
  },
  {
    name: 'Дана',
    role: 'Школьница, уровень HSK 5',
    initials: 'Д',
    text: '老师 多谢你！Урок очень понравился！\
    Всё объяснялось просто и понятно, даже сложные моменты разобрали без напряжения.\
    Было много практики, поэтому время пролетело незаметно.\
    Атмосфера классная, без стресса, с поддержкой.\
    После ваших уроков реально появляется желание учить китайский дальше.\
    Спасибо большое!',
  },
  {
    name: 'Таисия',
    role: 'Студентка, уровень HSK 4',
    initials: 'Т',
    text: '您好Tomiris老师👋\
    Спасибо большое за Ваш труд и терпение! За знание, которое Вы мне даете🥹 С Вами всегда весело и приятно заниматься \
    谢谢 за все! Я настроена. \
    вместе с Вами достичь HSK4, а ещё лучше HSK6！',
  },
  {
    name: 'Анастасия',
    role: 'Предприниматель',
    initials: 'А',
    text: '你好，老师！\
    Мне очень нравится с Вами заниматься китайским языком. Вы доходчиво объясняете и выполняете свою работу безупречно. Буду советовать Вас людям, которые так же хотели бы изучать китайский язык. \
    Я рада, что встретила Вас и именно Вы мой учитель. \
    Желаю Вам терпения, что очень нужно и старательных учеников',
  },
]

const total = testimonials.length

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  const goTo = (i: number) => setIndex(((i % total) + total) % total)
  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60
    if (info.offset.x < -threshold) next()
    else if (info.offset.x > threshold) prev()
  }

  return (
    <section id="testimonials" className="relative bg-porcelain-deep py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Отзывы"
          title="Что говорят наши студенты"
          description="Честные истории людей, которые начинали с нуля — школьников, профессионалов и родителей."
        />

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <div
            className="relative"
            role="region"
            aria-roledescription="Карусель отзывов"
            aria-label="Отзывы студентов"
          >
            <div className="overflow-hidden rounded-lg">
              <motion.div
                className="flex touch-pan-y"
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
              >
                {testimonials.map((t, i) => (
                  <figure
                    key={t.name}
                    className="flex w-full shrink-0 flex-col rounded-lg border border-ink/10 bg-white/80 p-8 sm:p-10 shadow-soft"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} из ${total}`}
                    aria-hidden={i !== index}
                  >
                    <Quote className="h-9 w-9 text-cinnabar/30" strokeWidth={1.5} />
                    <blockquote className="mt-5 flex-1 text-pretty text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.06rem]">
                      {t.text}
                    </blockquote>
                    <div className="mt-7 flex items-center gap-1 text-gold-deep" aria-label="Оценка 5 из 5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-cinnabar font-sans text-sm font-700 text-porcelain">
                        {t.initials}
                      </span>
                      <span>
                        <span className="block font-display text-lg font-600 leading-tight text-ink">{t.name}</span>
                        <span className="block text-xs text-ink-muted">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущий отзыв"
              className="absolute left-1 top-1/2 flex h-11 w-11 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-porcelain text-ink-soft shadow-soft transition-colors hover:border-cinnabar/50 hover:text-cinnabar-deep sm:left-0 sm:-translate-x-[125%]"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующий отзыв"
              className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-full items-center justify-center rounded-full border border-ink/15 bg-porcelain text-ink-soft shadow-soft transition-colors hover:border-cinnabar/50 hover:text-cinnabar-deep sm:right-0 sm:translate-x-[125%]"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.7} />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label="Слайды">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Перейти к отзыву ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-cinnabar' : 'w-2 bg-ink/20 hover:bg-ink/35',
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
