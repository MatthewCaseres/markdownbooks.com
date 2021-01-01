import {useReducer, createContext, useContext, useState, SetStateAction, Dispatch} from "react";
import produce, {Draft} from 'immer'
import {UrlNode} from "next-mdx-books"

export type StatefulNode = Readonly<Omit<UrlNode, "children" | "treePath">> & Readonly<{
  open?: boolean
  treePath: ReadonlyArray<number>
  completion?: undefined | "yellow" | "green"
  children?: ReadonlyArray<StatefulNode>
}>
type StatefulNodes = ReadonlyArray<StatefulNode>

type Action =
  | { type: "open"; path: readonly number[] }
  | { type: "close"; path: readonly number[] };
type SideBarDispatch = (action: Action) => void;
const SideBarVisibleContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined);
const SideBarStateContext = createContext<StatefulNodes | undefined>(undefined);
const SideBarDispatchContext = createContext<SideBarDispatch | undefined>(
  undefined
);
const sideBarReducer = produce((draft: Draft<StatefulNodes>, action: Action) => {
  switch (action.type) {
    case "open":
      if(action.path.length) {
        let pathOpen = [...action.path];
        let nodeOpen = draft[pathOpen.shift()!];
        nodeOpen.open = true;
        while (pathOpen.length > 0) {
          nodeOpen = nodeOpen.children![pathOpen.shift()!];
          //Don't open leaf on click
          if(nodeOpen.children){
            nodeOpen.open = true;
          }
        }
      }
      break
    case "close":
      let pathClose = [...action.path];
      let nodeClose = draft[pathClose.shift()!];
      while (pathClose.length > 0) {
        nodeClose = nodeClose.children![pathClose.shift()!];
      }
      nodeClose.open = false
      break
  }
});

const SideBarProvider: React.FC<{config: StatefulNodes}> = ({children, config}) => {
  const [state, dispatch] = useReducer(sideBarReducer, config);
  const [visible, setVisible] = useState(true)
  // const [hashRoute, setHashRoute] = useState("")
  return (
    <SideBarStateContext.Provider value={state}>
      <SideBarDispatchContext.Provider value={dispatch}>
        <SideBarVisibleContext.Provider value={[visible, setVisible]}>
          {/* <SideBarHashRouteContext.Provider value={[hashRoute, setHashRoute]}> */}
            {children}
          {/* <SideBarHashRouteContext.Provider> */}
        </SideBarVisibleContext.Provider>
      </SideBarDispatchContext.Provider>
    </SideBarStateContext.Provider>
  );
}
function useSideBarState() {
  const context = useContext(SideBarStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
function useSideBarDispatch() {
  const context = useContext(SideBarDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}
function useSideBarVisible() {
  const context = useContext(SideBarVisibleContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}
export { SideBarProvider, useSideBarState, useSideBarDispatch, useSideBarVisible };
