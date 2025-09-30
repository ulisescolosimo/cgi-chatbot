/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  
  theme: {
    extend: {
      colors: {
        'primary-blue': '#46A8C6',
        'primary-orange': '#F98E2B',
        'bg-gray': '#F0F3F6',
      },
    },
  },
  plugins: [],
}

