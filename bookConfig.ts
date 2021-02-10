import { summaryToUrlTree, UserFunction } from "github-books"
import fs from 'fs'
import visit from 'unist-util-visit'
import GithubSlugger from 'github-slugger'

const headersFunction: UserFunction = (node: any, { mdast, frontMatter}) => {
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
  const fpTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/library/blob/main/JavaScript-Functional-Programming.md",
    userFunction: headersFunction
  })
  const tsTree = await summaryToUrlTree({
    url: "https://github.com/basarat/typescript-book/blob/master/SUMMARY.md"
  })
  const osTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/library/blob/main/OMSCS-OS.md",
    userFunction: headersFunction
  })
  const bibleTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/library/blob/main/Bible-KJV.md",
    userFunction: headersFunction
  })
  fs.writeFileSync('bookConfig.json', JSON.stringify([bibleTree, osTree, tsTree, fpTree]))
})();


