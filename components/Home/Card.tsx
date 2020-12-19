import Link from "next/link"
export type CardType = { title: string, content: string, internalLink?: string, internal?: string, external?: string, externalLink?: string}
export default function Card({title, content, internalLink, internal, external, externalLink}: CardType) {
return (
  <div className="dark:bg-gray-800 h-28 md:h-36 rounded-md border dark:border-gray-600 shadow-md bg-white">
    <div className="prose dark:prose-dark p-2">
      <h2 className="">{title}</h2>
      <p style={{ marginTop: -20 }}>{content}</p>
      <div className="flex flex-row justify-evenly -mt-4">

      {internalLink && (
        <Link href={internalLink}>
          <a>
            {internal}
          </a>
        </Link>
      )}
      {externalLink && (
        <a target="_blank" rel="noopener noreferrer" href={externalLink}>
          {external}
        </a>
      )}
      </div>
    </div>
  </div>
);
}