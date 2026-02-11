import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — Warm True Black
        'bg-primary': '#050505',
        'bg-secondary': '#0a0a0a',
        'bg-card': '#111111',
        'bg-elevated': '#1a1a1a',

        // Brand Gold — Muted Luxury
        'gold': '#C9A962',
        'gold-dark': '#A8893D',
        'gold-light': '#D4BC78',
        'gold-champagne': '#E8D5A0',

        // Text — Warm Off-White
        'text-primary': '#F5F1E8',
        'text-secondary': '#A09A8A',
        'text-muted': '#6B6560',

        // Semantic
        'success': '#4ADE80',
        'error': '#F87171',

        // Borders — Gold-Tinted
        'border-subtle': 'rgba(201, 169, 98, 0.06)',
        'border-gold': 'rgba(201, 169, 98, 0.2)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.05', fontWeight: '400', letterSpacing: '-0.02em' }],
        'hero': ['clamp(1.75rem, 4.5vw, 2.75rem)', { lineHeight: '1.1', fontWeight: '400' }],
        'title': ['1.5rem', { lineHeight: '1.25', fontWeight: '400', letterSpacing: '0.01em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'micro': ['0.6875rem', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.12em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(201, 169, 98, 0.12)',
        'gold-glow-lg': '0 0 60px rgba(201, 169, 98, 0.15)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(201, 169, 98, 0.06)',
        'inner-glow': 'inset 0 1px 0 rgba(201, 169, 98, 0.08)',
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'elevation-3': '0 12px 40px rgba(0, 0, 0, 0.6)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
