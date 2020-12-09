const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./pages/*.{js, jsx, ts, tsx}",
      "./pages/**/*.{js, jsx, ts, tsx}",
      "./components/*.{js, jsx, ts, tsx}",
      "./components/**/*.{js, jsx, ts, tsx}",
    ],

    // make sure css reset isnt removed on html and body
    whitelist: ["html", "body"],

    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "tailwindcss",
    process.env.NODE_ENV === "production" ? purgecss : undefined,
    "postcss-preset-env",
  ],
};
