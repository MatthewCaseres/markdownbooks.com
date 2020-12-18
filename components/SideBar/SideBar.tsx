import { ReactNode, useState  } from "react";
import { useSideBarState } from "./SideBarContext";
import RenderNode from "./RenderNode"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarTop from './SideBarTop'

const SideBar: React.FC<{ghUrl: string}> = ({children, ghUrl}) => {
  const sideBarState = useSideBarState();
  const [visible, setVisible] = useState<boolean | undefined>(undefined)
  const width = 300;
  return (
    <div className="flex">
      {visible ? (
        <div className="">
          <div
            className="flex h-screen flex-col fixed md:sticky border-r-2 border-gray-500 top-0 overflow-y-auto z-10 dark:bg-black bg-white scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-400"
            style={{ width: width, minWidth: width }}
          >
            <SideBarTop setVisible={setVisible} ghUrl={ghUrl} />
            {/* <ArrowBackIcon
              className="dark:text-gray-400 text-gray-700 mb-4 cursor-pointer"
              onClick={() => setVisible(false)}
            /> */}
            {sideBarState.map((node, index) => (
              <RenderNode key={`0-${index}`} node={node} path={[index]} />
            ))}
          </div>
          {/* <div className="md:hidden" style={{ width: width, minWidth: width }} /> */}
        </div>
      ) : (
        <div
          className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800 rounded p-2 cursor-pointer self-start md:sticky md:top-2 md:ml-2 fixed bottom-3 right-3"
          onClick={() => setVisible(true)}
        >
          <MenuIcon className="dark:text-gray-400 text-gray-500" />
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SideBar;
