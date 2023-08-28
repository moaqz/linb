interface VisibilityBadgeProps {
  visibility: "private" | "public" | null;
}

function VisibilityBadge(props: VisibilityBadgeProps) {
  const isPrivate = props.visibility === "private";

  return (
    <span
      className={`shadow-[2px_3px_#000] rounded px-2 py-1 font-semibold text-white ${
        isPrivate ? "bg-red-700" : "bg-green-700"
      }`}
    >
      {props.visibility}
    </span>
  );
}

export default VisibilityBadge;
