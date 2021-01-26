import { useSideBarDispatch, useIdMapProperty } from "./SideBar/SideBarContext";
import Dropdown from "./DropDown";
import {
  CompleteProblemDocument,
  GetProblemsDocument,
} from "../graphql/generated";
import { Flag } from "./SVG";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";

type SmartHeadingProps = {
  id: string;
  slug: string;
  contents: string;
  depth: "1" | "2" | "3";
};
export default function SmartHeading({
  id,
  slug,
  contents,
  depth,
}: SmartHeadingProps) {
  return (
    <div
      className="flex flex-row items-center"
      style={{ margin: "48px 0px 24px 0px" }}
    >
      <Heading {...{ depth, slug, contents }} />
      <Dropdown id={id} />
    </div>
  );
}

function Heading({
  depth,
  slug,
  contents,
}: {
  depth: "1" | "2" | "3";
  slug: string;
  contents: string;
}) {
  if (depth === "1") {
    return (
      <h1 style={{ marginBottom: 10 }} id={slug}>
        {contents}
      </h1>
    );
  } else if (depth === "2") {
    return <h2 style={{ margin: 0 }} id={slug}>
      {contents}
    </h2>;
  } else {
    return (
      <h3 style={{ margin: 0 }} id={slug}>
        {contents}
      </h3>
    );
  }
}
