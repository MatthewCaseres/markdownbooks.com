import React, { useState } from "react";
import { usePopper } from "react-popper";
import useOnclickOutside from "react-cool-onclickoutside";
import {Flag} from "./SVG";
import {useMutation} from '@apollo/client'
import {Filter, useIdMapProperty, UserInfo} from './SideBar/SideBarContext'
import {
  FlagProblemDocument,
  FlagProblemMutation,
  GetProblemsDocument
} from "../graphql/generated";

export default function Dropdown2({id}: {id: string}) {
  const idMapProperties = useIdMapProperty(id)
  const [menuVisible, setMenuVisible] = useState(false);
  const [flagProblem] = useMutation(FlagProblemDocument, {
    update: (cache, {data})=>{
      const existingProblems = cache.readQuery({
        query: GetProblemsDocument
      })
      //If data is returned
      if (data?.flagProblem) {
        //modify or add flagged property
        let inExisting = false
        let newProblems = existingProblems?.problems.map(problem => {
          if (problem.id === id) {
            inExisting = true
            return {...problem, flagged: data.flagProblem!.flagged}
          }
          return problem
        })
        if (!inExisting) {
          newProblems = [...(newProblems || []), data.flagProblem]
        }
        cache.writeQuery({query: GetProblemsDocument,
        data: {
          problems: newProblems!
        }})
      }
    }
  })
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{}], placement: "right"
  });
  const ref = useOnclickOutside(() => {
    setMenuVisible(false);
  });

  return (
    <div ref={ref} onClick={() => setMenuVisible((visible) => !visible)}>
      <div className="flex flex-row items-center">
        <button
          ref={setReferenceElement}
          type="button"
          className=""
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {getFlag(idMapProperties?.flagged)}
        </button>
      </div>
      {menuVisible && (
        <div
          ref={setPopperElement}
          className="bg-white flex dark:bg-black rounded-md border border-gray-500 ml-2"
          style={styles.popper}
          {...attributes.popper}
        >
          <div onClick={() => { 
            flagProblem({variables: {id: id, flag: 0}, optimisticResponse: getOptimisticFlagResponse(
              idMapProperties, 0, id
            )})}}
            className="border-r border-black last:border-0"
            >
            <Flag className="h-6 w-6 text-gray-400 opacity-40" />
          </div>
          <div onClick={() => { 
            flagProblem({variables: {id: id, flag: 1}, optimisticResponse: getOptimisticFlagResponse(
              idMapProperties, 1, id
            )})}}
            className="border-r border-black last:border-0"
            >
            <Flag className="h-6 w-6 text-green-400" />
          </div>
          <div onClick={() => { 
            flagProblem({variables: {id: id, flag: 2}, optimisticResponse: getOptimisticFlagResponse(
              idMapProperties, 2, id
            )})}}
            className="border-r border-black last:border-0">
            <Flag className="h-6 w-6 text-yellow-400" />
          </div>
          <div onClick={() => { 
            flagProblem({variables: {id: id, flag: 3}, optimisticResponse: getOptimisticFlagResponse(
              idMapProperties, 3, id
            )})}}
            className="border-r border-black last:border-0">
            <Flag className="h-6 w-6 text-red-400" />
          </div>
        </div>
      )}
    </div>
  );
}

function getOptimisticFlagResponse(properties: UserInfo | undefined, flag: number, id: string): FlagProblemMutation {
return ({
  __typename: "Mutation",
  flagProblem: {
    __typename: "Problem",
    completed: properties ? properties.completed : false,
    flagged: flag,
    id
  }
})
}

function getFlag(color: number | undefined) {
  if (!color) {
    return <Flag className="h-7 w-7 text-gray-400 opacity-40" />
  } else if (color === 1) {
    return <Flag className="h-7 w-7 text-green-400" />
  } else if  (color === 2){
    return <Flag className="h-7 w-7 text-yellow-400" />
  } else {
    return <Flag className="h-7 w-7 text-red-400" />
  }
}