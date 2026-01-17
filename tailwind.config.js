/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom neon colors to match the screenshot
        neon: {
          400: '#34d399', // emerald-400
          500: '#10b981', // emerald-500
          glow: 'rgba(52, 211, 153, 0.5)' 
        },
        dark: {
          900: '#0f172a', // slate-900
          800: '#1e293b', // slate-800
          card: '#111827' // gray-900
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
