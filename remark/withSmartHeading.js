import visit from 'unist-util-visit'
import GitHubSlugger from 'github-slugger'

export default function smartHeaders () {
  const slugger = new GitHubSlugger()
  return (tree) => {
    const idRegex = /\s*_id=(.+)/
    visit(tree, 'heading', node => {
      if (node.depth === 2 && idRegex.test(node.children[0].value)) {
        const hText = node.children[0].value
        const id = idRegex.test(hText) && hText.match(idRegex)[1]
        const contents = hText.replace(idRegex, '')
        const slug = slugger.slug(contents)
        node.type = 'jsx'
        node.value = `<SmartHeading {...${JSON.stringify({id, slug, contents})}}/>`
      }
      console.log(node)
    })
  }
}