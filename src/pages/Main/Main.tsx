import React from "react";
import Toggle from "../../components/common/Toggle/Toggle";
import Input from "../../components/common/Input/Input";
import useToggle from "../../hooks/useToggle";
import useInput from "../../hooks/useInput";

export default function Main() {
  const { isActive, onToggle } = useToggle(true);
  const { onChange, value } = useInput("초기값");
  return (
    <div>
      <Toggle
        isActive={isActive}
        onClick={() => {
          onToggle();
          // 함께 진행되는 다른 작업(함수)
          console.log("토글", isActive);
        }}
      />
      <Input
        placeholder='인풋입니다'
        onChange={(e) => {
          onChange(e);
          // 함께 진행되는 다른 작업(함수)
          console.log(e.target.value);
        }}
        value={value}
      />
    </div>
  );
}
