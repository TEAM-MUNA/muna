import { useState } from "react";

const useToggle = (initialState: boolean = false) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  const onToggle = () => {
    setIsActive(!isActive);
  };

  return { isActive, onToggle };
};

export default useToggle;
