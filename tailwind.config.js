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
        // Base neutrals - "Stone" (Varmgrå)
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Primary accent - "Sage" (Salvia/Eukalyptus)
        sage: {
          50: '#f2f7f6',
          100: '#e0ece9',
          200: '#c3dad6',
          300: '#9ebdbe',
          400: '#84a59d',
          500: '#688f86',
          600: '#53746d',
          700: '#384d49',
          800: '#2d3d3a',
          900: '#1a2422',
        },
        // Department colors (Muted)
        dept: {
          finans: '#059669',      // Emerald-600
          justitie: '#0c80f0',    // Blue-500
          social: '#be185d',      // Pink-700
          utbildning: '#7c3aed',  // Violet-600
          forsvar: '#475569',     // Slate-600
          klimat: '#16a34a',      // Green-600
          inf: '#d97706',         // Amber-600
        }
      },
      boxShadow: {
        'soft': '0 20px 40px -10px rgba(0,0,0,0.03)',
        'card': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)',
        'float': '0 10px 30px -5px rgba(132, 165, 157, 0.15)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}