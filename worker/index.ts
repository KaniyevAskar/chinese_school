/**
 * Cloudflare Worker для Tomiris.
 *
 * Делает три вещи:
 * 1. Принимает POST /api/enroll и пересылает заявку в Telegram.
 * 2. Редиректит www → apex (https://tomiris-chinese.kz).
 * 3. Все остальные запросы прокидывает в статические ассеты (Vite-сборка
 *    в `dist/`) с security- и cache-заголовками. SPA-fallback настроен в
 *    wrangler.jsonc.
 *
 * Переменные окружения задаются в Cloudflare Dashboard
 * (Workers & Pages → проект → Settings → Variables and Secrets):
 *   TELEGRAM_BOT_TOKEN  — Secret, токен бота от @BotFather
 *   TELEGRAM_CHAT_ID    — Variable или Secret, ID чата для заявок
 */

const CANONICAL_HOST = 'tomiris-chinese.kz'

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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const sanitize = (value: unknown, max = 500): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

function withSecurityHeaders(response: Response, pathname: string): Response {
  const headers = new Headers(response.headers)

  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Cross-Origin-Opener-Policy', 'same-origin')

  if (pathname.startsWith('/assets/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (pathname === '/' || pathname.endsWith('.html')) {
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
  } else if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    headers.set('Cache-Control', 'public, max-age=3600')
  } else if (/\.(png|jpe?g|webp|svg|ico|gif|woff2?)$/i.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=2592000')
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function handleEnrollGet(env: Env): Response {
  return json({
    ok: true,
    route: '/api/enroll',
    method: 'GET',
    hint: 'Эта точка ждёт POST с JSON. GET-ответ означает, что Worker работает.',
    config: {
      hasToken: Boolean(env.TELEGRAM_BOT_TOKEN),
      hasChatId: Boolean(env.TELEGRAM_CHAT_ID),
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

    if (
      url.hostname === `www.${CANONICAL_HOST}` ||
      (url.hostname.endsWith(`.${CANONICAL_HOST}`) && url.hostname !== CANONICAL_HOST)
    ) {
      const target = `https://${CANONICAL_HOST}${url.pathname}${url.search}`
      return Response.redirect(target, 301)
    }

    if (url.pathname === '/api/enroll') {
      if (request.method === 'GET' || request.method === 'HEAD') {
        return handleEnrollGet(env)
      }
      if (request.method === 'POST') {
        return handleEnrollPost(request, env)
      }
      return json({ error: `Метод ${request.method} не поддерживается. Используйте POST.` }, 405)
    }

    const assetResponse = await env.ASSETS.fetch(request)
    return withSecurityHeaders(assetResponse, url.pathname)
  },
}
