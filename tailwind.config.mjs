/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: '#88c0d0',
        secondary: '#81a1c1',
        accent: '#a3be8c',
      },
    },
  },
  plugins: [],
};
