import { useSyncExternalStore } from "react";

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
    getServerSnapshot,
  );

  return isOnline;
}
