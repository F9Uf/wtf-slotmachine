module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      'normal': '0px 1px 30px 0px rgba(0,0,0,0.1)',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
