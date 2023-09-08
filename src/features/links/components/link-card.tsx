import type { Link } from "../types";
import { LinkIcon } from "@/features/ui";
import DeleteConfirmationModal from "./delete-confirmation-modal";

interface Props {
  link: Link;
  currentPage: number;
  collectionId: string;
}

export function LinkCard({ link, currentPage, collectionId }: Props) {
  return (
    <div className="relative">
      <a
        href={link.url}
        target="_blank"
        className="border-2 border-black bg-white shadow-[2px_3px] px-2 py-2.5 flex flex-col gap-1"
      >
        <span className="font-semibold">{link.name}</span>
        <div className="inline-flex items-center gap-1 text-gray-600">
          <LinkIcon width={14} height={14} />
          <span className="text-sm">{link.url}</span>
        </div>
      </a>

      <div className="flex items-center gap-1 absolute top-0 right-0 p-3">
        <DeleteConfirmationModal
          linkId={link.id}
          currentPage={currentPage}
          collectionId={collectionId}
        />
      </div>
    </div>
  );
}
