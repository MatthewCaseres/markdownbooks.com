import Link from "next/link";

export default function Index() {
  return (
    <div className="bg-blue-50 dark:bg-black flex-1">
      <div className="mx-auto prose max-w-2xl dark:prose-dark my-5 px-8 pt-5 pb-2 bg-white shadow-md dark:bg-gray-900 rounded-xl">
        <h1>GitHub Books</h1>
        <p>
          We help you host books from GitHub. Learn more on {` our `} <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Open-EdTech"
            >
              GitHub
            </a>.
          <div className="flex justify-center mt-2 mb-5 ">
            
          </div>
          This website is a customizable template for hosting books with Next.js.
        </p>
        <ul>
          <li>
            <Link href="m4ttsch/omscs-notes-notes/operating-systems/introduction-to-operating-systems.md">
              <a>Operating Systems</a>
            </Link>
            {`, also hosted at `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.omscs-notes.com/"
            >
              omscs-notes.com
            </a>
          </li>
          <li>
            <Link href="arleym/kjv-markdown/01 - Genesis - KJV.md">
              <a>King James Version Bible</a>
            </Link>
            {`, markdown formatting due to `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://arleym.com/"
            >
              Arley McBlain
            </a>
          </li>
          <li>
            <Link href="basarat/typescript-book/docs/getting-started.md">
              <a>TypeScript Deep Dive</a>
            </Link>
            {`, also hosted `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://basarat.gitbook.io/typescript/"
            >
              as a GitBook
            </a>
          </li>
          <li>
            <Link href="MostlyAdequate/mostly-adequate-guide/ch01.md">
              <a>Functional Programming</a>
            </Link>
            {` , also hosted `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mostly-adequate.gitbook.io/mostly-adequate-guide/"
            >
              as a legacy GitBook
            </a>
          </li>
        </ul>
        <p>Here is the perspective that motivates our work -</p>

        <h1>Get Intellectual Property out of Education</h1>
        <h2>Complaints</h2>
        <ol>
          <li>
            Standardized exams determine educational and professional outcomes.
          </li>
          <li>
            Standardized exam materials that are not in the public domain
            prevent developers from providing low cost solutions to students.
          </li>
          <li>
            Public domain study manuals and practice exams are sure to increase
            access, lower costs, and increase quality.
          </li>
        </ol>
        <h2>Proposed Solution</h2>
        <ol>
          <li>
            Create study manuals as Markdown files. Standardized exams as
            JSON.
          </li>
          <li>Distribute materials under the public domain.</li>
          <li>Let developers figure the rest out.</li>
        </ol>
      </div>
    </div>
  );
}
