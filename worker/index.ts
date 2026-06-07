/**
 * Cloudflare Worker для Tomiris.
 *
 * Делает две вещи:
 * 1. На POST /api/enroll принимает заявку и шлёт её в Telegram.
 * 2. Все остальные запросы прокидывает в статические ассеты (Vite-сборка
 *    в `dist/`). SPA-fallback настроен в wrangler.jsonc.
 *
 * Переменные окружения задаются в Cloudflare Dashboard
 * (Workers & Pages → проект → Settings → Variables and Secrets):
 *   TELEGRAM_BOT_TOKEN  — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID    — ID чата, куда отправлять заявки
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
  ASSETS: { fetch: (request: Request) => Promise<Response> }
}

interface EnrollPayload {
  name?: string
  phone?: string
  email?: string
  level?: string
  comment?: string
  website?: string
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const sanitize = (value: unknown, max = 500): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

async function handleEnrollGet(env: Env): Promise<Response> {
  // ASSETS — стандартный биндинг для статики, его всегда есть. Остальное —
  // переменные/секреты, заданные в wrangler.jsonc или дашборде CF.
  const visibleBindings = Object.keys(env as unknown as Record<string, unknown>).filter(
    (k) => k !== 'ASSETS',
  )
  return json({
    ok: true,
    route: '/api/enroll',
    method: 'GET',
    hint: 'Эта точка ждёт POST с JSON. GET-ответ означает, что Worker работает.',
    env: {
      hasToken: Boolean(env.TELEGRAM_BOT_TOKEN),
      hasChatId: Boolean(env.TELEGRAM_CHAT_ID),
      // Маркер из wrangler.jsonc — если виден, значит config-vars работают.
      configMarker: (env as unknown as { CONFIG_MARKER?: string }).CONFIG_MARKER ?? null,
      // Список всех ключей в env, кроме ASSETS — показывает реальные биндинги.
      visibleBindings,
    },
  })
}

async function handleEnrollPost(request: Request, env: Env): Promise<Response> {
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/enroll') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        return handleEnrollGet(env)
      }
      if (request.method === 'POST') {
        return handleEnrollPost(request, env)
      }
      return json({ error: `Метод ${request.method} не поддерживается. Используйте POST.` }, 405)
    }

    // Всё остальное — статика (с SPA-fallback из wrangler.jsonc)
    return env.ASSETS.fetch(request)
  },
}
