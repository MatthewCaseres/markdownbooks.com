import Image from 'next/image'
type CardType = { title: string, content: string, ghLink?: string, medLink?: string}
export default function Card({title, content, ghLink, medLink}: CardType) {
return (
  <div className="dark:bg-gray-800 h-36 md:h-44 rounded-md border dark:border-gray-600 shadow-md bg-white">
    <div className="prose dark:prose-dark p-2">
      <h2 className="">{title}</h2>
      <p style={{ marginTop: -20 }}>{content}</p>
      {(
        <a className="ml-2" target="_blank" rel="noopener noreferrer" href={ghLink}>
          <Image src="/012-github.png" layout="fixed" width={40} height={40} />
        </a>
      )}
      {medLink && <a
        className="ml-2"
        target="_blank"
        rel="noopener noreferrer"
        href={medLink}
      >
        <Image
          src="/019-medium.png"
          layout="fixed"
          width={40}
          height={40}
        />
      </a>}
    </div>
  </div>
);
}