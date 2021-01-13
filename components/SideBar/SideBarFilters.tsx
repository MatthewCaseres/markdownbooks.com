import React, { ReactNode, useState } from "react";
import { usePopper } from "react-popper";
import useOnclickOutside from "react-cool-onclickoutside";
import { Filter, useFilters, useSideBarDispatch } from "./SideBarContext";
import { Flag, Check, X, Filter as FilterIcon } from "../SVG";
import produce, { enableMapSet } from "immer";
import { useMutation } from "@apollo/client";
import { BiExpand, BiCollapse } from "react-icons/bi";
enableMapSet();

export default function SideBarFilters() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="dark:text-gray-200">Flags:</div>
        <ActionWrapper action={{ type: "flagged", payload: 0 }}>
          <Flag className="h-6 w-6 text-gray-400 opacity-40 z-10" />
        </ActionWrapper>
        <ActionWrapper action={{ type: "flagged", payload: 1 }}>
          <Flag className="h-6 w-6 text-yellow-400 z-10" />
        </ActionWrapper>
        <ActionWrapper action={{ type: "flagged", payload: 2 }}>
          <Flag className="h-6 w-6 text-red-400 z-10" />
        </ActionWrapper>
        <div className="ml-1 dark:text-gray-200">Problems: </div>
        <ActionWrapper action={{ type: "completed", payload: false }}>
          <X className="h-6 w-6 text-red-400" />
        </ActionWrapper>
        <ActionWrapper action={{ type: "completed", payload: true }}>
          <Check className="h-6 w-6 text-green-400" />
        </ActionWrapper>
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <div className="dark:text-gray-200">Visible: </div>
        <ActionWrapper action={{ type: "nodeFilter", payload: "heading" }}>
          <div className="dark:text-gray-200">Headings</div>
        </ActionWrapper>
        <ActionWrapper action={{ type: "nodeFilter", payload: "edtech" }}>
          <div className="dark:text-gray-200">Problems</div>
        </ActionWrapper>
      </div>
      <div className="flex flex-row items-center p-1 dark:text-gray-200">
        Expand/Collapse Menu:
        <CollapseWrapper type="expand">
          <BiExpand className="h-6 w-6"/>
        </CollapseWrapper>
        <CollapseWrapper type="collapse">
          <BiCollapse className="h-6 w-6"/>
        </CollapseWrapper>
      </div>
    </div>
  );
}

type ActionWrapperProps = {
  children: ReactNode;
  action:
    | { type: "flagged"; payload: 0 | 1 | 2 }
    | { type: "completed"; payload: boolean }
    | { type: "nodeFilter"; payload: "edtech" | "heading" };
};
function ActionWrapper({ children, action }: ActionWrapperProps) {
  const [filters, setFilters] = useFilters();
  const selected =
    (action.type === "flagged" && filters["flagged"].has(action.payload)) ||
    (action.type === "completed" && filters["completed"].has(action.payload)) ||
    (action.type === "nodeFilter" && filters["nodes"].has(action.payload));
  return (
    <div
      className={`${
        selected
          ? "bg-blue-50 dark:bg-blue-900 border border-gray-700 dark:border-gray-500 rounded-md"
          : ""
      } cursor-pointer select-none`}
      style={{ marginTop: 1, padding: "1px 2px" }}
      onClick={() =>
        setFilters(
          produce(filters, (newFilters) => {
            ///Is there a TypeScript way of not duplicating things here?
            if (action.type === "flagged") {
              if (newFilters.flagged.has(action.payload)) {
                newFilters.flagged.delete(action.payload);
              } else {
                newFilters.flagged.add(action.payload);
              }
            } else if (action.type === "completed") {
              if (newFilters.completed.has(action.payload)) {
                newFilters.completed.delete(action.payload);
              } else {
                newFilters.completed.add(action.payload);
              }
            } else {
              if (newFilters.nodes.has(action.payload)) {
                newFilters.nodes.delete(action.payload);
              } else {
                newFilters.nodes.add(action.payload);
              }
            }
          })
        )
      }
    >
      {children}
    </div>
  );
}

function CollapseWrapper({
  type,
  children,
}: {
  type: "collapse" | "expand";
  children: ReactNode;
}) {
  const dispatch = useSideBarDispatch();
  return (
    <button
      onClick={() => dispatch({ type })}
      className="bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-700 rounded-md border mx-1 border-gray-700 dark:border-gray-500"
    >
      {children}
    </button>
  );
}

function getFlag(color: number | undefined) {
  if (!color) {
    return <Flag className="h-6 w-6 text-gray-400 opacity-40" />;
  } else if (color === 1) {
    return <Flag className="h-6 w-6 text-yellow-400" />;
  } else {
    return <Flag className="h-6 w-6 text-red-400" />;
  }
}

// export default function Dropdown2() {
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [
//     referenceElement,
//     setReferenceElement,
//   ] = useState<HTMLButtonElement | null>(null);
//   const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
//     null
//   );
//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     placement: "auto",
//   });
//   const ref = useOnclickOutside(() => {
//     setMenuVisible(false);
//   });
//   return (
//     <div ref={ref}>
//       <div
//         className="flex flex-row items-center"
//         onClick={() => setMenuVisible((visible) => !visible)}
//       >
//         <button
//           ref={setReferenceElement}
//           type="button"
//           className=""
//           id="options-menu"
//           aria-haspopup="true"
//           aria-expanded="true"
//         >
//           <FilterIcon className="h-6 w-6 text-gray-500" />
//         </button>
//       </div>
//       {menuVisible && (
//         <div
//           ref={setPopperElement}
//           className="bg-white dark:bg-black rounded-md border border-gray-500 z-30 px-1 pb-1 flex flex-col"
//           style={styles.popper}
//           {...attributes.popper}
//         >
//           <div className="flex flex-row items-center">
//             <div>Flags:</div>
//             <ActionWrapper action={{ type: "flagged", payload: 0 }}>
//               <Flag className="h-6 w-6 text-gray-400 opacity-40 z-10" />
//             </ActionWrapper>
//             <ActionWrapper action={{ type: "flagged", payload: 1 }}>
//               <Flag className="h-6 w-6 text-yellow-400 z-10" />
//             </ActionWrapper>
//             <ActionWrapper action={{ type: "flagged", payload: 2 }}>
//               <Flag className="h-6 w-6 text-red-400 z-10" />
//             </ActionWrapper>
//             <div className="ml-1">Problems: </div>
//             <ActionWrapper action={{ type: "completed", payload: false }}>
//               <X className="h-6 w-6 text-red-400" />
//             </ActionWrapper>
//             <ActionWrapper action={{ type: "completed", payload: true }}>
//               <Check className="h-6 w-6 text-green-400" />
//             </ActionWrapper>
//           </div>
//           <div className="flex flex-row space-x-2 items-center">
//             <div>Visible: </div>
//             <ActionWrapper action={{ type: "nodeFilter", payload: "heading" }}>
//               <div>Headings</div>
//             </ActionWrapper>
//             <ActionWrapper action={{ type: "nodeFilter", payload: "edtech" }}>
//               <div>Problems</div>
//             </ActionWrapper>
//           </div>
//           <div className="flex flex-row items-center px-1">
//             Expand/Collapse Menu:
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
