import { summaryToUrlTree, UserFunction } from "@brainfried/github-books";
import fs from "fs";
import visit from "unist-util-visit";
import GithubSlugger from "github-slugger";

let allHeaders: Record<string, any> = {};
// let headers: any[] = [];
export type HeadersConfig = { depth: number; title: string; slug: string }[];

const headersFunction: UserFunction = ({ treeNode, mdast, frontMatter }) => {
  console.log("treeNode: " + JSON.stringify(treeNode) + "\n");
  const routePrefix = treeNode.route;
  var slugger = new GithubSlugger();
  const headers: HeadersConfig = [];
  for (let node of mdast.children) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const depth = node.depth;
      const title = node.children[0].value;
      const slug = slugger.slug(title);
      headers.push({ depth, title, slug });
    }
  }
  allHeaders[routePrefix] = headers;
};

// const userFunction: UserFunction = ({ treeNode, mdast, frontMatter }) => {
//   console.log("TreeNode: " + JSON.stringify(treeNode) + "\n");
//   const routePrefix = treeNode.route;
//   var slugger = new GithubSlugger();
//   // let headers: any[] = [];
//   visit(mdast, "heading", (mdNode: any) => {
//     if (mdNode.depth === 2) {
//       let header: any = {};
//       header.title = mdNode.children[0].value;
//       header.route = routePrefix + "/#" + slugger.slug(header.title);
//       header.type = "heading";
//       headers.push(header);
//     }
//   });
//   if (headers.length > 0) {
//     treeNode.headers = headers;
//   }
//   if (Object.keys(frontMatter).length > 0) {
//     treeNode.frontMatter = frontMatter;
//   }
// };

(async () => {
  const awsTree = await summaryToUrlTree({
    url: "https://github.com/dylviz/site/blob/main/README.md",
    userFunction: headersFunction,
  });

  fs.writeFileSync("bookPageHeadings.json", JSON.stringify(allHeaders));
  fs.writeFileSync("bookConfig.json", JSON.stringify(awsTree));
})();
