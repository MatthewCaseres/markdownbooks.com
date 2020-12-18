import { summariesToTrees } from "next-mdx-books";

(async () => {
  await summariesToTrees([
    {
      url:
        "https://github.com/Open-EdTech/mostly-adequate-guide/blob/master/SUMMARY.md",
    },
    {
      url: "https://github.com/basarat/typescript-book/blob/master/SUMMARY.md",
      removeHeadings: true
    },
  ]);
})();
