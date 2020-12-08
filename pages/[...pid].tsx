import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { SideBarProvider, config, configState } from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate, { Source } from "next-mdx-remote/hydrate";
import { ChildFriendly } from "@material-ui/icons";
import { Draft } from "immer";

const yaml = require("js-yaml");


// console.log(json)
async function getConfig() {
  const yamlText = await(
    await fetch(
      `https://raw.githubusercontent.com/Open-EdTech/AWS-CSA/main/lol.yml`
    )
  ).text();
  const json = yaml.safeLoad(yamlText);
  formatConfig(json);
  return json
}

function formatConfig(config: any) {
  for (let child of config) {
    if (!(child.type === "file")) {
      console.log(child.route)
      delete child.route
    }
    if(child.children){
      formatConfig(child.children)
    }
  }
}



export const getStaticProps: GetStaticProps = async ({params}) => {
  const path = params!.pid as string[]
  const json = await getConfig()
  let item = json
  for(let i = 0; i < path.length; i++) {
    item = (item.children ?? item).find((child: any) => child.name.replace(".md","") === path[i])
  }
  const source = await(
    await fetch(
      item.url
    )
  ).text();
  const mdxSource = await renderToString(source)
  return {
    props: { json, mdxSource }, // will be passed to the page component as props
  };
};

function Post({ json, mdxSource }: {json: any, mdxSource: Source}) {
  const router = useRouter();
  const { pid } = router.query;
  const content = hydrate(mdxSource);

  return (
    <SideBarProvider config={json}>
      <SideBar>
        <div className="prose lg:max-w-3xl m-auto px-2 flex-1">
          <p>
            Post: {pid}
          </p>
          <div>
            {content}
          </div>
        </div>
      </SideBar>
    </SideBarProvider>
  );
};

function getPathForNext(config: any) {
  let routes: string[][] = [];
  function dfs(child: any) {
    if (child.type == "file") {
      routes.push(child.route.split("/"));
    }
    if (child.children) {
      for (let nxtChild of child.children) {
        dfs(nxtChild);
      }
    }
  }
  for (let child of config) {
    dfs(child);
  }
  return routes;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const json = await getConfig();
  let goodPaths = getPathForNext(json);
  let addedPaths = goodPaths.map(path => ({params: {pid: path}}))

  return {
    paths: [
      { params: {pid: ["1"]}  },
      { params: {pid: ["2"]}  },
      ...addedPaths
    ],
    fallback: true
  };
}

export default Post;
