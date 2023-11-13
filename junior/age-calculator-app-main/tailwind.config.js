/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      borderRadius: {
        '10xl': '8rem'
      },
      letterSpacing: {
        'widest': '.3em'
      },
      borderWidth: {
        '1': '1px'
      },
      fontSize: {
        '5.25xl': '52px'
      },
      strokeWidth: {
        '3': '3',
        '4': '4'
      }
    }
  },
  plugins: [],
}

