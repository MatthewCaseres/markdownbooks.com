module.exports = {
  darkMode: "class",
  purge: ["./pages/**/*.js", "./pages/**/*.tsx", "./components/**/*.tsx", "./components/**/*.js"],
  theme: {
    extend: {
      colors: {
        dark: "#24283b",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            a: {
              color: theme("colors.blue.700"),
              "&:hover": {
                color: theme("colors.blue.700"),
                textDecoration: "none",
              },
            },
            "h2 a": {
              color: theme("colors.gray.900"),
              textDecoration: "none",
            },
            ".tag a": {
              textDecoration: "none",
            },
          },
        },

        dark: {
          css: {
            color: "white",
            a: {
              color: "#9ECE6A",
              "&:hover": {
                color: "#9ECE6A",
              },
            },

            "h2 a": {
              color: "#A9B1D6",
            },

            h1: {
              color: "#A9B1D6",
            },
            h2: {
              color: "#A9B1D6",
            },
            h3: {
              color: "#A9B1D6",
            },
            h4: {
              color: "#A9B1D6",
            },
            h5: {
              color: "#A9B1D6",
            },
            h6: {
              color: "#A9B1D6",
            },

            strong: {
              color: "#A9B1D6",
            },

            code: {
              color: "#A9B1D6",
            },

            figcaption: {
              color: theme("colors.gray.500"),
            },
            blockquote: {
              color: "white",
            },

            "::selection": {
              backgroundColor: "#6f7bb635",
            },
          },
        },
      }),
    },
  },
  variants: {
    scrollbar: ["dark"],
    extend: {
      typography: ["dark"],
      borderWidth: ["last"]
    },
    
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
