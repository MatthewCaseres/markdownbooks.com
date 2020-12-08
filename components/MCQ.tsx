import React, { useState } from "react";
import Markdown from "./Markdown";

type MCQType = {
  promptText: string;
  solutionText: string;
  answersArray: string[];
  correctIndex: number;
};
function MCQ({
  promptText: prompt,
  answersArray: answers,
  solutionText: solution,
  correctIndex,
}: MCQType) {
  console.log(answers)
  const [graded, setGraded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  function changeSelection(idx: number) {
    if (idx !== selectedIdx) {
      setGraded(false);
      setSelectedIdx(idx);
    }
  }
  return (
    <div>
      <div className="container border-gray-500 border px-4 rounded-lg">
        <div className="py-2 mt-2">
          <Markdown content={prompt} />
          {graded &&
            (selectedIdx === correctIndex ? (
              <div className="bg-green-300 border-2 rounded-xl border-green-400 px-2 py-1 mt-2 ">
                <Markdown content={solution} />
              </div>
            ) : (
              <div className="bg-red-300 border-2 rounded-xl border-red-400 px-2 py-1 mt-2">
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
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 mt-1 rounded"
        onClick={() => setGraded(true)}
      >
        Grade Problem
      </button>
    </div>
  );
}

export default MCQ;
