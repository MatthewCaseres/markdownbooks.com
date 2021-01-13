import { StatefulNode, useSideBarDispatch } from "./SideBarContext";
import Chevron from "./Chevron";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {Flag, X, Check} from '../SVG'

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
      className="flex flex-row text-left items-center pr-2 cursor-pointer parent select-none relative"
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
      {node.type.includes("edtech") && getProblemCompletion(node.userInfo?.completed)}
      {getFlag(node.userInfo?.flagged)}
    </div>
  )
}
function getFlag(color: number | undefined) {
  if (!color) {
    return false
  } else if (color === 1) {
    return <Flag className="h-5 w-5 text-yellow-400" />
  } else {
    return <Flag className="h-5 w-5 text-red-400" />
  }
}
function getProblemCompletion(completed: boolean | undefined) {
  if (!completed) {
    return <X className = "h-5 w-5 text-red-400"/>
  } else {
    return <Check className = "h-5 w-5 text-green-400"/>
  }
}

// function Node({
//   node,
//   path,
// }: {
//   node: StatefulNode;
//   path: readonly number[];
// }) {
//   const dispatch = useSideBarDispatch();
//   if (node.children && !node.route) {
//     return (
//       <div
//         className="flex flex-row parent pr-2 items-center text-left select-none cursor-pointer relative"
//         onClick={() => {
//           node.open
//             ? dispatch({ type: "close", path: path })
//             : dispatch({ type: "open", path: path });
//         }}
//       >
//         <div>
//           <Chevron expanded={node.open ?? false} />
//         </div>
//         <span className="dark:text-gray-300">{node.title}</span>
//       </div>
//     );
//   } else if (node.children && node.route) {
//     return (
//       <div
//         className="flex flex-row text-left items-center pr-2 cursor-pointer parent select-none relative"
//         style={{
//           paddingBottom: 2,
//           paddingTop: 2,
//         }}
//         onClick={() => {
//           dispatch({ type: "open", path: path });
//         }}
//       >
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//             node.open
//               ? dispatch({ type: "close", path: path })
//               : dispatch({ type: "open", path: path });
//           }}
//         >
//           <Chevron expanded={node.open ?? false} />
//         </div>
//         <Link href={node.route} scroll={false}>
//           <a className="no-underline hover:text-blue-400 hover:underline dark:text-gray-300">
//             {node.title}
//           </a>
//         </Link>
//       </div>
//     );
//   } else if (node.route) {
//     return (
//       <div className="flex flex-row relative">
//         <Link href={node.route} passHref>
//           <a
//             className="no-underline pl-3 hover:underline hover:text-blue-400 dark:text-gray-300"
//           >
//             {node.title}
//           </a>
//         </Link>
//       </div>
//     );
//   }
//   else {
//     return <div>oops</div>
//   }
// }
