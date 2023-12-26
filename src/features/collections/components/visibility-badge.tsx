import { Visibility } from "../types";

function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  const isPrivate = visibility === "private";

  return (
    <span
      className={`inline-block min-w-[65px] rounded border border-black px-2 py-1 text-center text-sm font-medium text-white ${
        isPrivate ? "bg-red-700" : "bg-green-700"
      }`}
    >
      {visibility}
    </span>
  );
}

export default VisibilityBadge;
