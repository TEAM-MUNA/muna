import React, { useState } from "react";
import styles from "./ImageUploader.module.scss";
import EditIcon from "../../../assets/svg/EditIcon";
import userDefault from "../../../assets/img/user-default.png";

interface ImageUploaderProps {
  image?: string;
  onImageChange?: (image: File) => void;
}

export default function ImageUploader({
  image = userDefault,
  onImageChange,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(image);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      if (onImageChange) {
        onImageChange(file);
      }
      reader.onloadend = () => {
        const newPreview = reader.result as string;
        setPreview(newPreview);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  return (
    <label htmlFor='userImageInput' className={`${styles.container}`}>
      <span className='sr_only'>프로필 이미지 설정</span>
      <input
        type='file'
        accept='image/*'
        id='userImageInput'
        className='sr_only'
        onChange={handleFileChange}
        name='profile-image'
      />
      <img src={preview} alt='프로필 이미지' />
      <span className={styles.btn_edit}>
        <EditIcon />
      </span>
    </label>
  );
}
