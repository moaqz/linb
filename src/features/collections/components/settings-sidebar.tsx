"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsSidebar({ collectionId }: { collectionId: string }) {
  const basePath = `/collections/${collectionId}/settings/`;
  const path = usePathname().split("/")[4];

  return (
    <div className="flex flex-col">
      <Link
        href={`${basePath}/general`}
        className={
          path === "general"
            ? "capitalize border-l-2 border-black px-4 py-2 font-semibold"
            : "capitalize border-l-2 border-black/30 text-black/60 px-4 py-2 font-semibold"
        }
      >
        General
      </Link>

      <Link
        href={`${basePath}/delete`}
        className={
          path === "delete"
            ? "capitalize border-l-2 border-black px-4 py-2 font-semibold"
            : "capitalize border-l-2 border-black/30 text-black/60 px-4 py-2 font-semibold"
        }
      >
        Delete
      </Link>
    </div>
  );
}
