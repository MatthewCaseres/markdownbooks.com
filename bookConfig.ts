import { summariesToTrees } from "next-mdx-books";

(async () => {
  await summariesToTrees([
    {
      url:
        "https://github.com/Open-EdTech/mostly-adequate-guide/blob/master/SUMMARY.md",
    },
  ]);
})();
