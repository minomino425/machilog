import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const bgPlugin = plugin(function ({ addComponents }) {
  addComponents({
    '.bg-pattern': {
      backgroundImage: 'url("./bg.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
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
