import React from "react";
import useToggle from "../../hooks/useToggle";
import useInput from "../../hooks/useInput";
import Toggle from "../../components/common/Toggle/Toggle";
import Input from "../../components/common/Input/Input";
import DropdownMenu from "../../components/common/Dropdown/DropdownMenu";

// 컴포넌트 테스트 페이지
export default function ComponentTest() {
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
      <DropdownMenu options={["옵션1", "옵션2"]} onSelect={() => {}} />
    </div>
  );
}
