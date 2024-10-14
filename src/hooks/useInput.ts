import React, { useState, useEffect } from "react";

/* eslint-disable default-param-last */
const useInput = (
  initialValue = "",
  validate?: (value: string) => string | null
) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!newValue) {
      setError(null);
    } else if (validate) {
      setError(validate(newValue));
    }
  };
  return { value, onChange, error };
};

export default useInput;
