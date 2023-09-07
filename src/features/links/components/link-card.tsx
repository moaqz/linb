import NextLink from "next/link";

import { Link } from "../types";
import { LinkIcon, PencilSquareIcon, TrashIcon } from "@/features/ui";

export function LinkCard(props: Link) {
  return (
    <div className="relative">
      <NextLink
        href={props.url}
        target="_blank"
        className="border-2 border-black bg-white shadow-[2px_3px] px-2 py-2.5 transition-shadow hover:shadow-none flex flex-col gap-1"
      >
        <span className="font-semibold">{props.name}</span>
        <div className="inline-flex items-center gap-1 text-gray-600">
          <LinkIcon width={14} height={14} />
          <span className="text-sm">{props.url}</span>
        </div>
      </NextLink>

      <div className="flex items-center gap-1 absolute top-0 right-0 p-3">
        <button className="text-red-400">
          <TrashIcon width={16} height={16} />
        </button>
        <button className="text-green-600">
          <PencilSquareIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
