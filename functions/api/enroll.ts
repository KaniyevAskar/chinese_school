/**
 * POST /api/enroll — версия для Cloudflare Pages Functions.
 *
 * Если хостите на Vercel/Netlify, используется `api/enroll.ts`.
 * Если на Cloudflare Pages — этот файл.
 *
 * В настройках Pages добавьте Environment Variables:
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
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
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function sanitize(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены')
    return json({ error: 'Сервер не настроен. Сообщите администратору сайта.' }, 500)
  }

  let body: EnrollPayload
  try {
    body = (await request.json()) as EnrollPayload
    if (!body || typeof body !== 'object') throw new Error('bad body')
  } catch {
    return json({ error: 'Некорректный формат запроса.' }, 400)
  }

  if (sanitize(body.website)) {
    return json({ ok: true })
  }

  const name = sanitize(body.name, 120)
  const phone = sanitize(body.phone, 40)
  const email = sanitize(body.email, 120)
  const level = sanitize(body.level, 80)
  const comment = sanitize(body.comment, 1000)

  if (!name || !phone) {
    return json({ error: 'Укажите имя и телефон.' }, 400)
  }

  if (!/^[+\d][\d\s\-()]{6,}$/.test(phone)) {
    return json({ error: 'Похоже, в номере телефона ошибка. Проверьте и попробуйте ещё раз.' }, 400)
  }

  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
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
    const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!tgRes.ok) {
      const detail = await tgRes.text().catch(() => '')
      console.error('Telegram API error:', tgRes.status, detail)
      return json({ error: 'Не удалось доставить заявку. Попробуйте позже или позвоните нам.' }, 502)
    }

    return json({ ok: true })
  } catch (err) {
    console.error('Telegram fetch failed:', err)
    return json({ error: 'Сетевая ошибка. Попробуйте ещё раз через минуту.' }, 502)
  }
}
