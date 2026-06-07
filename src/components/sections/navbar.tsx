import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import logo from '/tomiris-logo.png'

const links = [
  { href: '#why', label: 'Зачем китайский' },
  { href: '#programs', label: 'Программы' },
  { href: '#process', label: 'Как учим' },
  { href: '#teachers', label: 'Преподаватели' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink/10 bg-porcelain/90 backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-px flex h-[72px] items-center justify-between" aria-label="Основная навигация">
        <a href="#top" className="flex items-center gap-3" aria-label="Tomiris — на главную">
          <img src={logo} alt="Логотип школы Tomiris" className="h-11 w-11 rounded-md object-cover" width={44} height={44} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-700 tracking-tight text-ink">Tomiris</span>
            <span className="mt-1 font-sans text-[0.58rem] font-600 uppercase tracking-widest text-ink-muted">
              Chinese Language School
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline font-sans text-sm font-500 text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="primary" size="sm">
            <a href="#enroll">Записаться</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-porcelain lg:hidden">
          <ul className="container-px flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-base font-500 text-ink-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <Button asChild variant="primary" size="md" className="w-full">
                <a href="#enroll" onClick={() => setOpen(false)}>Записаться на пробный урок</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
