import { useState, useEffect } from "react";

export default function useStorage(key) {
  const [watched, setWatched] = useState(() =>
    localStorage.getItem(key) !== null
      ? JSON.parse(localStorage.getItem(key))
      : [],
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watched));
  }, [watched, key]);

  return [watched, setWatched];
}
