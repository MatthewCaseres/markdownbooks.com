import { summariesToTrees } from "next-mdx-books";

(async () => {
  await summariesToTrees(
    [
      {url: "https://github.com/Open-EdTech/AWS-CSA/blob/main/DOCS.md",
      localPath: '/Users/matthewcaseres/Documents/GitHub/AWS-CSA/DOCS.md'},
      {
        url: "https://github.com/GitbookIO/javascript/blob/master/SUMMARY.md",
        removeHeadings: true,
      },
      {
        url:
          "https://github.com/basarat/typescript-book/blob/master/SUMMARY.md",
        removeHeadings: true,
      },
    ],
    "https://raw.githubusercontent.com/"
  );
})();
