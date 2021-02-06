import Link from 'next/link'

export default function Index() {
  return (
    <div className="bg-blue-50 dark:bg-black flex-1">
      <div className="mx-auto prose max-w-2xl dark:prose-dark my-5 px-8 pt-5 pb-2 bg-white shadow-md dark:bg-gray-900 rounded-xl">
        <h1>Intellectual Property: Bad for Students</h1>
        <p>
          Our software helps you host educational content on a custom website. See?
        </p>
        <div className="flex justify-center mt-2 ">
          <Link href="basarat/typescript-book/docs/getting-started.md" passHref>
            <button className="px-3 py-1 bg-blue-500 text-lg text-white rounded-md">
            Learn TypeScript
            </button>
          </Link>
        </div>
        <h2>Complaints</h2>
        <ol>
          <li>Intellectual property has done more harm than good for standardized exams.</li>
          <li>Standardized exams are gatekeepers to elite universities and professions. It is in the public 
interest that preparation materials are high quality and available to all.</li>
          <li>Intellectual property contributes to the pay to win ecosystem surrounding standardized exams and 
the lack of innovative applications in EdTech.</li>
        </ol>
        <h2>Proposed Solution</h2>
        <ol>
          <li>
          Create educational content as Markdown files. Standardized exams as JSON.
          </li>
          <li>
          Distribute under open source licenses. Ideally public domain.
          </li>
          <li>
          Build open source software.
          </li>
        </ol>
      </div>
    </div>
  );
}
