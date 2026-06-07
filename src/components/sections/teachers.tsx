import { GraduationCap, Languages, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const teachers = [
  {
    initials: '李',
    name: 'Ли Вэй',
    role: '· Носитель языка \
    · Разговорная практика',
    accent: 'bg-cinnabar text-porcelain',
    quals: 'Магистр преподавания китайского как иностранного, Пекинский педуниверситет',
    langs: 'Путунхуа (родной), русский C1',
    exp: '4 года',
    photo: null as string | null,
  },
  {
    initials: 'ТС',
    name: 'Томирис Сейтказы',
    role: '· Основательница школы \
    · Старший преподаватель \
    · Методист',
    accent: 'bg-ink text-porcelain',
    quals: 'Сертификаты HSK-4/5/6 , диплом ВУЗа Китая 湖南农业大学 (провинция Хунань, город Чанша)',
    langs: 'Русский, казахский, китайский C1',
    exp: '6 лет',
    photo: '/tomiris-portrait.jpg',
  },
]

function parseRole(role: string): string[] {
  return role
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function Teachers() {
  return (
    <section id="teachers" className="relative bg-porcelain-deep py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Наши преподаватели"
          title={
            <>
              Носители языка и <span className="text-cinnabar">сертифицированные</span> методисты
            </>
          }
          description="Каждый преподаватель проходит отбор: профильное образование, опыт от пяти лет и обязательная методическая аттестация. Половина команды — носители языка."
        />

        <RevealGroup className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          {teachers.map((t) => {
            const roleLines = parseRole(t.role)
            return (
              <RevealItem key={t.name} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white/70 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:flex-row">
                  <div className="relative shrink-0 sm:w-44 lg:w-52">
                    {t.photo ? (
                      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto sm:h-full">
                        <img
                          src={t.photo}
                          alt={`${t.name} — преподаватель школы Tomiris`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'flex aspect-[4/5] w-full items-center justify-center font-display text-7xl font-700 sm:aspect-auto sm:h-full',
                          t.accent,
                        )}
                      >
                        <span className="transition-transform duration-300 group-hover:scale-105">{t.initials}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="font-display text-2xl font-600 leading-tight text-ink">{t.name}</h3>
                    <ul className="mt-2 space-y-0.5 text-[0.85rem] leading-snug text-cinnabar-deep">
                      {roleLines.map((line) => (
                        <li key={line} className="flex gap-1.5">
                          <span aria-hidden="true">·</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="hairline my-6" />

                    <dl className="flex flex-col gap-4 text-sm">
                      <div className="flex gap-3">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} />
                        <dd className="text-ink-soft">{t.quals}</dd>
                      </div>
                      <div className="flex gap-3">
                        <Languages className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} />
                        <dd className="text-ink-soft">{t.langs}</dd>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} />
                        <dd className="text-ink-soft">Опыт преподавания — {t.exp}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
