import { GetStaticPaths, GetStaticProps } from "next";
import {
  SideBarProvider,
  StatefulNode,
} from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import { getMdSource, getAllRoutesInfo } from "next-mdx-books";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate, { Source } from "next-mdx-remote/hydrate";
import CustomLink from "../components/CustomLink";
import bookConfig from '../bookConfig.json'
import withSmartHeading from '../remark/withSmartHeading'
import {UrlNode} from 'next-mdx-books'
import SmartHeading from '../components/SmartHeading'
import MCQ from '../components/MCQ'
import withMCQ from '../remark/withMCQ'
var slug = require("remark-slug");


const components = {
  CustomLink, SmartHeading, MCQ
};
const remote = false;

type PostProps = { urlTree: UrlNode; mdxSource: Source, ghUrl: string, treePath: ReadonlyArray<number> }
function Post({ urlTree, mdxSource, ghUrl, treePath }: PostProps) {
  const content = hydrate(mdxSource, {components});
  return (
      <SideBarProvider config={urlTree.children as StatefulNode[]}>
        <SideBar ghUrl={ghUrl} treePath={treePath}>
          <div className="prose dark:prose-dark max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl m-auto px-2 flex-1 ">
            <div>{content}</div>
          </div>
        </SideBar>
      </SideBarProvider>
  );
}





export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allRoutesInfo = getAllRoutesInfo(bookConfig as UrlNode[]);
  const stringRoute = (params!.id as string[]).join("/");
  const {index: nodeIndex, ghUrl, treePath} = allRoutesInfo[stringRoute]
  const urlTree = bookConfig[nodeIndex];
  const source = await getMdSource(stringRoute, allRoutesInfo, remote);

  const mdxSource = await renderToString(source, {
    mdxOptions: {
      remarkPlugins: [
        withSmartHeading,
        slug,
        withMCQ
      ],
    },
    components,
  });
  return {
    props: { urlTree, mdxSource, ghUrl, treePath }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allRoutesInfo = getAllRoutesInfo(bookConfig as UrlNode[]);
  return {
    paths: Object.keys(allRoutesInfo).map((routeString) => ({
      params: {
        id: routeString.split("/"),
      },
    })),
    fallback: false,
  };
};

export default Post;
