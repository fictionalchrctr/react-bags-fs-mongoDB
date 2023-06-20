/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter One', 'sans-serif'],
      },
      colors: {
        cranberry: '#df7483',
        watermelon: '#DF4E62',
        bloodRuby: '#7B0818',
        cherymMahogany: '#8e323e',
        carmineTomatoRaspberry: '#be1931',
        peachSalmon: '#f66',
      },
    },
  },
  plugins: [],
}
