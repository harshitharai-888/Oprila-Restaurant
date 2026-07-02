import { useEffect } from "react";

export function useBodyScrollLock(lock: boolean) {
  useEffect(() => {
    console.log("Sidebar open:", lock);

    document.body.style.overflow = lock ? "hidden" : "";
    document.documentElement.style.overflow = lock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [lock]);
}