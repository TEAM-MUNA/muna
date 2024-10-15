import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import useUserRedirect from "../../hooks/useUserRedirect";
// import useProfile from "../../hooks/useProfile";
import errorMessages from "../../utils/constants/errorMessages";
import { AppDispatch } from "../../app/store";
import { updateProfileAsync } from "../../slices/authSlice";
import { uploadProfileImage } from "../../slices/imageSlice";

import styles from "./Settings.module.scss";

// import { errorMessages } from "../../utils/messages";
import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";

import Title from "../../components/common/Title/Title";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
// import { updateProfileToFirebase } from "../../api/firebase/authAPI";

export default function SettingsProfile() {
  useUserRedirect();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useCurrentUser();
  const initialNickname = currentUser?.nickname || "";
  const { value: nickname, onChange: onNicknameChange } =
    useInput(initialNickname);
  const [profileImage, setProfileImage] = useState<string | null>(
    currentUser?.profileImage || null
  );

  const handleProfileImage = async (imageUrl: string) => {
    try {
      console.log("기존 프로필 이미지 URL:", currentUser?.profileImage);
      const profileImageUrl = await dispatch(
        uploadProfileImage(imageUrl)
      ).unwrap();
      console.log("업로드된 프로필 이미지 URL:", profileImageUrl);
      setProfileImage(profileImageUrl);
    } catch (error) {
      console.error(error);
      throw new Error("이미지 업로드 실패");
    }
  };

  const handleChangeProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const hasEmptyInput = Object.values(data).every((value) => value === "");
    if (hasEmptyInput) {
      toast.error(errorMessages.allFieldsRequired);
      return;
    }

    const loadingToastId = toast.loading("프로필 수정 중...");

    try {
      await dispatch(updateProfileAsync({ nickname, profileImage })).unwrap();
      toast.success("프로필 변경이 완료되었습니다.", { id: loadingToastId });
      navigate("/settings");
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error, { id: loadingToastId });
      } else {
        toast.error("프로필 변경 중 에러가 발생했습니다.", {
          id: loadingToastId,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <Title label='프로필 변경' buttonLeft='back' />
      <form onSubmit={handleChangeProfile}>
        <ImageUploader
          image={profileImage}
          onImageChange={handleProfileImage}
        />
        <div className={styles.wrapper_inner}>
          <Input
            name='email'
            value={currentUser?.email || ""}
            label='이메일'
            disabled
          />
          <Input
            name='nickname'
            value={nickname}
            onChange={onNicknameChange}
            label='닉네임'
            placeholder={placeholder.newNickname}
          />
        </div>
        <div className={styles.wrapper_inner}>
          <Button
            type='submit'
            label='변경하기'
            size='lg'
            color='black'
            fullWidth
          />
        </div>
      </form>
    </div>
  );
}
