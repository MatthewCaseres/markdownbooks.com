import { motion } from "framer-motion";
import Card from "./Card";
import BookList from "./BookList";
import {CardType} from './Card'
const cards: CardType[] = [
  {
    title: "openedtech.io",
    content: "Our educational platform, under construction.",
    // internal: "User Guide",
    // internalLink: "Open-EdTech/next-mdx-books/about.md",
    externalLink: "https://github.com/Open-EdTech/openedtech.dev",
    external: "GitHub",
  },
  {
    title: "mdxbook",
    content: "Data processor for books built on GitHub",
    external: "GitHub",
    externalLink: "https://github.com/Open-EdTech/mdxbook",
    internal: "Documentation",
    internalLink: "Open-EdTech/next-mdx-books/about.md",
  },
  {
    title: "react-run-code",
    content: "Embeddable, runnable, with TypeScript support.",
    externalLink: "https://github.com/Open-EdTech/react-run-code",
    external: "GitHub",
  },
];
const books1 = [
  {
    title: "Secure Computer Systems",
    bookLink: "MatthewCaseres/secure-computer-systems/00-getting-started.md"
  }
]
const books2 = [
  {
    title: "TypeScript Deep Dive",
    author: "Basarat Ali Syed",
    authorLink: "https://github.com/basarat",
    bookLink: "basarat/typescript-book/docs/getting-started.md",
  }
];
const books3 = [
  {
    title: "Amazon S3 Basics",
    author: "Amazon Web Services",
    authorLink: "https://github.com/awsdocs",
    bookLink: "awsdocs/amazon-s3-getting-started-guide/doc_source/GetStartedWithS3.md",
  }
];
export default function Home() {
  return (
    <div>
      <div className="prose dark:prose-dark max-w-none text-center flex-row flex justify-center">
        <h1 style={{ fontSize: 50 }}>Knowledge Unlocked </h1>
        <div className="relative hidden sm:block">
          <motion.div
          style={{top: -180}}
            className="absolute z-20"
            animate={{ y: [0,0,210,180] }}
            transition={{
              ease: ["circIn", "circIn", "easeInOut"],
              duration: 3,
              times: [0, 0.25, 0.5, 0.6],
            }}
          >
            <h1 style={{ fontSize: 70 }}>🔑</h1>
          </motion.div>
          <motion.div
            className="absolute"
            animate={{
              y: [0, 400, 400],
              rotate: [0, 720, 720],
              opacity: [1, 1, 0],
            }}
            transition={{
              ease: "circOut",
              duration: 3,
              times: [0.5, 0.75, 1],
            }}
          >
            <h1 style={{ fontSize: 70 }}>🔒</h1>
          </motion.div>
        </div>
      </div>
      <div>
        <div className="prose dark:prose-dark max-w-md md:max-w-xl xl:max-w-2xl m-auto px-2 text-center">
          <h1>Software</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-md md:max-w-3xl m-auto px-2 my-8">
          {cards.map((card) => (
            <Card {...card} />
          ))}
        </div>
      </div>
      <div className="prose dark:prose-dark max-w-md md:max-w-xl xl:max-w-2xl m-auto px-2">
        <h1 className="text-center">Books</h1>
        The following book has interactive elements for authenticated users.
        <BookList books={books1} />
        We are compatible with existing GitBooks like this book about TypeScript.
        <BookList books={books2} />
        You don't need a GitBook to get started. Here's some documentation from Amazon.
        <BookList books={books3} />
        <hr />
        When you rebuild the site it fetches any changes from the parent repository, a low maintenance way to mirror content.


        We include links to the parent repository via an "Edit this page" button. This parent repository 
        must contain an appropriate open source license.
      </div>
    </div>
  );
}
