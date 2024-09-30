import React from "react";
import ImageInput from "../../components/common/ImageUploader/ImageUploader";
import LikeButton from "../../components/common/Button/LikeButton";

export default function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <ImageInput />
      <LikeButton />
    </div>
  );
}
