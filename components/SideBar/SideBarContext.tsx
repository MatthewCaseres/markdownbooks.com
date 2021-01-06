import {useReducer, createContext, useContext, useState, SetStateAction, Dispatch, useMemo} from "react";
import produce, {Draft} from 'immer'
import {UrlNode} from "next-mdx-books"

export enum Tracked {
  Completed,
  Flagged
}

export type StatefulNode = Readonly<Omit<UrlNode, "children" | "treePath">> & Readonly<{
  id?: string
  open?: boolean
  hidden?: boolean
  treePath: ReadonlyArray<number>
  completion?: ReadonlyArray<Tracked>
  children?: ReadonlyArray<StatefulNode>
}>
type StatefulNodes = ReadonlyArray<StatefulNode>

type Action =
  | { type: "open"; path: readonly number[] }
  | { type: "close"; path: readonly number[] }
  | { type: "track"; path: readonly number[]; track: Tracked}
  | { type: "filter"; filter: Tracked[]}
type SideBarDispatch = (action: Action) => void;
const SideBarVisibleContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined);
const SideBarStateContext = createContext<StatefulNodes | undefined>(undefined);
const SideBarDispatchContext = createContext<SideBarDispatch | undefined>(
  undefined
);
function unHideTree(node: Draft<StatefulNode>) {
  node.hidden = false
  node.children?.forEach(child => unHideTree(child))
}
function setHiddenRecursive({node, filter}: {node: Draft<StatefulNode>, filter: Tracked[]}) {
  if(!filter.length) {
    unHideTree(node)
    //Make TS happy, meaningless return
    return false
  }
  //If there is a property that is being filtered on, show the node, no need to recurse.
  if (node.completion?.some(property => property in filter)) {
    node.hidden = false
    return false
  } else {
    //If there are no children and no matching properties then not visible:
    if (!node.children) {
      node.hidden = true
      return true
    } else {
      const childrenHidden: boolean[] = node.children.map(child => setHiddenRecursive({node: child, filter}))
      const hasVisibleChild = childrenHidden.some(hidden => !hidden)
      const hidden = hasVisibleChild ? false : true
      node.hidden = hidden
      return hidden
    }
  }
}
const sideBarReducer = produce((draft: Draft<StatefulNodes>, action: Action) => {
  switch (action.type) {
    case "open":
      if(action.path.length) {
        let pathOpen = [...action.path];
        let nodeOpen = draft[pathOpen.shift()!];
        nodeOpen.open = true;
        while (pathOpen.length > 0) {
          nodeOpen = nodeOpen.children![pathOpen.shift()!];
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
    case "track": 
      let pathTrack = [...action.path]
      let nodeTrack = draft[pathTrack.shift()!];
      while (pathTrack.length > 0) {
        nodeTrack = nodeTrack.children![pathTrack.shift()!];
      }
      if (nodeTrack.completion && !(action.track in nodeTrack.completion)) {
        nodeTrack.completion.push(action.track)
      } else if (!nodeTrack.completion) {
        nodeTrack.completion = [action.track]
      }
      break
    case "filter":
      draft.forEach(node => unHideTree(node))
      draft.forEach(node => setHiddenRecursive({node, filter: action.filter}))
      break
  }
});
const treeToIdPath = (nodes: StatefulNodes) => {
  const res: Record<string, ReadonlyArray<number>> = {}
  const idDFS = (node: StatefulNode) => {
    if ("id" in node) {
      if (node.id! in res) {
        throw new Error(`Edtech ID ${node.id} is not unique`)
      }
      res[node.id!] = node.treePath
    }
    for (let child of node.children ?? []) {
      idDFS(child)
    }
  }
  nodes.forEach(node => idDFS(node))
  return res
}
const IdToPathContext = createContext<Record<string, ReadonlyArray<number>> | undefined>(undefined)
const SideBarProvider: React.FC<{config: StatefulNodes}> = ({children, config}) => {
  const [state, dispatch] = useReducer(sideBarReducer, config);
  const [visible, setVisible] = useState(true)
  const idToPath = useMemo(() => treeToIdPath(state), [])
  // const [hashRoute, setHashRoute] = useState("")
  return (
    <SideBarStateContext.Provider value={state}>
      <SideBarDispatchContext.Provider value={dispatch}>
        <SideBarVisibleContext.Provider value={[visible, setVisible]}>
          <IdToPathContext.Provider value={idToPath}>
          {/* <SideBarHashRouteContext.Provider value={[hashRoute, setHashRoute]}> */}
            {children}
          {/* <SideBarHashRouteContext.Provider> */}
          </IdToPathContext.Provider>
        </SideBarVisibleContext.Provider>
      </SideBarDispatchContext.Provider>
    </SideBarStateContext.Provider>
  );
}
function useSideBarState() {
  const context = useContext(SideBarStateContext);
  if (context === undefined) {
    throw new Error("useSideBarState must be used within a CountProvider");
  }
  return context;
}
function useIdToPath() {
  const context = useContext(IdToPathContext);
  if (context === undefined) {
    throw new Error("useIdToPath must be used within a CountProvider");
  }
  return context;
}
function useSideBarDispatch() {
  const context = useContext(SideBarDispatchContext);
  if (context === undefined) {
    throw new Error("useSideBarDispatch must be used within a CountProvider");
  }
  return context;
}

export { SideBarProvider, useSideBarState, useSideBarDispatch, useIdToPath };
