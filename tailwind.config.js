/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        porcelain: {
          DEFAULT: '#FAF6F1',
          deep: '#F3EBE1',
          warm: '#EFE5D8',
        },
        ink: {
          DEFAULT: '#211B19',
          soft: '#4A413C',
          muted: '#7A6F67',
        },
        cinnabar: {
          DEFAULT: '#C0524F',
          deep: '#9A3D3B',
          soft: '#D98B86',
          tint: '#F4E2DE',
        },
        gold: {
          DEFAULT: '#B8893E',
          deep: '#8F6826',
          soft: '#E6D2A8',
        },
      },
      fontFamily: {
        display: ['Cormorant', 'Georgia', 'serif'],
        sans: ['"Golos Text"', 'system-ui', 'sans-serif'],
        han: ['"Noto Serif SC"', 'serif'],
      },
      letterSpacing: {
        widest: '0.28em',
      },
      borderRadius: {
        lg: '10px',
        md: '8px',
        sm: '6px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(33,27,25,0.04), 0 12px 32px -16px rgba(33,27,25,0.18)',
        lift: '0 2px 4px rgba(33,27,25,0.05), 0 30px 60px -28px rgba(154,61,59,0.28)',
        seal: '0 0 0 1px rgba(184,137,62,0.35)',
      },
      backgroundImage: {
        scale:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='28' viewBox='0 0 56 28'%3E%3Cpath d='M0 28a28 28 0 0 1 28-28 28 28 0 0 1 28 28' fill='none' stroke='%23C0524F' stroke-opacity='0.12' stroke-width='1.2'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
