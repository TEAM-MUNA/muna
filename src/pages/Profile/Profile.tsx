import React from "react";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import DropdownMenu from "../../components/common/Dropdown/DropdownMenu";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import testImage from "../../assets/img/profileImage.png";
import useDropdownSelect from "../../hooks/useDropdownSelect";

// import AvatarCard from "../../components/common/Avatar/AvatarCard";
// import AvatarProfile from "../../components/common/Avatar/AvatarProfile";

export default function Profile() {
  const dropdownMenuOptions = ["수정", "삭제"];
  const handleDropdownMenu = () => {};

  const dropdownSelectOptions = ["공연전체", "공연중", "공연예정"];
  // const handleDropdownSelect = () => {};

  const { onSelect: onDropdownSelect, value: dropdownSelectedValue } =
    useDropdownSelect(dropdownSelectOptions[0]);

  return (
    <div>
      <h1>Profile</h1>
      <DropdownMenu
        onSelect={handleDropdownMenu}
        options={dropdownMenuOptions}
      />
      <DropdownSelect
        onSelect={onDropdownSelect}
        options={dropdownSelectOptions}
        selectedValue={dropdownSelectedValue}
      />
      <div>
        <ReviewCard thumbnail={testImage} />
        {/* <AvatarCard nickName='nickname' userName='userid' /> */}
        {/* <AvatarProfile /> */}
      </div>
    </div>
  );
}
