import visit from 'unist-util-visit'
import yaml from 'js-yaml'
const withMCQ = () => (tree) => {
  visit(tree, "code", (node) => {
    if (node.lang === "edtech-mcq") {
      node.type = "jsx";
      const props = yaml.safeLoad(node.value);
      //TODO, validate JSON
      console.log(props)
      node.value = `<MCQ {...${JSON.stringify(props)}}/>`;
      console.log(node.value)
    }
  });
};
export default withMCQ