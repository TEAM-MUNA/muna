import { useState } from "react";
// 사용하지 x
const useDropdownSelect = (initialValue: string = "") => {
  const [value, setValue] = useState<string>(initialValue);

  const onSelect = (selectedValue: string) => {
    setValue(selectedValue);
  };

  return { value, onSelect };
};

export default useDropdownSelect;
