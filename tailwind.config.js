/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'granby-maroon': '#8C1D40',
        'granby-gold': '#D4A843',
        'granby-gold-light': '#f9f4eb',
        'warm': '#faf8f6',
        'muted': '#666666',
        'alert-red': '#c0392b',
      },
      fontFamily: {
        heading: ['Merriweather', 'Georgia', 'serif'],
        body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
