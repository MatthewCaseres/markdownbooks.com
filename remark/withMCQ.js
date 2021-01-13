import visit from 'unist-util-visit'
import yaml from 'js-yaml'
const withMCQ = () => (tree) => {
  visit(tree, "code", (node) => {
    if (node.lang === "edtech-mcq") {
      node.type = "jsx";
      const props = yaml.safeLoad(node.value);
      node.value = `<MCQ {...${JSON.stringify(props)}}/>`;
    }
  });
};
export default withMCQ