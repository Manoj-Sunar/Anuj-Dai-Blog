import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'Times', 'serif'],
      },
      keyframes: {
        typing: {
          '0%': { width: '0ch' },
          '50%': { width: '32ch' },
          '100%': { width: '0ch' },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        typing: 'typing 4s steps(32) infinite, blink 1s step-end infinite',
        fadeIn: 'fadeIn 0.8s ease-in-out',
      },
    },
  },


})
