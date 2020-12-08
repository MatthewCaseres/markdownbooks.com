import { configNode, useSideBarDispatch } from "./SideBarContext";
import { useRouter } from "next/router";
import Chevron from "./Chevron";
import Link from "next/link";


function Completion({color}: {color: "gray" | "yellow" | "green"}) {
  return (
    <>
      <div
        className={`bg-${color}-400 opacity-70 hover:opacity-100`}
        style={{
          left: -14,
          top: 8,
          height: 8,
          width: 8,
          borderRadius: "50%",
          position: "absolute",
        }}
      />
      <div
        className={`bg-${color}-300 hover:opacity-40 opacity-0 flex flex-row cursor-pointer`}
        style={{
          left: -17,
          top: 5,
          height: 14,
          width: 14,
          borderRadius: "50%",
          position: "absolute",
        }}
      />
    </>
  );
}

export default function Node({
  node,
  path,
}: {
  node: configNode;
  path: number[];
}) {
  const route = useRouter()
  const dispatch = useSideBarDispatch();
  if (node.children && !node.route) {
    return (
      <div
        className="flex flex-row parent pr-2 items-center text-left select-none cursor-pointer relative"
        onClick={() => {
          node.open
            ? dispatch({ type: "close", path: path })
            : dispatch({ type: "open", path: path });
        }}
      >
        <Completion color="green" />
        <div>
          <Chevron expanded={node.open ?? false} />
        </div>
        {node.title}
        {/* </button> */}
      </div>
    );
  } else if (node.children && node.route) {
    return (
      <div
        className="flex flex-row text-left items-center pr-2 cursor-pointer parent select-none relative"
        style={{
          paddingBottom: 2,
          paddingTop: 2,
        }}
        onClick={() => {
          node.open
            ? dispatch({ type: "close", path: path })
            : dispatch({ type: "open", path: path });
        }}
      >
        <Completion color="gray" />
        <div
          onClick={(e) => {
            e.stopPropagation();
            node.open
              ? dispatch({ type: "close", path: path })
              : dispatch({ type: "open", path: path });
          }}
        >
          <Chevron expanded={node.open ?? false} />
        </div>
        <Link href={node.route}>
          <a
            className="no-underline hover:text-blue-400 hover:underline"
          >
            {node.title}
          </a>
        </Link>
      </div>
    );
  } else if (node.route){
    return (
      <div className="flex flex-row relative">
        <Completion color="gray" />
        <Link href={node.route}>
          <a
            href="#"
            className="no-underline hover:underline hover:text-blue-400"
          >
            {node.title}
          </a>
        </Link>
      </div>
    );
  }
  else {
    return <div>oops</div>
  }
}
