import Link from "next/link";
import { useEffect } from "react";

const CustomLink: React.FC<{href: string}> = ({ children, href }) => {
  useEffect(()=>{
    console.log(href)
  },[])
  // If the link is local it will start with a "/"
  // Otherwise it'll be something like "https://"
  return !href.startsWith("http") || href === "" ? (
    <Link href={href}>
      <a style={{ color: "red" }} onClick={()=>console.log("NO")}>{children}</a>
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "red" }}
    >
      {children}
    </a>
  );
}

export default CustomLink