import { useSideBarState, StatefulNode } from "./SideBarContext";
import Node from "./Node";

const RenderNode = ({
  node,
  depth = 0,
  path,
}: {
  node: StatefulNode;
  depth?: number;
  path: number[];
}) => {
  return (
    <div className={`${depth === 0 && "ml-1"}`}>
      <Node node={node} path={path} />
      {node.children && node.open && (
        <div
          style={{
            margin: "2px 0px 2px 12px",
            paddingLeft: 10,
            borderLeft: "1px dashed gray",
          }}
        >
          {node.children.map((node, index) => {
            const nextPath = [...path, index];
            return (
              <RenderNode
                key={`${depth + 1}-${index}`}
                node={node}
                depth={depth + 1}
                path={nextPath}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RenderNode;
