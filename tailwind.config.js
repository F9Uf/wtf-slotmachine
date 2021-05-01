module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      'normal': '0px 1px 40px 0px rgba(0,0,0,0.05)',
      'card': '4px 4px 40px 0px rgb(0,0,0,0.05)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
