/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF85A1',
        'primary-dark': '#E66A8A',
        'primary-soft': '#FFE5EE',
        'cream': '#FFF6FA',
      },
      fontFamily: {
        body: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['"Fredoka One"', 'cursive'],
      },
      borderRadius: {
        chunky: '20px',
        chunkier: '24px',
      },
      boxShadow: {
        press: '0 4px 0 0 rgba(0,0,0,0.15)',
        'press-primary': '0 4px 0 0 #E66A8A',
      },
    },
  },
  plugins: [],
}
