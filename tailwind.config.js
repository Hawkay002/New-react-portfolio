/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'app-bg': '#020617',     // The deep dark background
        'card-bg': '#0f172a',    // Slightly lighter for cards
        'neon-green': '#10b981', // Your primary green
        'neon-blue': '#0ea5e9',  // For React/Tech
        'neon-purple': '#8b5cf6', // For IoT
        'neon-pink': '#ec4899',  // For Music
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'], // Ensure you have a good mono font fallback
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
