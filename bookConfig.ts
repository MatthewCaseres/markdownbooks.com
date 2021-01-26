import { summaryToUrlTree, UserFunction, UrlNode } from "mdxbook";
import GithubSlugger from 'github-slugger'
import visit from 'unist-util-visit'
import yaml from 'js-yaml'
import fs from 'fs'

//Let the user add a function
const userFunction: UserFunction  = (node: any, { mdast, frontMatter }) => {
  const idRegex = /_id=([0-9A-Fa-f-]+)\s*$/;
  const routePrefix = node.route;
  var slugger = new GithubSlugger();
  let headers: any[] = [];
  visit(mdast, 'heading', (mdNode: any) => {
    if (mdNode.depth === 2) {
      let headerMatch = mdNode.children[0].value.match(idRegex);
      let header: any = {};
      if (headerMatch) {
        header.id = headerMatch[1];
        header.title = mdNode.children[0].value.replace(idRegex, '');
      } else {
        header.title = mdNode.children[0].value;
      }
      header.route = routePrefix + '/#' + slugger.slug(header.title);
      header.type = 'heading';
      headers.push(header);
    }
  });
  node.children = headers;
};

(async () => {
  const scsTree = await summaryToUrlTree({
    url: "https://github.com/MatthewCaseres/secure-computer-systems/blob/main/TOC.md",
    localPath: "/Users/matthewcaseres/Documents/GitHub/secure-computer-systems/TOC.md"
  })
  const mdxDocsTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/mdxbook/blob/main/DOCS/DOCS.md",
    localPath: "/Users/matthewcaseres/Documents/GitHub/mdxbook/DOCS/DOCS.md"
  })
  fs.writeFileSync('bookConfig.json', JSON.stringify([scsTree, mdxDocsTree]))
})();


