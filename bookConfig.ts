import { summaryToUrlTree, UserFunction } from "github-books";
import GithubSlugger from 'github-slugger'
import visit from 'unist-util-visit'
import fs from 'fs'

//Use this in the userFunction property of your configuration (if files not have file children)
const headersFunction: UserFunction = (node, { mdast }) => {
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
  const tsTree = await summaryToUrlTree({
    url: "https://github.com/basarat/typescript-book/blob/master/SUMMARY.md"
  })
  fs.writeFileSync('bookConfig.json', JSON.stringify([tsTree]))
})();


