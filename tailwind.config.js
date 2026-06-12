/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F7F9',
        line: '#E4E7EC',
        accent: {
          DEFAULT: '#3538CD',
          soft: '#EEF0FF',
        },
        sev: {
          amber: '#B54708',
          'amber-bg': '#FFFAEB',
          'amber-line': '#FEDF89',
          red: '#B42318',
          'red-bg': '#FEF3F2',
          'red-line': '#FECDCA',
          green: '#067647',
          'green-bg': '#ECFDF3',
          'green-line': '#ABEFC6',
        },
        ink: {
          DEFAULT: '#101828',
          secondary: '#475467',
          muted: '#667085',
          faint: '#98A2B3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04)',
        panel: '0 4px 12px rgba(16, 24, 40, 0.08)',
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
}
