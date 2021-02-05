import { summaryToUrlTree, UserFunction } from "mdxbook";
import GithubSlugger from 'github-slugger'
import visit from 'unist-util-visit'
import fs from 'fs'

const headersFunction: UserFunction = (node: any, { mdast }) => {
  const routePrefix = node.route;
  var slugger = new GithubSlugger();
  const headers: any[] = []
  visit(mdast, "heading", (node: any) => {
    if (node.depth === 2) {
      headers.push({
        type: "heading",
        title: node.children[0].value,
        route: routePrefix + '#' + slugger.slug(node.children[0].value)
      })
    }
  })
  node.children = headers
}

(async () => {
  const mdxDocsTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/mdxbook/blob/main/DOCS/DOCS.md",
    localPath: "/Users/matthewcaseres/Documents/GitHub/mdxbook/DOCS/DOCS.md",
    userFunction: headersFunction
  })
  fs.writeFileSync('bookConfig.json', JSON.stringify([mdxDocsTree]))
})();


