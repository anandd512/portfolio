import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-deep': 'rgb(var(--paper-deep) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        card: '14px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22,.9,.3,1)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateY(0) rotate(-6deg)' },
          '100%': { transform: 'translateY(-34px) rotate(7deg)' },
        },
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;
