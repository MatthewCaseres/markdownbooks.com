import { summaryToUrlTree, UserFunction, getAllRoutesInfo } from "github-books"
import fs from 'fs'
import visit from 'unist-util-visit'
import GithubSlugger from 'github-slugger'

let allHeaders: Record<string, any> = {}
export type HeadersConfig = {depth: number, title: string, slug: string}[]

const headersFunction: UserFunction = ({ treeNode, mdast }) => {
  console.log(treeNode)
  const routePrefix = treeNode.route;
  var slugger = new GithubSlugger();
  const headers: HeadersConfig = []
  for (let node of mdast.children) {
    if(node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const depth = node.depth
      const title = node.children[0].value
      const slug = slugger.slug(title)
      headers.push({depth, title, slug})
    }
  }
  allHeaders[routePrefix] = headers
}

(async () => {
  // const tsTree = await summaryToUrlTree({
  //   url: "https://github.com/basarat/typescript-book/blob/master/SUMMARY.md",
  //   userFunction: headersFunction
  // })
  const osTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/library/blob/main/OMSCS-OS.md",
    userFunction: headersFunction
  })
  const awsTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/AWS-Associate-Notes/blob/main/00-index.md",
    userFunction: headersFunction
  })
  const bibleTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/library/blob/main/Bible-KJV.md",
    userFunction: headersFunction,
  })
  fs.writeFileSync('bookPageHeadings.json', JSON.stringify(allHeaders))
  fs.writeFileSync('bookConfig.json', JSON.stringify([osTree, bibleTree, awsTree]))
  // fs.writeFileSync('bookConfig.json', JSON.stringify([awsTree]))
})();


