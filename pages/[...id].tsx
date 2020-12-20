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
import {UrlNode} from 'next-mdx-books'
var slug = require("remark-slug");

const remote = true;

function Post({ urlTree, mdxSource, ghUrl }: { urlTree: UrlNode; mdxSource: Source, ghUrl: string }) {
  const content = hydrate(mdxSource);
  return (
      <SideBarProvider config={urlTree.children as StatefulNode[]}>
        <SideBar ghUrl={ghUrl}>
          <div className="prose dark:prose-dark max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl m-auto px-2 flex-1 ">
            <div>{content}</div>
          </div>
        </SideBar>
      </SideBarProvider>
  );
}

const components = {
  CustomLink,
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allRoutesInfo = await getAllRoutesInfo(bookConfig);
  const stringRoute = (params!.id as string[]).join("/");
  const nodeIndex = allRoutesInfo[stringRoute].index;
  const ghUrl = allRoutesInfo[stringRoute].ghUrl;
  const urlTree = bookConfig[nodeIndex];
  const source = await getMdSource(stringRoute, allRoutesInfo, remote);
  const mdxSource = await renderToString(source, {
    mdxOptions: {
      remarkPlugins: [
        slug,
      ],
    },
    components,
  });
  return {
    props: { urlTree, mdxSource, stringRoute, ghUrl }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allRoutesInfo = await getAllRoutesInfo(bookConfig);
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
