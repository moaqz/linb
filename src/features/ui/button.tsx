import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export function Button(props: Props) {
  return (
    <button
      className="inline-flex gap-1 px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px_#000] transition-shadow hover:shadow-none"
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </button>
  );
}

