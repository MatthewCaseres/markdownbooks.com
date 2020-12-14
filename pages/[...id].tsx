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
  console.log(hashRoute)
  const router = useRouter();
  const { id } = router.query;
  const content = hydrate(mdxSource);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log("App is changing to: ", url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <SideBarProvider config={urlTree.children as StatefulNode[]}>
      <SideBar>
        <button
          onClick={() =>
            {router.push(
              "/Open-EdTech/functional-programming-interactive/ch02.md#why-favor-first-class"
            ); router.push(
              "/Open-EdTech/functional-programming-interactive/ch02.md#why-favor-first-class"
            );}
          }
        >
          lol
        </button>
        <div className="prose max-w-sm sm:max-w-md lg:max-w-xl m-auto px-2 flex-1">
          <div>{content}</div>
        </div>
      </SideBar>
    </SideBarProvider>
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
