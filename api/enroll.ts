/**
 * POST /api/enroll
 *
 * Принимает заявку с лендинга и пересылает её в Telegram-чат школы.
 *
 * Подходит для Vercel (Node runtime) и Netlify (через их встроенный адаптер
 * для Vercel-style функций). Для Cloudflare Pages используйте файл
 * `functions/api/enroll.ts` рядом с этим — формат у CF другой.
 *
 * Требуемые переменные окружения:
 *   TELEGRAM_BOT_TOKEN  — токен бота, выданный @BotFather
 *   TELEGRAM_CHAT_ID    — ID чата/канала/группы, куда слать заявки
 */

type IncomingMessage = {
  method?: string
  headers: Record<string, string | string[] | undefined>
  body?: unknown
  socket?: { remoteAddress?: string }
}

type ServerResponse = {
  status: (code: number) => ServerResponse
  setHeader: (name: string, value: string) => void
  json: (body: unknown) => void
  end: (chunk?: unknown) => void
}

interface EnrollPayload {
  name?: string
  phone?: string
  email?: string
  level?: string
  comment?: string
  website?: string
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function sanitize(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Метод не поддерживается' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены')
    res.status(500).json({ error: 'Сервер не настроен. Сообщите администратору сайта.' })
    return
  }

  let body: EnrollPayload
  try {
    body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as EnrollPayload
    if (!body || typeof body !== 'object') throw new Error('bad body')
  } catch {
    res.status(400).json({ error: 'Некорректный формат запроса.' })
    return
  }

  // Honeypot: настоящие пользователи это поле не видят.
  if (sanitize(body.website)) {
    // Тихо «принимаем», чтобы ботам не было фидбэка
    res.status(200).json({ ok: true })
    return
  }

  const name = sanitize(body.name, 120)
  const phone = sanitize(body.phone, 40)
  const email = sanitize(body.email, 120)
  const level = sanitize(body.level, 80)
  const comment = sanitize(body.comment, 1000)

  if (!name || !phone) {
    res.status(400).json({ error: 'Укажите имя и телефон.' })
    return
  }

  // Простейшая валидация телефона — оставляем только разумные символы.
  if (!/^[+\d][\d\s\-()]{6,}$/.test(phone)) {
    res.status(400).json({ error: 'Похоже, в номере телефона ошибка. Проверьте и попробуйте ещё раз.' })
    return
  }

  const ip =
    (typeof req.headers['x-forwarded-for'] === 'string' && req.headers['x-forwarded-for'].split(',')[0].trim()) ||
    req.socket?.remoteAddress ||
    'unknown'

  const time = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Almaty',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  const text = [
    '<b>🐉 Новая заявка с сайта Tomiris</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    email && `<b>Email:</b> ${escapeHtml(email)}`,
    level && `<b>Уровень:</b> ${escapeHtml(level)}`,
    comment && `<b>Комментарий:</b> ${escapeHtml(comment)}`,
    '',
    `<i>${escapeHtml(time)} · ${escapeHtml(ip)}</i>`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!tgRes.ok) {
      const detail = await tgRes.text().catch(() => '')
      console.error('Telegram API error:', tgRes.status, detail)
      res.status(502).json({ error: 'Не удалось доставить заявку. Попробуйте позже или позвоните нам.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Telegram fetch failed:', err)
    res.status(502).json({ error: 'Сетевая ошибка. Попробуйте ещё раз через минуту.' })
  }
}
