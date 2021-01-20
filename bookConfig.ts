import { summaryToUrlTree, UserFunction, UrlNode } from "mdxbook";
import GithubSlugger from 'github-slugger'
import visit from 'unist-util-visit'
import yaml from 'js-yaml'
import fs from 'fs'

//Let the user add a function
const userFunction: UserFunction  = (node: any, { mdast, frontMatter }) => {
  const idRegex = /_id=([0-9A-Fa-f-]+)\s*$/;
  const routePrefix = node.route;
  var slugger = new GithubSlugger();
  let headers: any[] = [];
  visit(mdast, 'heading', (mdNode: any) => {
    if (mdNode.depth === 2) {
      let headerMatch = mdNode.children[0].value.match(idRegex);
      let header: any = {};
      if (headerMatch) {
        header.id = headerMatch[1];
        header.title = mdNode.children[0].value.replace(idRegex, '');
      } else {
        header.title = mdNode.children[0].value;
      }
      header.route = routePrefix + '/#' + slugger.slug(header.title);
      header.type = 'heading';
      headers.push(header);
    }
  });
  let problems: any[] = [];
  let problemCount = 1
  visit(mdast, 'code', (node: any) => {
    if (node.lang?.includes('edtech')) {
      let problemData = yaml.safeLoad(node.value) as any;
      if(!problemData.id){
        throw new Error("There is no ID on your edtech component")
      }
      let problem = {
        type: node.lang,
        title: `problem ${problemCount}`,
        id: problemData.id,
        route: routePrefix + '/#' + problemData.id
      };
      problemCount += 1
      if (problem.id) {
        problems.push(problem);
      }
    }
  });
  node.children = [...headers, ...problems];
};

(async () => {
  const awsTree = await summaryToUrlTree({
    url: "https://github.com/Open-EdTech/AWS-CSA/blob/main/DOCS.md",
    localPath: "/Users/matthewcaseres/Documents/GitHub/AWS-CSA/DOCS.md",
    userFunction: userFunction
  });
  fs.writeFileSync('bookConfig.json', JSON.stringify([awsTree]))
})();


