import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScalePattern } from '@/components/ui/scale-pattern'
import logo from '/tomiris-logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const stats = [
  { value: '500+', label: 'выпускников с сертификатом HSK' },
  { value: '94%', label: 'сдают HSK с первой попытки' },
  { value: '6 лет', label: 'преподаём китайский язык' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-porcelain" />
        <div className="absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-cinnabar/5 blur-[2px]" />
        <ScalePattern className="absolute right-[-6%] top-[12%] h-[460px] w-[460px] text-cinnabar opacity-[0.22]" />
        <div className="paper-grain absolute inset-0 opacity-[0.4] mix-blend-multiply" />
      </div>

      <div className="container-px grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        {/* Copy column */}
        <div className="max-w-xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="eyebrow"
          >
            Школа китайского языка Tomiris
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-balance font-display text-5xl font-600 leading-[1.02] text-ink sm:text-6xl lg:text-[4.4rem]"
          >
            Китайский, который
            <span className="relative mx-1.5 inline-block text-cinnabar">
              открывает
              <svg
                className="absolute -bottom-1 left-0 w-full text-gold"
                height="10"
                viewBox="0 0 200 10"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 7c40-5 158-5 196 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            мир
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 text-pretty text-lg leading-relaxed text-ink-soft"
          >
            От первого <span className="font-han text-ink">你好</span> до уверенного делового
            общения. Живые занятия с носителями и сертифицированными методистами, понятная программа
            и подготовка к HSK — для школьников, студентов и профессионалов.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <a href="#enroll">
                Записаться на пробный урок
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#programs">Посмотреть программы</a>
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/12 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-700 text-cinnabar-deep sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-ink-muted sm:text-[0.8rem]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-ink/10 bg-gradient-to-b from-white to-porcelain-deep shadow-lift">
            <ScalePattern className="absolute inset-0 h-full w-full text-cinnabar opacity-[0.15]" />
            {/* Vertical Chinese banner */}
            <div className="absolute right-6 top-6 flex flex-col items-center gap-1 font-han text-2xl font-700 leading-tight text-cinnabar/85">
              <span>学</span>
              <span>中</span>
              <span>文</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <img
                src={logo}
                alt="Дракон — символ школы китайского языка Tomiris"
                className="w-full max-w-[260px] drop-shadow-[0_18px_30px_rgba(154,61,59,0.18)]"
                width={260}
                height={260}
              />
            </div>
            <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-md border border-gold/40 bg-porcelain/85 px-3.5 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-gold-deep" />
              <span className="font-sans text-[0.8rem] font-600 text-ink">
                Онлайн-школа китайского языка
              </span>
            </div>
          </div>

          {/* Floating seal */}
          <motion.div
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-5 -top-5 flex h-20 w-20 items-center justify-center rounded-md bg-cinnabar text-center font-han text-base font-700 leading-tight text-porcelain shadow-lift sm:-left-8 sm:h-24 sm:w-24"
          >
            汉语
            <br />
            学校
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
