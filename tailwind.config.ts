import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--tw-colors-primary))',
          50: 'hsl(var(--tw-colors-primary-50))',
          100: 'hsl(var(--tw-colors-primary-100))',
          200: 'hsl(var(--tw-colors-primary-200))',
          300: 'hsl(var(--tw-colors-primary-300))',
          400: 'hsl(var(--tw-colors-primary-400))',
          500: 'hsl(var(--tw-colors-primary-500))',
          600: 'hsl(var(--tw-colors-primary-600))',
          700: 'hsl(var(--tw-colors-primary-700))',
          800: 'hsl(var(--tw-colors-primary-800))',
          900: 'hsl(var(--tw-colors-primary-900))',
          950: 'hsl(var(--tw-colors-primary-950))',
          foreground: 'hsl(var(--tw-colors-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--tw-colors-secondary))',
          50: 'hsl(var(--tw-colors-secondary-50))',
          100: 'hsl(var(--tw-colors-secondary-100))',
          200: 'hsl(var(--tw-colors-secondary-200))',
          300: 'hsl(var(--tw-colors-secondary-300))',
          400: 'hsl(var(--tw-colors-secondary-400))',
          500: 'hsl(var(--tw-colors-secondary-500))',
          600: 'hsl(var(--tw-colors-secondary-600))',
          700: 'hsl(var(--tw-colors-secondary-700))',
          800: 'hsl(var(--tw-colors-secondary-800))',
          900: 'hsl(var(--tw-colors-secondary-900))',
          950: 'hsl(var(--tw-colors-secondary-950))',
          foreground: 'hsl(var(--tw-colors-secondary-foreground))',
        },
        background: {
          DEFAULT: 'hsl(var(--tw-colors-background))',
          secondary: 'hsl(var(--tw-colors-background-secondary))',
        },
        foreground: 'hsl(var(--tw-colors-foreground))',
        border: 'hsl(var(--tw-colors-border))',
      },
      borderRadius: {
        lg: 'var(--tw-border-radius)',
        md: 'calc(var(--tw-border-radius) - 2px)',
        sm: 'calc(var(--tw-border-radius) - 4px)',
      },
      borderColor: {
        border: 'hsl(var(--tw-colors-border))'
      }
    },
  },
  plugins: [],
};

export default config;