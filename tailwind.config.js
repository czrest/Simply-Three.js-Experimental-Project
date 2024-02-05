/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        leony: ['leony', 'sans'],
        codecl: ['codecl', 'sans'],
        codect: ['codect', 'sans'],
        retro: ['retro', 'sans'],
        noto: ['noto', 'sans'],
        tale: ['tale', 'sans']
      },
      colors:{
        accent:{
          1:"hsl(var(--color-accent1) / <alpha-value>)",
          2:"hsl(var(--color-accent2) / <alpha-value>)",
        },
        bkg: "hsl(var(--color-bkg) / <alpha-value>)",
        content: "hsl(var(--color-content) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}