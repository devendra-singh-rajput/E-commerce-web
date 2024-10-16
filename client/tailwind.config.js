/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'right-custom': '4px 0 10px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary:"#dc2626",
         secondary:"#b91c1c"

      },
      
    },
  },
  plugins: [],
}