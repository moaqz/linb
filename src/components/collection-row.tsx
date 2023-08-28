import Link from "next/link";
import VisibilityBadge from "./visibility-badge";
import { Collection } from "./collection-list";
import CollectionDropMenu from "./collection-dropdown-menu";

function CollectionRow(props: Collection) {
  return (
    <tr className="border-b-2 border-black font-semibold [&>td]:px-2 [&>td]:py-4">
      <td>
        <Link href={`/collection/${props.id}`}>{props.name}</Link>
      </td>
      <td className="hidden sm:table-cell">
        {props.created_at?.toLocaleDateString("en-US")}
      </td>
      <td>
        <VisibilityBadge visibility={props.visibility} />
      </td>
      <td>
        <CollectionDropMenu />
      </td>
    </tr>
  );
}

export default CollectionRow;
