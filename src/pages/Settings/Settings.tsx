import React from "react";
import ImageInput from "../../components/common/ImageUploader/ImageUploader";
import LikeButton from "../../components/common/Button/LikeButton";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";

export default function Settings() {
  const handleSelect = () => {
    console.log("select test");
  };
  return (
    <div>
      <h1>Settings</h1>
      <ImageInput />
      <LikeButton />
      <DropdownSelect
        options={["option1", "option2"]}
        onSelect={handleSelect}
        outline={false}
      />
    </div>
  );
}
