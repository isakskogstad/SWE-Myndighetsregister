/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        // Base neutrals - "Slate" (Cool/Crisp Gray) instead of Stone
        slate: {
          50: '#f8fafc', // Very light/white-blueish
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Primary accent - "Sky/Blue" for authority, but lighter
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9', // Sky-500
          600: '#0284c7', // Sky-600
          900: '#0c4a6e',
        },
        // Department colors (Preserved)
        dept: {
          finans: '#059669',
          justitie: '#0c80f0',
          social: '#be185d',
          utbildning: '#7c3aed',
          forsvar: '#475569',
          klimat: '#16a34a',
          inf: '#d97706',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0,0,0,0.05)', // Crisper shadow
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
