"use client";

import Image from "next/image";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function LinksErrorState() {
  const isOnline = useOnlineStatus();

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
      {!isOnline ? (
        <>
          <p className="mb-1 mt-4 text-xl font-bold">Lost Connection</p>
          <p className="text-gray-500">
            Whoops... no internet connection found. Check your connection
          </p>
        </>
      ) : (
        <>
          <Image
            src="/message-illustration.svg"
            alt="Message illustration"
            width={250}
            height={250}
          />
          <p className="mb-1 mt-4 text-xl font-bold">Something went wrong</p>
          <p className="mb-1 text-lg font-semibold">
            We{"'"}re having some difficulties. Please try again
          </p>
        </>
      )}
    </div>
  );
}
