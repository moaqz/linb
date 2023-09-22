import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export function Button(props: Props) {
  return (
    <button
      className={
        "inline-flex items-center gap-1 border-2 bg-yellow-300 px-3 py-1.5 text-base border-black rounded shadow-neo text-black font-medium transition-shadow enabled:hover:shadow-none disabled:shadow-none"
      }
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </button>
  );
}
