import visit from 'unist-util-visit'
import yaml from 'js-yaml'
import produce from 'immer'
import toMarkdown from 'mdast-util-to-markdown'
import toString from 'mdast-util-to-string'
export const hidRegex = /<details\s+hid="(.+)"/
const solutionRegex = /\/\s*summary>\s*(.*)(?=<\/details)/s
const withMCQ = () => (tree) => {
  let i = 0
  for (let i = tree.children.length - 1; i > -1; i--) {
    //We delete multiple, so skip soome iterations
    if(!tree.children[i]){ 
      continue
    }
    if (tree.children[i].type === "jsx" && tree.children[i].value.match(hidRegex)) {
      const id = tree.children[i].value.match(hidRegex)[1]
      if(!tree.children[i].value.match(solutionRegex)){
        console.log(tree.children[i].value)
      }
      const solution = tree.children[i].value.match(solutionRegex)[1]
      //Answers must be plaintext, i.e. no bold
      const answers = tree.children[i-1].children.map(li => {
        return li.children[0].children[0].value
      })
      let j = 2
      while (tree.children[i-j].type !== "heading") {
        j++
      }
      const prompt = toMarkdown({type: "root", children: tree.children.slice(i-j + 1, i-1)})
      const correct_idx = answers.findIndex(answer => answer.match(/[a-zA-Z]+/)[0] === solution.match(/[a-zA-z]+/)[0])
      const head_text = toString(tree.children[i-j])
      tree.children[i].value = `<MCQ {...${JSON.stringify({id, solution, answers, prompt, correct_idx, head_text})}}/>`
      tree.children = [...tree.children.slice(0, i-j), ...tree.children.slice(i, tree.children.length)]
    }
  }
};
export default withMCQ