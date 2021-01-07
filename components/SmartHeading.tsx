import { useSideBarDispatch, useIdToPath, Tracked } from "./SideBar/SideBarContext";

export default function SmartHeading({ id, slug, contents }: { id: string, slug: string, contents: string }) {
  return (
    <h2
      id={slug}
      onClick={() => console.log('lol')}
    >
      {contents}
    </h2>
  )
}