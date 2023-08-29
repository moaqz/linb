"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SETTINGS_LIST = ["general", "delete"];

function SettingsSidebar({ id }: { id: string }) {
  const basePath = `/collections/${id}/settings/`;
  const path = usePathname().split("/")[4];

  return (
    <div className="flex flex-col">
      {SETTINGS_LIST.map((setting, idx) => {
        return (
          <Link
            key={idx}
            href={`${basePath}/${setting}`}
            className={
              setting === path
                ? "capitalize border-l-2 border-black px-4 py-2 font-semibold"
                : "capitalize border-l-2 border-black/30 text-black/60 px-4 py-2 font-semibold"
            }
          >
            {setting}
          </Link>
        );
      })}
    </div>
  );
}

export default SettingsSidebar;
