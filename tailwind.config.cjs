module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F28C28",
          dark: "#d37a1f",
          blue: "#1E3A8A"
        }
      },
      borderRadius: {
        kiosk: "28px"
      },
      fontFamily: {
        josefin: ["Josefin Sans"],
      },
    },
  },
  plugins: [],
}
