import { motion } from "framer-motion";
import Card from "./Card";
import BookList from "./BookList";
import {CardType} from './Card'
const cards: CardType[] = [
  {
    title: "openedtech.io",
    content: "Our educational platform, under construction.",
    internal: "User Guide",
    internalLink: "Open-EdTech/next-mdx-books/about.md",
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
const books = [
  {
    title: "King James Bible",
    bookLink: 'Open-EdTech/kjv-markdown/01-Genesis-KJV.md'
  },
  {
    title: "Public Domain Catholic Version Bible",
    bookLink: 'MatthewCaseres/scrape-bibles/Genesis.md'
  },
  {
    title: "Guide to Functional Programming",
    author: "Mostly Adequate",
    authorLink: "https://github.com/MostlyAdequate",
    bookLink: "MatthewCaseres/mostly-adequate-guide/ch01.md",
  },
  {
    title: "TypeScript Deep Dive",
    author: "Basarat Ali Syed",
    authorLink: "https://github.com/basarat",
    bookLink: "basarat/typescript-book/docs/getting-started.md",
  },
  {
    title: "javascript",
    author: "GitbookIo",
    authorLink: "https://github.com/GitbookIO",
    bookLink: "GitbookIO/javascript/basics/README.md",
  },
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
        <BookList books={books} />
        <div>
          These books are hosted using the next-mdx-books package. Books ported from GitBook may have some broken plugins.
        </div>
      </div>
    </div>
  );
}
