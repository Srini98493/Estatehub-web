/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#1aaddd',
        'gradient-end': '#117b9d',
        primary: {
          DEFAULT: '#1aaddd',
          hover: '#117b9d',
          light: '#e6f7fc',
        },
        secondary: {
          DEFAULT: '#117b9d',
          hover: '#0d5d77',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      backgroundColor: {
        primary: '#1aaddd',
        secondary: '#117b9d',
        tertiary: '#1094BF',
      },
      textColor: {
        primary: '#111827',
        secondary: '#4B5563',
        tertiary: '#9CA3AF',
      },
      borderColor: {
        DEFAULT: '#E5E7EB',
        hover: '#D1D5DB',
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
        heading: ['var(--font-heading)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionProperty: {
        DEFAULT: 'var(--transition-all)',
        colors: 'var(--transition-colors)',
        opacity: 'var(--transition-opacity)',
        transform: 'var(--transition-transform)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #1aaddd, #117b9d)',
        'primary-gradient-hover': 'linear-gradient(to right, #117b9d, #1aaddd)',
      },
    },
  },
  plugins: [],
};