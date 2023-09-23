import { useSyncExternalStore } from "react";

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function subscribe(callback: any) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return isOnline;
}
