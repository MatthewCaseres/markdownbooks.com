import Head from 'next/head'
import styles from '../styles/Home.module.css'
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { InferGetStaticPropsType } from 'next';
import rehypeSanitize from 'rehype-sanitize';
import MCQ from "../components/MCQ"
import {withGoodJsx} from "../plugins/withGoodJsx"
import { withMdastLog } from "../plugins/withMdastLog";
import { withCustomCode } from "../plugins/withCustomCode";

const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");
const yaml = require("js-yaml");

const components = {MCQ}

export const getStaticProps = async () => {
  // MDX text - can be from a local file, database, anywhere
  // const source = await fetch(
  //   "https://raw.githubusercontent.com/igorantun/node-chat/master/README.md"
  // );
  const source = `lol 

\`\`\`multiple-choice open-edtech
promptText: "heii"
solutionText: "l"
answersArray:
  - |
    this is
    very loong sstring
  - this is my other thing
correctIndex: 1
\`\`\`

// `;//
  const yamlText = await (await fetch(`https://raw.githubusercontent.com/Open-EdTech/AWS-CSA/main/lol.yml`)).text()
  const json = yaml.safeLoad(yamlText)
  console.log(json)
  const body = await source
  const mdxSource = await renderToString(body, {
    mdxOptions: {
      remarkPlugins: [remarkMath, withCustomCode],
      rehypePlugins: [rehypeKatex, withGoodJsx,]
    }
  });
  return { props: { source: mdxSource } };
};

export default function Home({ source }: InferGetStaticPropsType<typeof getStaticProps>) {
  const content = hydrate(source, {components});
  return (
    <div className="container">
      <div>lol</div>
      {/* <MCQ
        {...{
          promptText: "hei",
          solutionText: "lll",
          answersArray: ["l", "2"],
          correctIndex: 1,
        }}
      /> */}
    </div>
  );
}
