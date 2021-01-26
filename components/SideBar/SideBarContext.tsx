import {
  useReducer,
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useMemo,
  useEffect,
} from "react";
import produce, { Draft } from "immer";
import { UrlNode } from "next-mdx-books";
import { useQuery, gql } from "@apollo/client";
import { GetProblemsDocument, GetProblemsQuery } from "../../graphql/generated";
export type UserInfo = { completed: boolean; flagged: number };
export type Filter = { flagged: Set<0 | 1 | 2 | 3>; completed: Set<boolean>; };
export type IdMap = Partial<Record<string, UserInfo>>;
export type StatefulNode = Readonly<Omit<UrlNode, "children" | "treePath">> &
  Readonly<{
    id?: string;
    open?: boolean;
    hidden?: boolean;
    treePath: ReadonlyArray<number>;
    userInfo?: UserInfo;
    children?: ReadonlyArray<StatefulNode>;
  }>;
type StatefulNodes = ReadonlyArray<StatefulNode>;
type Action =
  | { type: "open"; path: readonly number[] }
  | { type: "close"; path: readonly number[] }
  | { type: "filter"; filter: Filter }
  | { type: "merge"; idMap: IdMap } 
  | {type: "expand"} | {type: "collapse"}
type SideBarDispatch = (action: Action) => void;
const SideBarVisibleContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined);
const SideBarStateContext = createContext<StatefulNodes | undefined>(undefined);
const SideBarDispatchContext = createContext<SideBarDispatch | undefined>(
  undefined
);
const FilterContext = createContext<
  [Filter, Dispatch<SetStateAction<Filter>>] | undefined
>(undefined);

const sideBarReducer = produce(
  (draft: Draft<StatefulNodes>, action: Action) => {
    switch (action.type) {
      case "open":
        if (action.path.length) {
          let pathOpen = [...action.path];
          let nodeOpen = draft[pathOpen.shift()!];
          nodeOpen.open = true;
          while (pathOpen.length > 0) {
            nodeOpen = nodeOpen.children![pathOpen.shift()!];
            if (nodeOpen.children) {
              nodeOpen.open = true;
            }
          }
        }
        break;
      case "close":
        let pathClose = [...action.path];
        let nodeClose = draft[pathClose.shift()!];
        while (pathClose.length > 0) {
          nodeClose = nodeClose.children![pathClose.shift()!];
        }
        nodeClose.open = false;
        break;
      case "filter":
        draft.forEach((node) => unhideTree(node));
        draft.forEach((node) =>
          setHiddenRecursive({ node, filter: action.filter })
        );
        break;
      case "merge":
        draft.forEach((node) => MergeIdMap(node, action.idMap));
        break;
      case "expand":
        draft.forEach((node) => expandTree(node));
        break
      case "collapse":
        draft.forEach((node)=>collapseTree(node))
        break
    }
  }
);

const IdMapContext = createContext<IdMap | undefined>(undefined);
const SideBarProvider: React.FC<{ config: StatefulNodes, treePath: readonly number[] }> = ({
  children,
  config,
  treePath
}) => {
  const [state, dispatch] = useReducer(sideBarReducer, config);
  const [visible, setVisible] = useState(true);
  const [idMap, setIdMap] = useState({});
  const [filters, setFilters] = useState<Filter>({
    flagged: new Set(),
    completed: new Set(),
  });
  // const { loading, error, data } = useQuery(GET_PROBLEMS);
  const { loading, error, data } = useQuery(GetProblemsDocument);
  useEffect(() => {
    if (data) {
      const newIdMap = data.problems.reduce<IdMap>((idAccum, problem) => {
        const { completed, flagged, id } = problem;
        return { ...idAccum, ...{ [id]: { completed, flagged } } };
      }, {});
      setIdMap(newIdMap);
      dispatch({ type: "merge", idMap: newIdMap });
    }
  }, [data]);
  useEffect(() => {
      if (!filters.completed.size && !filters.flagged.size && treePath) {
        dispatch({type: "collapse"})
        dispatch({type: "open", path: treePath})
      } else if (filters.completed.size || filters.flagged.size) {
        dispatch({type: "expand"})
      }
      dispatch({ type: "filter", filter: filters });
  }, [filters]);
  return (
    <SideBarStateContext.Provider value={state}>
      <SideBarDispatchContext.Provider value={dispatch}>
        <SideBarVisibleContext.Provider value={[visible, setVisible]}>
          <IdMapContext.Provider value={idMap}>
            <FilterContext.Provider value={[filters, setFilters]}>
              {children}
            </FilterContext.Provider>
          </IdMapContext.Provider>
        </SideBarVisibleContext.Provider>
      </SideBarDispatchContext.Provider>
    </SideBarStateContext.Provider>
  );
};
function useIdMapProperty(id: string) {
  const context = useContext(IdMapContext);
  if (context === undefined) {
    throw new Error("useIdMap must be used within a SidebarProvider");
  }
  const property = context[id];
  return property;
}
function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useIdMap must be used within a SidebarProvider");
  }
  return context;
}
function useSideBarState() {
  const context = useContext(SideBarStateContext);
  if (context === undefined) {
    throw new Error("useSideBarState must be used within a SidebarProvider");
  }
  return context;
}
function useSideBarDispatch() {
  const context = useContext(SideBarDispatchContext);
  if (context === undefined) {
    throw new Error("useSideBarDispatch must be used within a SidebarProvider");
  }
  return context;
}
//
function MergeIdMap(node: Draft<StatefulNode>, idMap: IdMap) {
  if (node.id && node.id in idMap) {
    node.userInfo = idMap[node.id];
  }
  node.children?.forEach((child) => MergeIdMap(child, idMap));
}
function collapseTree(node: Draft<StatefulNode>) {
  node.open = false;
  node.children?.forEach((child) => collapseTree(child));
}
function expandTree(node: Draft<StatefulNode>) {
  node.open = true;
  node.children?.forEach((child) => expandTree(child));
}
function unhideTree(node: Draft<StatefulNode>) {
  node.hidden = false;
  node.children?.forEach((child) => unhideTree(child));
}
function setHiddenRecursive({
  node,
  filter,
}: {
  node: Draft<StatefulNode>;
  filter: Filter;
}) {
  let hasVisibleChild = false
  if (node.children) {
    const childrenHidden: boolean[] = node.children.map((child) =>
      setHiddenRecursive({ node: child, filter })
    );
    hasVisibleChild = childrenHidden.some((hidden) => !hidden);
    const hidden = !hasVisibleChild
    node.hidden = hidden;
    return hidden;
  }
  node.hidden = !isNodeVisible(filter, node.userInfo, node.type, node.id) || hasVisibleChild
  return node.hidden;
}
function isNodeVisible(filter: Filter, userInfo: UserInfo | undefined, type: string, id?: string) {
  const noFilters = (!filter.completed.size) && (!filter.flagged.size)
  const hasId = !!id
  const completedGood = (!filter.completed.size) || ((type.includes('edtech')) &&
    (filter.completed.has(false) && (!userInfo || !userInfo.completed)) ||
    (filter.completed.has(true) && userInfo?.completed))
  const flaggedGood = (!filter.flagged.size) || (
    (!userInfo?.flagged && filter.flagged.has(0)) ||
    (userInfo?.flagged && filter.flagged.has(userInfo.flagged as 1 | 2 | 3))
    )

  //If not completed AND flagged match, hide the node
  return noFilters || (hasId && completedGood && flaggedGood)
}

export {
  SideBarProvider,
  useSideBarState,
  useSideBarDispatch,
  useIdMapProperty,
  useFilters,
};
