import { summaryToUrlTree, UserFunction } from "github-books";
import fs from "fs";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();
let allHeaders: HeadersConfig = [];
let allFiles: string[] = [];
export type HeadersConfig = { depth: number; title: string; slug: string }[];

const headersFunction: UserFunction = ({ mdast, file }) => {
  const headers: HeadersConfig = [];
  for (let node of mdast.children) {
    if (node.type === "heading" && (node.depth === 1 || node.depth === 2)) {
      const depth = node.depth;
      const title = node.children[0].value;
      const slug = slugger.slug(title);
      headers.push({ depth, title, slug });
    }
  }
  allHeaders = [...allHeaders, ...headers];
  allFiles = [...allFiles, file];
};

(async () => {
  const bookTree = await summaryToUrlTree({
    url: "dummyURL",
    localPath:
      "/Users/matthewcaseres/Documents/GitHub/AWS-Notes/source/00-index.md",
    userFunction: headersFunction,
  });
  const title = `# ${bookTree.title} \r\n\r\n`;
  const TOC = allHeaders
    .map(
      (header) =>
        `${header.depth === 1 ? "" : "\t"}* [${header.title}](#${
          header.slug
        }) \r\n`
    )
    .join("");
  fs.writeFileSync(
    "README.md",
    title + TOC + "\r\n" + allFiles.join("\r\n")
  );
})();
