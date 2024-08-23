import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const bgPlugin = plugin(function ({ addComponents }) {
  addComponents({
    '.bg-pattern': {
      backgroundImage: 'url("./bg.png")',
      backgroundRepeat: 'no-repeat',
    },
    '@keyframes loop-slide': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-100%)',
      },
    },
    '.loop-animation': {
      display: 'flex',
      animation: 'loop-slide 20s infinite linear 1s both',
    },
  });
});

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    bgPlugin,
  ],
};

export default config;
