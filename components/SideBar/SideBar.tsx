import { useEffect, useState } from "react";
import { useSideBarState, useSideBarDispatch } from "./SideBarContext";
import RenderNode from "./RenderNode";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarTop from "./SideBarTop";
import SideBarFilters from "./SideBarFilters";
import { useSession } from "next-auth/client";

const SideBar: React.FC<{ ghUrl: string, treePath: readonly number[] }> = ({ children, ghUrl, treePath }) => {
  const [session] = useSession()
  const sideBarDispatch = useSideBarDispatch();
  const sideBarState = useSideBarState();
  const [mdVisible, setVisible] = useState<boolean>(true);
  const width = 260;
  useEffect(()=> {
    sideBarDispatch({type: 'open', path: treePath})
  }, [treePath])
  return (
    <div className=" min-h-screen flex justify-center bg-blue-50 dark:bg-black">
      <div className="flex">
      <div
        className={`${mdVisible ? "md:block" : "md:hidden"} ${mdVisible ? "hidden" : "block"
          }`}
      >
        <div
          className="flex h-screen flex-col fixed md:sticky top-0 bg-blue-50 overflow-y-auto z-10 dark:bg-black dark:scrollbar-thumb-gray-700 scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thin dark:scrollbar-track-gray-500 dark:scrollbar-blue-700"
          style={{ width: width, minWidth: width }}
        >
          <SideBarTop setVisible={setVisible} ghUrl={ghUrl} />
          {session && <SideBarFilters />}
          <div className="ml-1">
          {sideBarState.map((node, index) => (
            <RenderNode key={index} node={node} pagePath={treePath} />
          ))}
          </div>
        </div>
      </div>
      <div
        className={`${!mdVisible ? "md:block" : "md:hidden"} ${!mdVisible ? "hidden" : "block"
          }`}
      >
        <div
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-2 cursor-pointer self-start md:sticky md:top-2 md:mt-5 md:ml-2 fixed bottom-3 right-3"
          onClick={() => setVisible(mdVisible => !mdVisible)}
        >
          <MenuIcon className="dark:text-gray-400 text-gray-500" />
        </div>
      </div>
      <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default SideBar;
