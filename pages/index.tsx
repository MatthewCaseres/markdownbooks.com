import Link from "next/link";

export default function Home() {
  return (
    <div>
    <Link href="Open-EdTech/mostly-adequate-guide/ch01.md">
      <a className="dark:text-white text-black">Here is a book</a>
    </Link>
    </div>
  );
}
