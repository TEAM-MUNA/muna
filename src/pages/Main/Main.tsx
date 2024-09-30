import React from "react";
import Toggle from "../../components/common/Toggle/Toggle";
// import Input from "../../components/common/Input/Input";
import useToggle from "../../hooks/useToggle";

export default function Main() {
  const { isActive, onToggle } = useToggle();
  return (
    <div>
      <Toggle isActive={isActive} onClick={onToggle} />
    </div>
  );
}
