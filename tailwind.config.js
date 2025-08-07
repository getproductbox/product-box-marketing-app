/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pb-black': '#000000',
        'pb-white': '#FFFFFF',
        'pb-gray': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#CCCCCC',
          400: '#999999',
          500: '#666666',
          600: '#333333',
          700: '#1A1A1A',
          800: '#0D0D0D',
          900: '#000000',
        },
        'pb-accent': '#FF6B35', // Vibrant orange-red for dynamic energy
        'pb-electric': '#00D9FF', // Electric cyan for tech/innovation highlights
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(60px, 8vw, 120px)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '900' }],
        'display': ['clamp(48px, 6vw, 80px)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '900' }],
        'h1': ['clamp(36px, 5vw, 64px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['clamp(28px, 4vw, 48px)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['clamp(24px, 3vw, 36px)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-xl': ['24px', { lineHeight: '1.4', fontWeight: '400' }],
        'body-lg': ['20px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}