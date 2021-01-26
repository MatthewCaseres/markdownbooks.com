import { useSideBarDispatch, useIdMapProperty } from "./SideBar/SideBarContext";
import Dropdown from './DropDown'
import {
  CompleteProblemDocument,
  GetProblemsDocument,
} from "../graphql/generated";
import {Flag} from './SVG'
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";

type SmartHeadingProps = {
  id: string;
  slug: string;
  contents: string;
};
export default function SmartHeading({
  id,
  slug,
  contents,
}: SmartHeadingProps) {
  const [completeProblem] = useMutation(CompleteProblemDocument);
  const [session] = useSession()
  return (
    !!session && <div className="flex flex-row items-center" style={{margin: "48px 0px 24px 0px"}}>
      <h2
      style={{margin: 0}}
        id={slug}
        onClick={() => {
          completeProblem({ variables: { id } });
        }}
      >
        {contents}
      </h2>
      <Dropdown id={id}/>
    </div>
  );
}

