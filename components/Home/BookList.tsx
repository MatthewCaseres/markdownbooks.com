import Link from 'next/link'
type BookListType = {books:{title: string, author: string, authorLink: string, bookLink: string}[]}
export default function BookList({books}: BookListType) {
  return (
    <ul>
      {books.map(({ title, author, authorLink, bookLink }) => (
        <li>
          <Link href={bookLink}>
            <a className="dark:text-white text-black">
              {title}
            </a>
          </Link>
          <em className="ml-2">
            by
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={authorLink}
              className="ml-2"
            >
              {author}
            </a>
          </em>
        </li>
      ))}
    </ul>
  );
}