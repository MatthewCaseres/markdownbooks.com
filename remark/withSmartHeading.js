import GitHubSlugger from 'github-slugger'

export default function smartHeaders () {
  const slugger = new GitHubSlugger()
  let headingIndex = 0
  return (tree) => {
    for (let node of tree.children) {
      if(node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
        const depth = node.depth
        const title = node.children[0].value
        const slug = slugger.slug(title)
        node.type = 'jsx'
        node.value = `<SmartHeading {...${JSON.stringify({depth, slug, title, headingIndex})}} />`
        headingIndex++
      }
    }
  }
}