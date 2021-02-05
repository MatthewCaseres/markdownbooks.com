import { SideBarProvider } from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import { getMdSource, getAllRoutesInfo } from "next-mdx-books";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import bookConfig from "../bookConfig.json";
import matter from "gray-matter";
import slug from "remark-slug";

const getProvider = (urlTree) => ({
  component: (props) => (
    <SideBarProvider {...props} config={urlTree.children} />
  ),
});
const remote = false;

function Post({ urlTree, mdxSource, ghUrl, treePath }) {
  const content = hydrate(mdxSource, { provider: getProvider(urlTree) });
  return (
    <SideBarProvider treePath={treePath} config={urlTree.children}>
      <SideBar ghUrl={ghUrl} treePath={treePath}>
        <div className="prose max-w-2xl dark:prose-dark my-5 mx-2 px-8 pt-5 pb-2 bg-white shadow-md dark:bg-gray-900 rounded-xl ml-auto">
          <div>{content}</div>
        </div>
      </SideBar>
    </SideBarProvider>
  );
}

export const getStaticProps = async ({ params }) => {
  const allRoutesInfo = getAllRoutesInfo(bookConfig);
  const stringRoute = params.id.join("/");
  const { index: nodeIndex, ghUrl, treePath } = allRoutesInfo[stringRoute];
  const urlTree = bookConfig[nodeIndex];
  const source = await getMdSource(stringRoute, allRoutesInfo, remote);
  const { content } = matter(source);

  const mdxSource = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [slug],
    },
    provider: getProvider(urlTree),
  });
  return {
    props: { urlTree, mdxSource, ghUrl, treePath }, // will be passed to the page component as props
  };
};

export const getStaticPaths = async () => {
  const allRoutesInfo = getAllRoutesInfo(bookConfig);
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
