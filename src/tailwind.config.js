
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        'tropical-indigo': 'var(--tropical-indigo)',
        'slate-blue': 'var(--slate-blue)',
        'ultra-violet': 'var(--ultra-violet)',
        'space-cadet': 'var(--space-cadet)',
        'risd-blue': 'var(--risd-blue)',
      }
    },
  },
  plugins: [],
}
