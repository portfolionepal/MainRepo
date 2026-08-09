/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#F8FAFC',
          alt: '#FFFFFF'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          border: '#E2E8F0'
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8'
        },
        secondary: {
          DEFAULT: '#0F172A',
          hover: '#1E293B'
        },
        text: {
          DEFAULT: '#0F172A',
          muted: '#64748B'
        },
        success: '#16A34A'
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
