import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import {
  SideBarProvider,
  StatefulNode,
} from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import { getMdSource, getAllRawRoutes, getYamlUrlTree, Node } from "edtech"
import renderToString from "next-mdx-remote/render-to-string";
import hydrate, { Source } from "next-mdx-remote/hydrate";

const yamlUrls = [
  "https://raw.githubusercontent.com/Open-EdTech/AWS-CSA/main/urlTree.yml",
  "https://raw.githubusercontent.com/Open-EdTech/probability/main/urlTree.yml",
];
const allRawRoutes = await getAllRawRoutes(yamlUrls);
const routeUrlTree = await getYamlUrlTree(yamlUrls);
const remote = true;

function Post({ urlTree, mdxSource }: { urlTree: Node; mdxSource: Source }) {
  const router = useRouter();
  const { id } = router.query;
  const content = hydrate(mdxSource);
  urlTree

  return (
    <SideBarProvider config={urlTree.children as StatefulNode[]}>
      <SideBar>
        <div className="prose lg:max-w-3xl m-auto px-2 flex-1">
          <p>Post: {id}</p>
          <div>{content}</div>
        </div>
      </SideBar>
    </SideBarProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(routeUrlTree)
  
  const stringRoute = (params!.id as string[]).join("/")
  console.log(allRawRoutes[stringRoute].yamlUrl);
  const source = await getMdSource(
    stringRoute,
    allRawRoutes,
    remote
  );
  const mdxSource = await renderToString(source);
  const urlTree = routeUrlTree[allRawRoutes[stringRoute].yamlUrl];
  return {
    props: { urlTree, mdxSource }, // will be passed to the page component as props
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
