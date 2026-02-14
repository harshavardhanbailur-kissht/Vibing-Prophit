import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Titanium Blacks — 5 depth levels
        'titanium-void': '#020202',
        'titanium-deep': '#050505',
        'titanium-base': '#0a0a0a',
        'titanium-surface': '#111111',
        'titanium-elevated': '#1a1a1a',
        'titanium-raised': '#222222',

        // Legacy aliases (backward compat)
        'bg-primary': '#050505',
        'bg-secondary': '#0a0a0a',
        'bg-card': '#111111',
        'bg-elevated': '#1a1a1a',

        // Liquid Gold — 7-stop system
        'gold': '#C9A962',
        'gold-dark': '#8B6914',
        'gold-medium': '#A8893D',
        'gold-light': '#D4BC78',
        'gold-bright': '#E8D5A0',
        'gold-champagne': '#E8D5A0',
        'gold-white': '#F5EDD6',

        // Text — Warm hierarchy
        'text-headline': '#FFFFFF',
        'text-primary': '#F5F1E8',
        'text-secondary': '#B0A898',
        'text-muted': '#6B6560',
        'text-ghost': '#3A3632',

        // Semantic
        'success': '#4ADE80',
        'error': '#F87171',

        // Borders
        'border-subtle': 'rgba(201, 169, 98, 0.06)',
        'border-gold': 'rgba(201, 169, 98, 0.2)',

        // shadcn CSS variable bindings
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', fontWeight: '300', letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', fontWeight: '300', letterSpacing: '-0.02em' }],
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
        lg: 'var(--radius)',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(201, 169, 98, 0.12)',
        'gold-glow-md': '0 0 40px rgba(201, 169, 98, 0.18)',
        'gold-glow-lg': '0 0 60px rgba(201, 169, 98, 0.25)',
        'gold-glow-xl': '0 0 80px rgba(201, 169, 98, 0.35)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(201, 169, 98, 0.08)',
        'card-elevated': '0 12px 40px rgba(0, 0, 0, 0.65), 0 0 16px rgba(201, 169, 98, 0.06)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(201, 169, 98, 0.06)',
        'inner-glow': 'inset 0 1px 0 rgba(201, 169, 98, 0.08)',
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.5)',
        'elevation-3': '0 12px 40px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'glass': '24px',
        'glass-sm': '16px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'precision': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        'decel': 'cubic-bezier(0, 0.55, 0.45, 1)',
        'reveal': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'mechanical-reveal': 'mechanicalReveal 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)',
        'gold-sweep': 'goldSweep 0.6s ease-out',
        'vault-unlock': 'vaultUnlock 0.6s ease-out',
        'liquid-gold': 'liquidGold 3s ease-in-out infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'parallax-float': 'parallaxFloat 20s ease-in-out infinite',
        'gold-pulse-ring': 'goldPulseRing 1.5s ease-out',
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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        mechanicalReveal: {
          '0%': { opacity: '0', transform: 'translateY(32px)', filter: 'blur(4px)' },
          '40%': { filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldSweep: {
          '0%': { transform: 'scaleX(0)', opacity: '1' },
          '60%': { transform: 'scaleX(1)', opacity: '1' },
          '100%': { transform: 'scaleX(1)', opacity: '0' },
        },
        vaultUnlock: {
          '0%': { borderColor: '#C9A962', boxShadow: '0 0 0 rgba(201, 169, 98, 0)' },
          '50%': { borderColor: '#E8D5A0', boxShadow: '0 0 40px rgba(201, 169, 98, 0.4)' },
          '100%': { borderColor: '#C9A962', boxShadow: '0 0 20px rgba(201, 169, 98, 0.15)' },
        },
        liquidGold: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
        parallaxFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-12px) translateX(4px)' },
          '50%': { transform: 'translateY(-6px) translateX(-6px)' },
          '75%': { transform: 'translateY(-18px) translateX(8px)' },
        },
        goldPulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(201, 169, 98, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(201, 169, 98, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(201, 169, 98, 0)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
