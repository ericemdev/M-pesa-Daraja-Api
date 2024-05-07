module.exports = {
  content: ["./src/**/*.{svelte,js,css}"],
  theme: {
    extend: {
      colors: {
        primary: "#15211F",
        secondary: "#3a31da",
        fade: "#fefe22",
        bgw: "#3a31da",
        bgb: "#f1f3ff"
      },

      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] ,
        'roboto': ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
  variants: {
    display: ["group-hover"],
  },
}