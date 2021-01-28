import { GetStaticPaths, GetStaticProps } from "next";
import {
  SideBarProvider,
  StatefulNode,
} from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import { getMdSource, getAllRoutesInfo } from "next-mdx-books";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import {MdxRemote} from "next-mdx-remote/types";
import CustomLink from "../components/CustomLink";
import bookConfig from '../bookConfig.json'
import withSmartHeading from '../remark/withSmartHeading'
import {UrlNode} from 'next-mdx-books'
import SmartHeading from '../components/SmartHeading'
import MCQ from '../components/MCQ'
import withMCQ from '../remark/withMCQ'
import { initializeApollo } from "../lib/apolloClient";
import { ApolloProvider} from "@apollo/client";
import matter from 'gray-matter'
var slug = require("remark-slug");

const components = {
  CustomLink, SmartHeading, MCQ
};

const getProvider = (urlTree: StatefulNode) => ({
  component:(props: any) => <ApolloProvider client={initializeApollo()} >
    <SideBarProvider {...props} config={urlTree.children as StatefulNode[]} />
  </ApolloProvider>,
})
const remote = true;

type PostProps = { urlTree: UrlNode; mdxSource: MdxRemote.Source, ghUrl: string, treePath: ReadonlyArray<number> }
function Post({ urlTree, mdxSource, ghUrl, treePath }: PostProps) {
  const content = hydrate(mdxSource, {components, provider: getProvider(urlTree)});
  return (
      <SideBarProvider treePath={treePath} config={urlTree.children as StatefulNode[]}>
        <SideBar ghUrl={ghUrl} treePath={treePath}>
          <div className="prose max-w-2xl dark:prose-dark my-5 mx-2 px-8 pt-5 pb-2 bg-white shadow-md dark:bg-gray-900 rounded-xl">
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
  const {content} = matter(source)

  const mdxSource = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [
        withSmartHeading,
        slug,
        withMCQ
      ],
    },
    components,
    provider: getProvider(urlTree as UrlNode)
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
