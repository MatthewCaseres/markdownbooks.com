import { StatefulNode, useSideBarDispatch } from "./SideBarContext";
import Chevron from "./Chevron";
import Link from "next/link";
import { useEffect, useRef } from "react";

function equalPath(subPath: readonly number[], longPath: readonly number[]) {
  if (subPath.length !== longPath.length) {
    return false
  }
  for (let i = 0; i < subPath.length; i++) {
    if (subPath[i] !== longPath[i]) {
      return false
    }
  }
  return true
}
function equalPrefix(subPath: readonly number[], longPath: readonly number[]) {
  if (subPath.length > longPath.length) {
    return false
  }
  for (let i = 0; i < subPath.length; i++) {
    if (subPath[i] !== longPath[i]) {
      return false
    }
  }
  return true
}
function isHighlighted(node: StatefulNode, pagePath: readonly number[]) {
  return equalPrefix(node.treePath, pagePath)
}
function isGrayBG(node: StatefulNode, pagePath: readonly number[]) {
  return equalPath(node.treePath, pagePath)
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
  const grayBG = isGrayBG(node, pagePath)
  const myRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if (highlighted) {
      myRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }, [highlighted])
  return (
    <div
      ref={myRef}
      className={`my-1 flex flex-row text-left items-center cursor-pointer parent select-none relative rounded pl-2 hover:bg-gray-200 dark:hover:bg-gray-800 ${grayBG && "bg-gray-200 dark:bg-gray-800"} `}
      style={{paddingTop: 1, paddingBottom: 1}}
      onClick={(e) => {
        e.stopPropagation();
        node.open
          ? dispatch({ type: "close", path: node.treePath })
          : dispatch({ type: "open", path: node.treePath });
      }}
    >   
        {node.route ?
          <Link href={node.route}>
            <a className={`flex-1 hover:text-indigo-400 hover:underline dark:text-gray-300 text-gray-600 text-lg ${highlighted && "text-indigo-500 dark:text-indigo-500"}`}>
              {node.title}
            </a>
          </Link> :
          <span className={`dark:text-gray-300 text-gray-600 font-semibold ${highlighted && "text-blue-400 dark:text-blue-600"}`}>{node.title}</span>
        }
      {node.children &&
        <div
        className="ml-auto mr-4"
        >
          <Chevron expanded={node.open ?? false} />
        </div>
      }
    </div>
  )
}