import { GraduationCap, Languages, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { RevealGroup, RevealItem } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const teachers = [
  {
    initials: '李',
    name: 'Ли Вэй',
    role: 'Носитель языка · разговорная практика',
    accent: 'bg-cinnabar text-porcelain',
    quals: 'Магистр преподавания китайского как иностранного, Пекинский педуниверситет',
    langs: 'Путунхуа (родной), русский C1',
    exp: '9 лет',
  },
  {
    initials: 'АК',
    name: 'Айгерим Касымова',
    role: 'Методист · подготовка к HSK',
    accent: 'bg-ink text-porcelain',
    quals: 'Сертификат IPA, стажировка в Шанхайском университете, HSK 6',
    langs: 'Русский, казахский, китайский C1',
    exp: '11 лет',
  },
  {
    initials: '王',
    name: 'Ван Мин',
    role: 'Носитель языка · бизнес-китайский',
    accent: 'bg-gold text-ink',
    quals: 'BCT (деловой китайский), опыт работы в международной торговле',
    langs: 'Путунхуа (родной), английский, русский B2',
    exp: '7 лет',
  },
  {
    initials: 'ДС',
    name: 'Дмитрий Сорокин',
    role: 'Преподаватель · начальные уровни',
    accent: 'bg-cinnabar-deep text-porcelain',
    quals: 'Востоковед, выпускник программы обмена в Харбине, HSK 5',
    langs: 'Русский (родной), китайский C1',
    exp: '6 лет',
  },
]

export function Teachers() {
  return (
    <section id="teachers" className="relative bg-porcelain-deep py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading
          eyebrow="Наши преподаватели"
          title={
            <>
              Носители языка и <span className="text-cinnabar">сертифицированные</span> методисты
            </>
          }
          description="Каждый преподаватель проходит отбор: профильное образование, опыт от пяти лет и обязательная методическая аттестация. Половина команды — носители языка."
        />

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {teachers.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <article className="group flex h-full flex-col rounded-lg border border-ink/10 bg-white/70 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-16 w-16 items-center justify-center rounded-md font-display text-2xl font-700 shadow-soft transition-transform duration-300 group-hover:scale-105',
                      t.accent,
                    )}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-600 leading-tight text-ink">{t.name}</h3>
                    <p className="mt-1 text-[0.8rem] leading-snug text-cinnabar-deep">{t.role}</p>
                  </div>
                </div>

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
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
