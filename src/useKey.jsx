import { useEffect } from "react";

export default function useKey(key, action) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => action(e, key));
    return () => document.removeEventListener("keydown", (e) => action(e, key));
  }, [action, key]);
}
