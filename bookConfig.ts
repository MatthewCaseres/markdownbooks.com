import { summariesToTrees } from "next-mdx-books";

(async () => {
  await summariesToTrees(
    [
      {url: "https://github.com/MatthewCaseres/scrape-bibles/blob/main/CPDV/00-Index.md"}, 
      {url: "https://github.com/Open-EdTech/kjv-markdown/blob/master/TOC.md"},
      {url: "https://github.com/Open-EdTech/AWS-CSA/blob/main/DOCS.md"},
      {
        url:
          "https://github.com/Open-EdTech/next-mdx-books/blob/main/DOCS/DOCS.md",
      },
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
