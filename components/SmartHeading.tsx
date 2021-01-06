import { useSideBarDispatch, useIdToPath, Tracked } from "./SideBar/SideBarContext";

export default function SmartHeading({ id, slug, contents }: { id: string, slug: string, contents: string }) {
  const sideBarDispatch = useSideBarDispatch();
  const idToPath = useIdToPath();
  return (
    <h2
      id={slug}
      onClick={() => sideBarDispatch({ type: 'track', path: idToPath[id], track: Tracked.Completed })}
    >
      {contents}
    </h2>
  )
}