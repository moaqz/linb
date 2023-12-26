import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  color?: "primary" | "secondary";
}

export function Button(props: Props) {
  const { color = "primary" } = props;

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 border-2 ${
        color === "primary" ? "bg-yellow-300" : "bg-white"
      } rounded border-black px-3 py-1.5 text-base font-medium text-black shadow-neo transition-shadow enabled:hover:shadow-none disabled:shadow-none`}
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </button>
  );
}
