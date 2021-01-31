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
  correct_idxs: number[];
  id: string;
  head_text: string
};
function MCQ({ prompt, answers, solution, correct_idxs, id, head_text }: MCQType) {
  const [graded, setGraded] = useState(false);
  const [selectedIdxs, setSelectedIdx] = useState<number[]>([]);
  const [ session, loading ] = useSession()
  function changeSelection(idx: number) {
    setGraded(false);
    if (correct_idxs.length == 1) {
      setSelectedIdx([idx])
    } else {
      if (selectedIdxs.includes(idx)) {
        setSelectedIdx(selectedIdxs.filter(el => el !== idx))
      } else {
        setSelectedIdx([...selectedIdxs, idx])
      }
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
  const isMatch = selectedIdxs.sort().toString() === correct_idxs.sort().toString()
  function handleCompletion() {
    if(!userInfo?.completed && isMatch){
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
          <Markdown content={`**${head_text}** ` + prompt} />
          {graded &&
            (isMatch ? (
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
              type={correct_idxs.length === 1 ? "radio" : "checkbox"}
              className="form-radio mr-4 bg-gray-300"
              value={index}
              onChange={() => changeSelection(index)}
              checked={selectedIdxs.includes(index)}
            ></input>
            <Markdown content={answer} />
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center py-1">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-1 rounded"
          onClick={() => {
            setGraded(true);
            if (session) {
              handleCompletion()
            }
          }}
        >
          Submit
        </button>
        <button 
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 ml-2 px-4 mt-1 rounded"
        onClick={()=>{setGraded(true), setSelectedIdx(correct_idxs)}}>
          Solution
        </button>
        <div className="flex ml-auto">
        {!!session && (userInfo?.completed ? <Check className="w-7 h-7 text-green-400"/> : <X className="h-7 w-7 text-red-400"/>)}
        {!!session && <Dropdown id={id} />}
        </div>
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
