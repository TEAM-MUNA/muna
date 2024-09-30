import React, { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  setIsOpen: (open: boolean) => void
) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
