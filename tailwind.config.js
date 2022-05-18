module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2F3C7E",
          secondary: "#FBEAEB",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
