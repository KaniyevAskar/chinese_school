import logo from '/tomiris-logo.png'

const cols = [
  {
    title: 'Обучение',
    links: [
      { label: 'Начальный уровень', href: '#programs' },
      { label: 'Средний уровень', href: '#programs' },
      { label: 'Продвинутый уровень', href: '#programs' },
      { label: 'Подготовка к HSK', href: '#programs' },
    ],
  },
  {
    title: 'Школа',
    links: [
      { label: 'Зачем китайский', href: '#why' },
      { label: 'Как мы учим', href: '#process' },
      { label: 'Преподаватели', href: '#teachers' },
      { label: 'Отзывы', href: '#testimonials' },
    ],
  },
  {
    title: 'Контакты',
    links: [
      { label: '+7 702 366 4904', href: 'tel:+77023664904' },
      { label: 'WhatsApp', href: 'https://wa.me/77023664904', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/tomiris_chinese/', external: true },
      { label: 'Facebook', href: 'https://www.facebook.com/121198601081163/', external: true },
      { label: 'Записаться', href: '#enroll' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-ink/12 bg-porcelain">
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Логотип Tomiris" className="h-11 w-11 rounded-md object-cover" width={44} height={44} />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-700 text-ink">Tomiris</span>
                <span className="mt-1 text-[0.58rem] font-600 uppercase tracking-widest text-ink-muted">
                  Chinese Language School
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Школа китайского языка для тех, кто хочет говорить уверенно. Живые занятия, носители
              языка и подготовка к HSK 1–6. <span className="font-han text-cinnabar">学无止境</span>
            </p>
          </div>

          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="font-sans text-xs font-700 uppercase tracking-widest text-ink-muted">{c.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => {
                  const isExternal = 'external' in l && l.external
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="link-underline text-sm text-ink-soft transition-colors hover:text-cinnabar-deep"
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-7 text-xs text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Школа китайского языка Tomiris. Все права защищены.</p>
          <p className="flex items-center gap-1.5">
            Сделано с уважением к культуре Китая <span className="font-han text-cinnabar">中国</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
