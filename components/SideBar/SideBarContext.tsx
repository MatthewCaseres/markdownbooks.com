import {
  useReducer,
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import produce, { Draft } from "immer";
import { UrlNode } from "@brainfried/github-books";
export type UserInfo = { completed: boolean; flagged: number };
export type IdMap = Partial<Record<string, UserInfo>>;
export type StatefulNode = Readonly<Omit<UrlNode, "children" | "treePath">> &
  Readonly<{
    id?: string;
    open?: boolean;
    treePath: ReadonlyArray<number>;
    userInfo?: UserInfo;
    children?: ReadonlyArray<StatefulNode>;
  }>;
type StatefulNodes = ReadonlyArray<StatefulNode>;
type Action =
  | { type: "open"; path: readonly number[] }
  | { type: "close"; path: readonly number[] }
  | { type: "expand" }
  | { type: "collapse" };
type SideBarDispatch = (action: Action) => void;
const SideBarVisibleContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined);
const SideBarStateContext = createContext<StatefulNodes | undefined>(undefined);
const SideBarDispatchContext = createContext<SideBarDispatch | undefined>(
  undefined
);

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
    }
  }
);

const SideBarProvider: React.FC<{
  config: StatefulNodes;
  treePath: readonly number[];
}> = ({ children, config, treePath }) => {
  const [state, dispatch] = useReducer(sideBarReducer, config);
  const [visible, setVisible] = useState(true);
  // const { loading, error, data } = useQuery(GET_PROBLEMS);
  return (
    <SideBarStateContext.Provider value={state}>
      <SideBarDispatchContext.Provider value={dispatch}>
        <SideBarVisibleContext.Provider value={[visible, setVisible]}>
          {children}
        </SideBarVisibleContext.Provider>
      </SideBarDispatchContext.Provider>
    </SideBarStateContext.Provider>
  );
};

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

export { SideBarProvider, useSideBarState, useSideBarDispatch };
