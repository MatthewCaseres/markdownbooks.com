import Image from "next/image";
import Link from 'next/link'
import Padlock from "./Padlock"

export default function Logo({ scale }: { scale: string }) {
  const scaleCss = `scale(${scale},${scale})`;
  return (
      <div
        className="prose dark:prose-dark font-mono font-bold relative ml-4 mt-3"
        style={{
          msTransform: scaleCss,
          WebkitTransform: scaleCss,
          transform: scaleCss,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 41,
            top: 0,
            zIndex: 1,
            maxHeight: 37,
            overflow: "hidden",
          }}
        >
          <Padlock width={45}
            height={45} />
        </div>
        <div className="relative">
          <Link href="/">
          <h3 style={{ margin: 0, cursor: "pointer" }}>Open</h3>
          </Link>
          <Link href="/">
          <h3 style={{ marginTop: -10, marginLeft: 12 , cursor: "pointer", zIndex: 2, position: "relative"}}>EdTech</h3>
          </Link>
        </div>
      </div>
  );
}
