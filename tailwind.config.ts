import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sp: { max: '768px' },
        pc: { min: '769px' },
      },
      colors: {
        primaryColor: '#FFFFFF',
        blackColor: '#111111',
        pinkColor: '#E85F9D',
        successColor: '#00AF95',
        errorColor: '#C00505',
        goldColor: '#FFC107',
        transparent: '#99FFFFFF',
        placeholderColor: '#9B9B9B',
        thinGrayColor: '#5D5D5D',
        thinGrayLineColor: '#D9D9D9',
        cancelColor: '#E6000F',
        disabledColor: '#F1F1F1',
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.375rem', // 22px
        '3xl': '1.5rem', // 24px
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
        'title-pc': ['clamp(18px, 2vw + 1rem, 22px)', '1.5'],
        'title-sp': ['clamp(18px, 3vw + 1rem, 20px)', '1.5'],
        conent: ['clamp(14px, 3vw + 1rem, 16px)', '1.5'],
      },
    },
  },
  plugins: [],
} satisfies Config;
