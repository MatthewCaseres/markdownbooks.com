import { SideBarProvider } from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import { getMdSource, getAllRoutesInfo } from "github-books";
import renderToString from "next-mdx-remote/render-to-string";
import Link from "next/link";
import hydrate from "next-mdx-remote/hydrate";
import bookConfig from "../bookConfig.json";
import bookPageHeadings from '../bookPageHeadings.json'
import matter from "gray-matter";
import slug from "remark-slug";


const getProvider = (urlTree) => ({
  component: (props) => (
    <SideBarProvider {...props} config={urlTree.children} />
  ),
});

function Post({ urlTree, mdxSource, ghUrl, treePath, prevNext, headings }) {
  const content = hydrate(mdxSource, { provider: getProvider(urlTree) });
  return (
    <SideBarProvider config={urlTree.children}>
      <SideBar ghUrl={ghUrl} treePath={treePath} headings={headings}>
        <div className="my-5 px-8 pt-5 pb-2 bg-white shadow-md dark:bg-gray-900 rounded-xl max-w-2xl">
          <div className="prose dark:prose-dark">{content}</div>
          <Cards prevNext={prevNext} />
        </div>
      </SideBar>
    </SideBarProvider>
  );
}

export const getStaticProps = async ({ params }) => {
  const allRoutesInfo = getAllRoutesInfo(bookConfig);
  const stringRoute = params.id.join("/");
  const flatNode = allRoutesInfo[stringRoute];
  const { index: nodeIndex, ghUrl, treePath, prev, next, route} = flatNode;

  const headings = bookPageHeadings[route]

  const prevNext = { prev: prev ?? null, next: next ?? null };
  const urlTree = bookConfig[nodeIndex];
  const source = await getMdSource(flatNode);
  const { content } = matter(source);
  const mdxSource = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [slug],
    },
    provider: getProvider(urlTree),
  });
  return {
    props: { urlTree, mdxSource, ghUrl, treePath, prevNext, headings }, // will be passed to the page component as props
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


function Cards({ prevNext }) {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 my-5">
      <div className="row-start-2 lg:row-start-1">
        <Card left info={prevNext.prev} />
      </div>
      <div className="row-start-1 lg:row-start-1">
        <Card info={prevNext.next} />
      </div>
    </div>
  );
}

function Card({ left, info }) {
  return (
    !!info && (
      <Link href={info.route}>
        <a>
          <div className="p-4 m-2  border rounded-md flex flex-row items-center shadow-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900">
            {left && (
              <div className=" mr-2">
                <Arrow left />
              </div>
            )}
            <div
              className={`${left ? "text-right ml-auto" : "text-left mr-auto"}`}
            >
              <div className="text-gray-600 dark:text-gray-400 text-sm ">
                {left ? <div >Previous</div> : "Next"}
              </div>
              <div className="text-black dark:text-gray-100">{info.title}</div>
            </div>
            {!left && (
              <div className=" ml-2">
                <Arrow />
              </div>
            )}
          </div>
        </a>
      </Link>
    )
  );
}

function Arrow({ left }) {
  if (left) {
    return (
      <svg
        className="h-5 w-5 dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    );
  } else {
    return (
      <svg
        className="h-5 w-5 dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    );
  }
}


export default Post;
