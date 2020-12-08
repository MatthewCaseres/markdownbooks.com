const visit = require("unist-util-visit");

module.exports.withMdastLog = () => {
  return (tree) => {
    console.dir(tree, { depth: null });
    // visit(tree, (node) => {
    //   console.log(node)
    // });
  };
};
