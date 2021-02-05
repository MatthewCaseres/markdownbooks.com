import { StatefulNode, useSideBarDispatch } from "./SideBarContext";
import Chevron from "./Chevron";
import Link from "next/link";
import { useEffect, useRef } from "react";

function equalPrefix(subPathCandidate: readonly number[], longPath: readonly number[]) {
  if (subPathCandidate.length > longPath.length) {
    return false
  }
  for (let i = 0; i < subPathCandidate.length; i++) {
    if (subPathCandidate[i] !== longPath[i]) {
      return false
    }
  }
  return true
}
function isHighlighted(node: StatefulNode, pagePath: readonly number[]) {
  return equalPrefix(node.treePath, pagePath) && (!node.open || node.treePath.length === pagePath.length)
}

export default function Node2({
  node,
  pagePath
}: {
  node: StatefulNode;
  pagePath: readonly number[]
}) {
  const dispatch = useSideBarDispatch();
  const highlighted = isHighlighted(node, pagePath)
  const myRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if (highlighted) {
      myRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }, [highlighted])
  return (
    <div
      ref={myRef}
      className="flex flex-row text-left items-center pr-2 cursor-pointer parent select-none relative border-t border-gray-400 dark:border-gray-600 border-opacity-50"
      style={{
        paddingBottom: 2,
        paddingTop: 2,
      }}
      onClick={() => {
        dispatch({ type: "open", path: node.treePath });
      }}
    >
      {node.children &&
        <div
          onClick={(e) => {
            e.stopPropagation();
            node.open
              ? dispatch({ type: "close", path: node.treePath })
              : dispatch({ type: "open", path: node.treePath });
          }}
        >
          <Chevron expanded={node.open ?? false} />
        </div>
      }
      <div className={`${!node.children && "ml-2"} ${highlighted && "bg-blue-200 dark:bg-blue-900"} rounded-md px-1`}>
        {node.route ?
          <Link href={node.route} scroll={false}>
            <a className="no-underline hover:text-blue-400 hover:underline dark:text-gray-300">
              {node.title}
            </a>
          </Link> :
          <span className="dark:text-gray-300">{node.title}</span>
        }
      </div>
    </div>
  )
}