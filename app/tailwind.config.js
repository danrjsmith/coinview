module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    filter: {
      blur: "blur(1px)",
    },
    extend: {
      height: {
        "screen/2": "50vh",
        "screen/3": "33.3vh",
        "screen/4": "25vh",
      },
      height: {
        "w-screen/2": "50vw",
        "w-screen/3": "33.3vw",
        "w-screen/4": "25vw",
      },
      width: {
        content: "730px",
      },
      maxWidth: {
        "250": "250px",
        "screen-margin": "90vw",
      },
      maxHeight: {
        "250": "250px",
      },
      gridTemplateRows: {
        "5:3": "5fr 3fr",
        "5:7": "5fr 7fr",
        "3:4:3": "3fr 4fr 3fr",
      },
      gridTemplateColumns: {
        "2:6:2": "2fr 6fr 2fr",
      },
      zIndex: {
        "100": 100,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
