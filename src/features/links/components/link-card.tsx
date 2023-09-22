import type { Link } from "../types";
import { LinkIcon } from "@/features/ui";
import DeleteConfirmationModal from "./delete-confirmation-modal";

export function LinkCard({ link, collectionId }: {
  link: Link;
  collectionId: number;
}) {
  return (
    <div className="relative">
      <a
        href={link.url}
        target="_blank"
        className="border-2 border-black bg-white rounded px-2 py-2.5 flex flex-col gap-1 group" rel="noreferrer"
      >
        <span className="font-semibold group-hover:underline">{link.name}</span>
        <div className="inline-flex items-center gap-1 text-gray-600">
          <LinkIcon width={14} height={14} />
          <span className="text-sm line-clamp-1">{link.url}</span>
        </div>
      </a>

      <div className="flex items-center gap-1 absolute top-0 right-0 p-3">
        <DeleteConfirmationModal
          linkId={link.id}
          collectionId={collectionId}
        />
      </div>
    </div>
  );
}
