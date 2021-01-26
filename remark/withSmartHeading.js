import visit from 'unist-util-visit'
import GitHubSlugger from 'github-slugger'
import unified from 'unified'
import rehype from 'rehype-parse'


export default function smartHeaders () {
  const slugger = new GitHubSlugger()
  return (tree) => {
    const idRegex = /^<h[123]\s+hid="([^"]+)">(.+)(?=<\/h)/
    
    visit(tree, 'jsx', (node) => {
      const matches = node.value.match(idRegex)
      if (matches) {
        const depth = matches[0].slice(2,3)
        const id = matches[1]
        const contents = matches[2]
        const slug = slugger.slug(contents)
        node.value = `<SmartHeading {...${JSON.stringify({depth, id, slug, contents})}} />`
        console.log(node.value)
      }
    })
  }
}