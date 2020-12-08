const visit = require("unist-util-visit");
const yaml = require("js-yaml");

module.exports.withCustomCode = () => {
  return (tree) => {
    let r = /<\s*MCQ\s+config\s*=\s*{\s*({[^>]*})\s*}\s*\/\s*>\s*$/;
    visit(tree, "code", (node) => {
      if(node.lang === 'multiple-choice') {
        console.log(node.value)
        let config = yaml.safeLoad(node.value)
        node.type = 'jsx'
        node.value = `<MCQ {...${JSON.stringify(config)}}/>`
      }
    });
  };
};
