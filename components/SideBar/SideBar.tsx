import { useEffect, useState } from "react";
import { useSideBarState, useSideBarDispatch } from "./SideBarContext";
import RenderNode from "./RenderNode";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarTop from "./SideBarTop";
import { HeadersConfig } from "../../bookConfig";
import DoubleChevron from "./DoubleChevron";
import Link from "next/link";

const SideBar: React.FC<{
  ghUrl: string;
  treePath: readonly number[];
  headings: HeadersConfig;
}> = ({ children, ghUrl, treePath, headings }) => {
  const sideBarDispatch = useSideBarDispatch();
  const sideBarState = useSideBarState();
  const [pagesVisible, setPagesVisible] = useState<boolean>(true);
  const [headingsVisible, setHeadingsVisible] = useState<boolean>(true);
  const width = 290;
  useEffect(() => {
    sideBarDispatch({ type: "open", path: treePath });
  }, [treePath]);

  return (
    <div className=" min-h-screen flex justify-center bg-gray-100 dark:bg-black">
      <div className="flex">
        <div
          className={`${pagesVisible ? "lg:block" : "lg:hidden"} ${
            pagesVisible ? "hidden" : "block"
          }`}
        >
          <div
            className="h-screen fixed lg:sticky top-0 bg-gray-100 overflow-y-auto z-10 dark:bg-black dark:scrollbar-thumb-gray-700 scrollbar-thumb-gray-300 scrollbar-track-gray-200 scrollbar-thin dark:scrollbar-track-gray-500 dark:scrollbar-blue-700"
            style={{ width: width, minWidth: width }}
          >
            {/* <SideBarTop setPagesVisible={setPagesVisible} ghUrl={ghUrl} /> */}

            <div className="ml-1 mb-10">
              <Edit ghUrl={ghUrl} />
              {sideBarState.map((node, index) => (
                <RenderNode key={index} node={node} pagePath={treePath} />
              ))}
            </div>
            <div
              className="fixed flex justify-center group bottom-0 z-10 bg-gray-300 group-hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-1 cursor-pointer"
              onClick={() => setPagesVisible((pagesVisible) => !pagesVisible)}
              style={{ width: width, minWidth: width }}
            >
              <DoubleChevron leftRight="left" />
            </div>
          </div>
        </div>
        <div
          className={`${!pagesVisible ? "lg:block" : "lg:hidden"} ${
            !pagesVisible ? "hidden" : "block"
          }`}
        >
          <div
            className="fixed group bottom-3 left-3 bg-gray-300 group-hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-2 cursor-pointer"
            onClick={() => setPagesVisible((pagesVisible) => !pagesVisible)}
          >
            <DoubleChevron leftRight="right" />
          </div>
        </div>
        <div className="flex-1 px-2 mx-2">{children}</div>
        <div
          className={`${headingsVisible ? "md:block" : "md:hidden"} ${
            headingsVisible ? "hidden" : "block"
          }`}
        >
          <div className=" w-48 h-screen fixed md:sticky top-0 right-0 bg-gray-100 overflow-y-auto z-10 dark:bg-black dark:scrollbar-thumb-gray-700 scrollbar-thumb-gray-300 scrollbar-track-gray-200 scrollbar-thin dark:scrollbar-track-gray-500 dark:scrollbar-blue-700">
            <div className=" mx-3 mt-8 mb-10">
              {headings.map((heading) => (
                <div className={heading.depth == 3 ? "ml-3" : ""}>
                  <a
                    href={"#" + heading.slug}
                    className="my-3 block text-xs font-light dark:text-gray-300"
                  >
                    {heading.title}
                  </a>
                </div>
              ))}
            </div>
            <div
              className="fixed w-48 flex justify-center group bottom-0 z-10 bg-gray-300 group-hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-1 cursor-pointer"
              onClick={() =>
                setHeadingsVisible((headingsVisible) => !headingsVisible)
              }
            >
              <DoubleChevron leftRight="right" />
            </div>
          </div>
        </div>
        <div
          className={`${!headingsVisible ? "md:block" : "md:hidden"} ${
            !headingsVisible ? "hidden" : "block"
          }`}
        >
          <div
            className="fixed group bottom-3 right-3 bg-gray-300 group-hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-2 cursor-pointer"
            onClick={() =>
              setHeadingsVisible((headingsVisible) => !headingsVisible)
            }
          >
            <DoubleChevron leftRight="left" />
          </div>
        </div>
      </div>
    </div>
  );
};

function Edit({ ghUrl }: { ghUrl: string }) {
  return (
    <a
      href={ghUrl.replace("/blob/", "/edit/")}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center my-3 text-indigo-400 dark:text-indigo-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        <div className="ml-2 font-light underline">Edit this page</div>
      </div>
    </a>
  );
}

function Close() {
  return (
    <svg
      className="w-5 h-5 text-red-500 opacity-60"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default SideBar;
