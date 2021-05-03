import Link from "next/link";
import Image from "next/image";
import Logo from "components/logo/Logo";
import Typewriter from "typewriter-effect";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDarkToggle } from "components/DarkToggle";

type CardProps = {
  resource: string;
  owner: string;
  title: string;
  route: string;
};
const cardsInfo = [
  { resource: "/bible.svg", title: "KJV Bible", owner: "Arley McBlain", route: "arleym/kjv-markdown/01 - Genesis - KJV.md" },
  {
    resource: "/cloud-network.svg",
    title: "AWS Study Guide",
    owner: "Matthew Caseres",
    route: "arleym/kjv-markdown/01 - Genesis - KJV.md"
  },
  {
    resource: "/operating-system.svg",
    title: "Operating Systems",
    owner: "Matt Schlenker",
    route: "arleym/kjv-markdown/01 - Genesis - KJV.md"
  },
  {
    resource: "/snorkling.svg",
    title: "TypeScript Deep Dive",
    owner: "Ali Basarat",
    route: "basarat/typescript-book/docs/getting-started.md"
  },
];
function Card({ resource, owner, title, route }: CardProps) {
  return (
    
      <div className="flex flex-col m-2 border border-gray-300 dark:bg-gray-700 shadow-md dark:border-gray-600 rounded-md">
        <Link href={route}>
        <a className="group hover:bg-indigo-50 dark:hover:bg-indigo-900 flex-1 flex flex-row px-4 py-6">
          <Image src={resource} width="85" height="85" />
            <div className=" m-auto">
              <div className="text-3xl text-gray-900 dark:text-white group-hover:text-indigo-500">{title}</div>
            </div>
        </a>
        </Link>
        <div className="text-sm font-light p-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-md">
          Maintainer - {}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Open-EdTech"
            className="underline text-blue-400 dark:text-blue-600"
          >
            {owner}
          </a>
        </div>
      </div>

  );
}

export default function Index() {
  const isDark = useDarkToggle()![0];
  const blackWhite = isDark ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
  return (
    <div className=" dark:bg-black flex-1">
      <div className="mx-auto lg:max-w-4xl md:max-w-xl max-w-lg   dark:bg-black flex flex-col">
        <div className="self-center my-3 dark:text-white">
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("Collaborative").start();
            }}
          />
        </div>
        <div className="flex dark:text-white font-bold text-5xl sm:text-7xl my-3 self-center">
          <motion.div
            animate={{
              color: [
                blackWhite,
                blackWhite,
                "rgba(99, 102, 241,1)",
                "rgba(99, 102, 241,1)",
                blackWhite,
                blackWhite,
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "circIn",
              times: [0, 0.1, 0.15, 0.75, 0.8, 1],
              repeatType: "reverse",
            }}
          >
            Inter
          </motion.div>
          <motion.div
            animate={{
              color: [
                blackWhite,
                blackWhite,
                "rgba(99, 102, 241,1)",
                "rgba(99, 102, 241,1)",
                blackWhite,
                blackWhite,
              ],
            }}
            transition={{
              repeat: Infinity,
              delay: 3,
              duration: 8,
              ease: "circIn",
              times: [0, 0.1, 0.15, 0.75, 0.8, 1],
              repeatType: "reverse",
            }}
          >
            oper
          </motion.div>
          <motion.div
            animate={{
              color: [
                blackWhite,
                blackWhite,
                "rgba(99, 102, 241,1)",
                "rgba(99, 102, 241,1)",
                blackWhite,
                blackWhite,
              ],
            }}
            transition={{
              repeat: Infinity,
              delay: 6,
              duration: 8,
              ease: "circIn",
              times: [0, 0.1, 0.15, 0.75, 0.8, 1],
              repeatType: "reverse",
            }}
          >
            able
          </motion.div>
        </div>
        <div className="flex font-bold text-5xl sm:text-7xl my-3 self-center dark:text-white">
          <motion.div
            animate={{ x: [null, -10] }}
            transition={{ duration: 1, times: [0, 1] }}
          >
            De
          </motion.div>
          <motion.div
            animate={{ x: [0, -10, -10, 10, 10, 0] }}
            transition={{
              duration: 5,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            central
          </motion.div>
          <motion.div
            animate={{ x: [null, 10] }}
            transition={{ duration: 1, times: [0, 1] }}
          >
            ized
          </motion.div>
        </div>

        <div className="self-center my-6 text-lg font-light dark:text-white">
          A new type of electronic book, built for the web.
        </div>
        <button className="my-5 self-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Source Code
        </button>
        <div className="self-center text-center dark:text-white my-5">
        <div>
          Make books from any public markdown files on GitHub.
        </div>
        <div className="font-extralight">
          You don't even have to make a fork.
        </div>
        </div>
        
        <div className="grid md:grid-cols-2 grid-cols-1 mx-5">
          {cardsInfo.map((props) => (
            <Card {...props} />
          ))}
        </div>
      </div>
    </div>
  );
}
