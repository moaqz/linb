import { LinkIcon } from "@/features/ui";
import type { Link } from "../types";
import DeleteConfirmationModal from "./delete-confirmation-modal";

export function LinkCard({
  link,
  collectionId,
}: {
  link: Link;
  collectionId: number;
}) {
  return (
    <div className="relative">
      <a
        href={link.url}
        target="_blank"
        className="group flex flex-col gap-1 rounded border-2 border-black bg-white px-2 py-2.5"
        rel="noreferrer"
      >
        <span className="font-semibold group-hover:underline">{link.name}</span>
        <div className="inline-flex items-center gap-1 text-gray-600">
          <LinkIcon width={14} height={14} />
          <span className="line-clamp-1 text-sm">{link.url}</span>
        </div>
      </a>

      <div className="absolute right-0 top-0 flex items-center gap-1 p-3">
        <DeleteConfirmationModal linkId={link.id} collectionId={collectionId} />
      </div>
    </div>
  );
}
