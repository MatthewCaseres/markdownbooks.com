import { summariesToTrees } from "next-mdx-books";

(async () => {
  await summariesToTrees(
    [
      {
        url:
          "https://github.com/MatthewCaseres/mostly-adequate-guide/blob/master/SUMMARY.md",
      },
      {
        url:
          "https://github.com/basarat/typescript-book/blob/master/SUMMARY.md",
        removeHeadings: true,
      },
      {
        url: "https://github.com/GitbookIO/javascript/blob/master/SUMMARY.md",
        removeHeadings: true,
      },
    ],
    "https://raw.githubusercontent.com/"
  );
})();
