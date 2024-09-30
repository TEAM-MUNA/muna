import { useState } from "react";

const useToggle = (initValue: boolean = false) => {
  const [isActive, setIsActive] = useState<boolean>(initValue);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return { isActive, toggle };
};

export default useToggle;
