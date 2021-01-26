import React, { ReactNode, useState } from "react";
import { Filter, useFilters, useSideBarDispatch } from "./SideBarContext";
import { Flag, Check, X, Filter as FilterIcon } from "../SVG";
import produce, { enableMapSet } from "immer";
enableMapSet();

export default function SideBarFilters() {
  const [filters, setFilters] = useFilters();
  return (
    <div className="flex flex-row ml-2 py-1 items-center">
        <div className="flex-row inline-flex items-center my-2 border-gray-400 dark:border-gray-600 border rounded-lg overflow-hidden">
          <ActionWrapper action={{ type: "flagged", payload: 0,  }} {...{filters, setFilters}}>
            <Flag className="h-6 w-6 text-gray-400 opacity-40 z-10" />
          </ActionWrapper>
          <ActionWrapper action={{ type: "flagged", payload: 1,  }} {...{filters, setFilters}}>
            <Flag className="h-6 w-6 text-green-400 z-10" />
          </ActionWrapper>
          <ActionWrapper action={{ type: "flagged", payload: 2 }} {...{filters, setFilters}}>
            <Flag className="h-6 w-6 text-yellow-400 z-10" />
          </ActionWrapper>
          <ActionWrapper action={{ type: "flagged", payload: 3 }} {...{filters, setFilters}}>
            <Flag className="h-6 w-6 text-red-400 z-10" />
          </ActionWrapper>
          </div>
        {false && <div className="flex-row inline-flex items-center my-2 border-gray-400 dark:border-gray-600 border rounded-lg overflow-hidden ml-1">
          <ActionWrapper action={{ type: "completed", payload: false }} {...{filters, setFilters}}>
            <X className="h-6 w-6 text-red-400" />
          </ActionWrapper>
          <ActionWrapper action={{ type: "completed", payload: true }} {...{filters, setFilters}}>
            <Check className="h-6 w-6 text-green-400" />
          </ActionWrapper>
        </div>}
        {!!(filters.flagged.size || filters.completed.size) && (
  <div  className="text-sm ml-2 text-red-500 cursor-pointer"
  onClick={()=>{setFilters({
    flagged: new Set(),
    completed: new Set(),
  })}}>
    <div>clear</div>
    <div>filters</div>
  </div>
  )}
    </div>
  );
}

type ActionWrapperProps = {
  children: ReactNode;
  action:
    | { type: "flagged"; payload: 0 | 1 | 2 | 3}
    | { type: "completed"; payload: boolean }
  filters: Filter,
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
};
function ActionWrapper({ children, action, filters, setFilters }: ActionWrapperProps) {
  const selected =
    (action.type === "flagged" && filters["flagged"].has(action.payload)) ||
    (action.type === "completed" && filters["completed"].has(action.payload)) 
  return (
    <div
      className={`${
        selected ? "bg-blue-200 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-800"
      } cursor-pointer select-none border-r border-black last:border-r-0`}
      style={{ padding: "1px 2px" }}
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
            }
          })
        )
      }
    >
      {children}
    </div>
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
