import { useEffect, useState } from "react";

const useToggle = (initialState: boolean = false) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    setIsActive(initialState);
  }, [initialState]);

  const onToggle = () => {
    setIsActive(!isActive);
  };

  return { isActive, onToggle };
};

export default useToggle;
