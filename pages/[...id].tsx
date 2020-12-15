import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  SideBarProvider,
  StatefulNode,
} from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import { getMdSource, getAllRawRoutes, getYamlUrlTree, UrlNode } from "edtech"
import renderToString from "next-mdx-remote/render-to-string";
import hydrate, { Source } from "next-mdx-remote/hydrate";
import { useEffect } from "react";
import { Refresh } from "@material-ui/icons";
var slug = require("remark-slug")
import DarkToggle, { DarkProvider } from "../components/DarkToggle";


const yamlUrls = [
  "https://raw.githubusercontent.com/Open-EdTech/AWS-CSA/main/urlTree.yml",
  "https://raw.githubusercontent.com/Open-EdTech/probability/main/urlTree.yml",
  "https://raw.githubusercontent.com/Open-EdTech/functional-programming-interactive/master/urlTree.yml",
];
const localUrls = [
  "C:\\Users\\matth\\OneDrive\\Documents\\GitHub\\probability\\urlTree.yml",
  "C:\\Users\\matth\\OneDrive\\Documents\\GitHub\\AWS-exam\\urlTree.yml",
  "C:\\Users\\matth\\OneDrive\\Documents\\GitHub\\functional-programming-interactive\\urlTree.yml",
];
const remote = true
const allRawRoutes = await getAllRawRoutes(remote ? yamlUrls : localUrls, remote);
const routeUrlTree = await getYamlUrlTree(
  remote ? yamlUrls : localUrls,
  remote
);

function Post({ urlTree, mdxSource, hashRoute }: { urlTree: UrlNode; mdxSource: Source; hashRoute: string }) {
  const router = useRouter();
  const { id } = router.query;
  const content = hydrate(mdxSource);
  return (
    <DarkProvider>
      <SideBarProvider config={urlTree.children as StatefulNode[]}>
        <SideBar>
          <DarkToggle />
          <div className="prose dark:prose-dark max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl m-auto px-2 flex-1 ">
            <div>{content}</div>
          </div>
        </SideBar>
      </SideBarProvider>
    </DarkProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stringRoute = (params!.id as string[]).join("/")
  const hashRoute = allRawRoutes[stringRoute].route;
  const source = await getMdSource(
    stringRoute,
    allRawRoutes,
    remote
  );
  const mdxSource = await renderToString(source, {mdxOptions: {
    remarkPlugins: [slug]
  }});
  const urlTree = routeUrlTree[allRawRoutes[stringRoute].yamlUrl];
  return {
    props: { urlTree, mdxSource, hashRoute }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(allRawRoutes).map((routeString) => ({
      params: {
        id: routeString.split("/"),
      },
    })),
    fallback: false,
  };
};

export default Post;
