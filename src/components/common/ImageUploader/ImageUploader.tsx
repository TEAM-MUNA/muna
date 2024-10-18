import React, { useState, useEffect } from "react";
import styles from "./ImageUploader.module.scss";
import EditIcon from "../../../assets/svg/EditIcon";
import userDefault from "../../../assets/img/user-default.png";

interface ImageUploaderProps {
  image?: string | null;
  onImageChange?: (imageUrl: string) => void;
}

export default function ImageUploader({
  image = userDefault,
  onImageChange,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // image prop이 변경될 때마다 preview를 업데이트
    setPreview(image || userDefault);
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const newPreview = reader.result as string;
        setPreview(newPreview);
        onImageChange?.(newPreview);
      };
      reader.readAsDataURL(file);
      // console.log(file);
    }
  };

  return (
    <label htmlFor='profile-image-input' className={`${styles.container}`}>
      <span className='sr_only'>프로필 이미지 설정</span>
      <input
        type='file'
        accept='image/*'
        id='profile-image-input'
        className='sr_only'
        onChange={handleFileChange}
        name='profile-image'
      />
      {preview && <img src={preview} alt='프로필 이미지' />}
      <span className={styles.btn_edit}>
        <EditIcon />
      </span>
    </label>
  );
}
