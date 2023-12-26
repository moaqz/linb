import Link from "next/link";

import { EllipsisVerticalIcon } from "@/features/ui/icons";
import type { Collection } from "../types";
import VisibilityBadge from "./visibility-badge";

function CollectionsRow(props: Collection) {
  return (
    <tr className="border-b border-black [&>td]:px-6 [&>td]:py-4">
      <td className="whitespace-nowrap font-medium text-gray-900 underline hover:no-underline">
        <Link href={`/collections/${props.id}`}>{props.name}</Link>
      </td>
      <td>{props.created_at?.toLocaleDateString()}</td>
      <td>
        <VisibilityBadge visibility={props.visibility} />
      </td>
      <td>
        <Link
          href={`/collections/${props.id}/settings/general`}
          aria-label={`Settings for ${props.name}`}
          title={`Settings for ${props.name}`}
        >
          <EllipsisVerticalIcon
            width={24}
            height={24}
            className="inline-block"
          />
        </Link>
      </td>
    </tr>
  );
}

export default CollectionsRow;
