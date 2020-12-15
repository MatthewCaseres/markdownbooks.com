import { useState  } from "react";
import { useSideBarState } from "./SideBarContext";
import RenderNode from "./RenderNode"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";

const SideBar: React.FC = (props) => {
  const sideBarState = useSideBarState();
  const [visible, setVisible] = useState<boolean | undefined>(undefined)
  const width = 300;
  return (
    <div className="flex">
      {visible ? (
        <div>
          <div
            className="flex fixed overflow-y-auto flex-col border-r border-gray-300  h-screen dark:bg-black scrollbar-thumb-gray-700 scrollbar-thin scrollbar-track-gray-400"
            style={{ width: width, minWidth: width }}
          >
            <ArrowBackIcon
              style={{ color: "red" }}
              onClick={() => setVisible(false)}
            />
            <h1 className=" text-gray-300 mt-4">CONTENTS</h1>
            {sideBarState.map((node, index) => (
              <RenderNode key={`0-${index}`} node={node} path={[index]} />
            ))}
          </div>
          <div style={{ width: width, minWidth: width }} />
        </div>
      ) : (
        <div
          style={{ position: "fixed", top: 5, left: 5 }}
          className="bg-gray-700 rounded p-1 cursor-pointer hover:bg-gray-800"
          onClick={() => setVisible(true)}
        >
          <MenuIcon className="text-gray-400" />
        </div>
      )}
      <div className="flex-1">{props.children}</div>
    </div>
  );
};

export default SideBar;
