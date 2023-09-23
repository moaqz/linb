import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  color?: "primary" | "secondary";
}

export function Button(props: Props) {
  const { color = "primary" } = props;

  return (
    <button
      className={`inline-flex items-center gap-1 border-2 ${
        color === "primary" ? "bg-yellow-300" : "bg-white"
      } px-3 py-1.5 text-base border-black rounded shadow-neo text-black font-medium transition-shadow enabled:hover:shadow-none disabled:shadow-none`}
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </button>
  );
}
