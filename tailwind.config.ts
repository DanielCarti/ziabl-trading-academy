import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        'surface-light': '#1a1a28',
        'surface-border': '#2a2a3a',
        accent: {
          DEFAULT: '#00d4aa',
          light: '#00f0c0',
          dark: '#00a888',
        },
        danger: {
          DEFAULT: '#ff4757',
          light: '#ff6b7a',
          dark: '#e03040',
        },
        warning: {
          DEFAULT: '#ffa502',
          light: '#ffb732',
        },
        text: {
          primary: '#e4e4e7',
          secondary: '#71717a',
          muted: '#52525b',
        },
        chart: {
          green: '#00d4aa',
          red: '#ff4757',
          blue: '#3b82f6',
          yellow: '#fbbf24',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 170, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.6)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e4e4e7',
            h1: { color: '#e4e4e7' },
            h2: { color: '#e4e4e7' },
            h3: { color: '#e4e4e7' },
            h4: { color: '#e4e4e7' },
            strong: { color: '#00d4aa' },
            a: { color: '#00d4aa', '&:hover': { color: '#00f0c0' } },
            code: { color: '#00d4aa', backgroundColor: '#1a1a28', padding: '2px 6px', borderRadius: '4px' },
            blockquote: { color: '#71717a', borderLeftColor: '#00d4aa' },
            'ol > li::marker': { color: '#71717a' },
            'ul > li::marker': { color: '#71717a' },
            hr: { borderColor: '#2a2a3a' },
            thead: { color: '#e4e4e7', borderBottomColor: '#2a2a3a' },
            'tbody tr': { borderBottomColor: '#1a1a28' },
            th: { color: '#e4e4e7' },
            td: { color: '#e4e4e7' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
