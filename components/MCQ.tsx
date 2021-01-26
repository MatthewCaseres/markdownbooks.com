import React, { useEffect, useState } from "react";
import Markdown from "./Markdown";
import { useIdMapProperty, UserInfo } from "./SideBar/SideBarContext";
import Dropdown from "./DropDown";
import { useMutation } from "@apollo/client";
import {X, Check} from "./SVG"
import {
  CompleteProblemDocument,
  CompleteProblemMutation,
  GetProblemsDocument,
} from "graphql/generated";
import { useSession } from 'next-auth/client'

type MCQType = {
  prompt: string;
  solution: string;
  answers: string[];
  correct_idx: number;
  id: string;
};
function MCQ({ prompt, answers, solution, correct_idx, id }: MCQType) {
  const [graded, setGraded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [ session, loading ] = useSession()
  function changeSelection(idx: number) {
    if (idx !== selectedIdx) {
      setGraded(false);
      setSelectedIdx(idx);
    }
  }
  const userInfo = useIdMapProperty(id);
  const [completeProblem] = useMutation(CompleteProblemDocument, {
    update: (cache, { data }) => {
      const existingProblems = cache.readQuery({
        query: GetProblemsDocument,
      });
      //If data is returned
      if (data?.completeProblem) {
        //modify or add flagged property
        let inExisting = false;
        let newProblems = existingProblems?.problems.map((problem) => {
          if (problem.id === id) {
            inExisting = true;
            return { ...problem, completed: data.completeProblem!.completed };
          }
          return problem;
        });
        if (!inExisting) {
          newProblems = [...(newProblems || []), data.completeProblem];
        }
        cache.writeQuery({
          query: GetProblemsDocument,
          data: {
            problems: newProblems!,
          },
        });
      }
    },
  });
  function handleCompletion() {
    if(!userInfo?.completed && (selectedIdx === correct_idx)){
      completeProblem({
        variables: { id },
        optimisticResponse: getOptimisticCompletion(
          userInfo,
          userInfo ? userInfo.flagged : 0,
          id
        ),
      });
    }
  }
  return (
    <div id={id}>
      <div className="container border-gray-500 border px-4 rounded-lg">
        <div className="py-2 mt-2">
          <Markdown content={prompt} />
          {graded &&
            (selectedIdx === correct_idx ? (
              <div className="bg-green-300 dark:bg-green-800 border-2 rounded-xl border-green-400 dark:border-green-700 px-2 py-1 mt-2 ">
                <Markdown content={solution} />
              </div>
            ) : (
              <div className="bg-red-300 dark:bg-red-800 border-2 rounded-xl border-red-400 dark:border-red-700 px-2 py-1 mt-2">
                <Markdown content="Incorrect" />
              </div>
            ))}
        </div>
        {answers.map((answer, index) => (
          <div
            key={index}
            className="flex flex-row items-center border-gray-800 border-t py-1"
          >
            {/* text-indigo-600 */}
            <input
              type="radio"
              className="form-radio mr-4 bg-gray-300"
              value={index}
              onChange={() => changeSelection(index)}
              checked={index === selectedIdx}
            ></input>
            <Markdown content={answer} />
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center py-1">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-1 rounded"
          onClick={() => {setGraded(true); handleCompletion()}}
        >
          Grade Problem
        </button>
        {!!session && (userInfo?.completed ? <Check className="w-7 h-7 text-green-400"/> : <X className="h-7 w-7 text-red-400"/>)}
        {!!session && <Dropdown id={id} />}
      </div>
    </div>
  );
}


function getOptimisticCompletion(
  userInfo: UserInfo | undefined,
  flag: number,
  id: string
): CompleteProblemMutation {
  return {
    __typename: "Mutation",
    completeProblem: {
      __typename: "Problem",
      completed: userInfo ? userInfo.completed : false,
      flagged: flag,
      id,
    },
  };
}

export default MCQ;
