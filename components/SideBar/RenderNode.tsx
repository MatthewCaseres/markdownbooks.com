import { StatefulNode } from "./SideBarContext";
import Node from "./Node";

const RenderNode = ({
  node,
  pagePath
}: {
  node: StatefulNode;
  pagePath: readonly number[]
}) => {
  return (
    <div>
      {!node.hidden && <Node node={node} pagePath={pagePath}/>}
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
                key={index}
                node={nodeChild}
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
