module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#007AC2',
        'secondary': '#18C2E6',
        'dark': '#004673',
        'disabled': '#B8B8B8',
        'light': '#8CE6FF',
        'danger': '#EF4444'
      },
      boxShadow: {
        'normal': '0px 1px 40px 0px rgba(0,0,0,0.05)',
        'card': '4px 4px 40px 0px rgb(0,0,0,0.05)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
