import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(parseValue());

  function parseValue() {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item || String(initialValue) || "");
    } catch (error) {
      return initialValue;
    }
  }

  useEffect(() => {
    const listenStorageEvent = (e: StorageEvent) => {
      e.key === key && setValue(parseValue());
    };
    window.addEventListener("storage", listenStorageEvent);
    return () => window.removeEventListener("storage", listenStorageEvent);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
