import { Quote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: 'Алина',
    role: 'Студентка, уровень HSK 4',
    initials: 'АЖ',
    text: '下午好老师👋\
    我学习中文已经一年了.\
    Мне очень понравились наши занятия, и вы просто замечательный преподаватель.\
    Спасибо вам огромное за ваш труд, терпение и полезные знания. Я желаю вам замечательных учеников!\
    我会好想您必',
  },
  {
    name: 'Сабина',
    role: 'Студентка, уровень HSK 3',
    initials: 'РЕ',
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
    initials: '',
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
    initials: '',
    text: '您好Tomiris老师👋\
    Спасибо большое за Ваш труд и терпение! За знание, которое Вы мне даете🥹 С Вами всегда весело и приятно заниматься \
    谢谢 за все! Я настроена. \
    вместе с Вами достичь HSK4, а ещё лучше HSK6！'
  },
  {
    name: 'Анастасия',
    role: 'Предприниматель',
    initials: '',
    text: '你好，老师！\
    Мне очень нравится с Вами заниматься китайским языком. Вы доходчиво объясняете и выполняете свою работу безупречно. Буду советовать Вас людям, которые так же хотели бы изучать китайский язык. \
    Я рада, что встретила Вас и именно Вы мой учитель. \
    Желаю Вам терпения, что очень нужно и старательных учеников'
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
