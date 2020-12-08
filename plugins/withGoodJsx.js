const visit = require("unist-util-visit");

module.exports.withGoodJsx = () => {
  return (tree) => {
    let r = /<\s*MCQ\s*{\s*...\s*{[^>]*}\s*}\s*\/\s*>\s*$/;
    visit(tree, "jsx", (node, index, parent) => {
      if (!r.test(node.value)) {
        parent.children.splice(index, 1);
        // Do not traverse `node`, continue at the node *now* at `index`.
        return [visit.SKIP, index];
      }
    });
  };
};