import { useSideBarState, StatefulNode } from "./SideBarContext";
import Node from "./Node";

const RenderNode = ({
  node,
  depth = 0,
  pagePath
}: {
  node: StatefulNode;
  depth?: number;
  pagePath: readonly number[]
}) => {
  return (
    <div className={`${depth === 0 && "ml-1"}`}>
      <Node node={node} pagePath={pagePath}/>
      {node.children && node.open && (
        <div
          style={{
            margin: "2px 0px 2px 12px",
            paddingLeft: 10,
            borderLeft: "1px dashed gray",
          }}
        >
          {node.children.map((nodeChild, index) => {
            return (
              <RenderNode
                key={`${depth + 1}-${index}`}
                node={nodeChild}
                depth={depth + 1}
                pagePath={pagePath}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RenderNode;
