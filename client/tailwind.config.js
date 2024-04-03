/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#572ac8',
        secondary: '#eceae8',
        black: '#011222',
        white: '#f6f9fc',
        success: '#00bd5e',
        warning: '#f58700',
        danger: '#c53030',
        green: '#07794c',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        xsm: '420px',
      },
    },
  },
  plugins: [],
}
