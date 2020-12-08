const { addImport, addExport } = require("./importsExports");
const visit = require("unist-util-visit");

module.exports.withHastLog = () => {
  return (tree) => {
    // let r = /<\s*MCQ\s+config\s*=\s*{\s*({[^>]*})\s*}\s*\/\s*>\s*$/
    // visit(tree, 'jsx', (node) => {
    //   if(r.test(node.value)){
    //     node.type = "jsx"
    //   }
    // });
    console.dir(tree, {depth: null})
  };
};
