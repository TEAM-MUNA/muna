import React from "react";
import styles from "./ImageInput.module.scss";
import EditIcon from "../../../assets/svg/EditIcon";
import userDefault from "../../../assets/img/user-default.png";

interface ImageInputProps {
  image?: string;
}

export default function ImageInput({ image = userDefault }: ImageInputProps) {
  return (
    <label htmlFor='userImg' className={`${styles.container}`}>
      <span className='sr_only'>프로필 이미지 설정</span>
      <input
        type='file'
        id='userImg'
        className='sr_only'
        // onChange={onChange}
      />
      <img src={image} alt='프로필 이미지' />
      <span className={styles.btn_edit}>
        <EditIcon />
      </span>
    </label>
  );
}
