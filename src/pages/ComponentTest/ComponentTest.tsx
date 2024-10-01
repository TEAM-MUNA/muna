import React from "react";
import useToggle from "../../hooks/useToggle";
import useInput from "../../hooks/useInput";
// import useDropdownSelect from "../../hooks/useDropdownSelect";
import Toggle from "../../components/common/Toggle/Toggle";
import Input from "../../components/common/Input/Input";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import Profile from "../Profile/Profile";
import ColumnMenuItem from "../../components/common/ColumnMenuItem/ColumnMenuItem";

// 컴포넌트 테스트 페이지
export default function ComponentTest() {
  const { isActive, onToggle } = useToggle(true); // Toggle
  const { value, onChange } = useInput("초기값"); // Input

  const { isActive: isSettingToggleActive, onToggle: onSettingToggle } =
    useToggle(false);

  return (
    <div>
      <Toggle
        isActive={isActive}
        onClick={() => {
          onToggle();
          console.log("토글", isActive);
        }}
      />
      <Input
        placeholder='인풋입니다'
        onChange={(e) => {
          onChange(e);
          console.log(e.target.value);
        }}
        value={value}
      />
      {/* <DropdownSelect
        options={["옵션1", "옵션2", "옵션3"]}
        onSelect={(selected) => {
          onDropdownSelect(selected);
          console.log("선택된 값", selected);
        }}
        selectedValue={dropdownSelectedValue}
      /> */}
      <DropdownSelect
        options={["옵션1", "옵션2", "옵션3"]}
        onSelect={(selected) => console.log(selected)}
      />
      <Profile />
      <ul>
        <ColumnMenuItem
          label='프로필 변경'
          buttonRight={
            <Toggle
              isActive={isSettingToggleActive}
              onClick={onSettingToggle}
            />
          }
          onClick={() => {
            console.log("프로필 변경 페이지로 이동?");
          }}
        />
        <ColumnMenuItem label='프로필 변경' />
      </ul>
    </div>
  );
}
