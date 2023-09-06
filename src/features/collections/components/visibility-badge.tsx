import { Visibility } from "../types";

function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  const isPrivate = visibility === "private";

  return (
    <span
      className={`border border-black py-1 px-2 rounded inline-block text-center min-w-[65px] font-medium text-white text-sm ${
        isPrivate ? "bg-red-700" : "bg-green-700"
      }`}
    >
      {visibility}
    </span>
  );
}

export default VisibilityBadge;
