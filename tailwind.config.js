/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Alkoste brand cyan (kept as the single accent)
        cyan: {
          50: '#ecf8fe',
          100: '#cfeefc',
          200: '#a1ddf9',
          300: '#63c8f6',
          400: '#33baf4',
          500: '#08acf2', // primary brand (#08ACF2)
          600: '#0790cf',
          700: '#0a72a6',
          800: '#0f5f88',
          900: '#124f70',
        },
        ink: {
          DEFAULT: '#0d1b26',
          700: '#33454f',
          500: '#5b6b76',
          400: '#8595a0',
        },
        mist: '#f4f9fc',
        line: '#e4eef4',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(13, 27, 38, 0.12)',
        lift: '0 26px 55px -22px rgba(7, 144, 207, 0.30)',
        glow: '0 18px 45px -14px rgba(8, 172, 242, 0.45)',
        card: '0 2px 10px -4px rgba(13, 27, 38, 0.10)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '60%, 100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
