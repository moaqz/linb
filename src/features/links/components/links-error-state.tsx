"use client";

import Image from "next/image";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function LinksErrorState() {
  const isOnline = useOnlineStatus();

  return (
    <div className="text-center flex flex-col items-center max-w-sm mx-auto">
      {!isOnline
        ? (
          <>
            <p className="text-xl font-bold mb-1 mt-4">Lost Connection</p>
            <p className="text-gray-500">
            Whoops... no internet connection found. Check your connection
            </p>
          </>
        )
        : (
          <>
            <Image
              src="/message-illustration.svg"
              alt="Message illustration"
              width={250}
              height={250}
            />
            <p className="text-xl font-bold mb-1 mt-4">Something went wrong</p>
            <p className="text-lg font-semibold mb-1">
            We{"'"}re having some difficulties. Please try again
            </p>
          </>
        )}
    </div>
  );
}
