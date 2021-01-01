import { useState } from "react";
import { useSideBarState } from "./SideBarContext";
import RenderNode from "./RenderNode";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarTop from "./SideBarTop";

const SideBar: React.FC<{ ghUrl: string }> = ({ children, ghUrl }) => {
  const sideBarState = useSideBarState();
  const [mdVisible, setVisible] = useState<boolean>(true);
  const width = 300;
  return (
    <div className="flex">
      <div
        className={`${mdVisible ? "md:block" : "md:hidden"} ${mdVisible ? "hidden" : "block"
          }`}
      >
        <div
          className="flex h-screen flex-col fixed md:sticky border-r-2 border-gray-500 top-0 overflow-y-auto z-10 dark:bg-black bg-white scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-400"
          style={{ width: width, minWidth: width }}
        >
          <SideBarTop setVisible={setVisible} ghUrl={ghUrl} />
          {sideBarState.map((node, index) => (
            <RenderNode key={`0-${index}`} node={node} path={[index]} />
          ))}
        </div>
      </div>
      <div
        className={`${!mdVisible ? "md:block" : "md:hidden"} ${!mdVisible ? "hidden" : "block"
          }`}
      >
        <div
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-2 cursor-pointer self-start md:sticky md:top-2 md:ml-2 fixed bottom-3 right-3"
          onClick={() => setVisible(mdVisible => !mdVisible)}
        >
          <MenuIcon className="dark:text-gray-400 text-gray-500" />
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SideBar;
