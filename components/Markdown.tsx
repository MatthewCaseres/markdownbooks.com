import ReactMarkdown from "react-markdown";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      renderers={{
        paragraph: (props) => <p {...props} style={{ margin: 0 }} />,
      }}
      allowDangerousHtml = {true}
    >
      {content}
    </ReactMarkdown>
  );
}
