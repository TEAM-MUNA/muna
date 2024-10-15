import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useCurrentUser from "../../hooks/useCurrentUser";
import useUserRedirect from "../../hooks/useUserRedirect";
import { AppDispatch, RootState } from "../../app/store";
import { updateProfileAsync, setUser } from "../../slices/authSlice";
import { uploadProfileImage } from "../../slices/imageSlice";

import styles from "./Settings.module.scss";

import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";

import errorMessages from "../../utils/constants/errorMessages";
import Title from "../../components/common/Title/Title";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function SettingsProfile() {
  const user = useAppSelector((state: RootState) => state.auth.user);

  useUserRedirect();
  // const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useCurrentUser();
  const initialNickname = currentUser?.nickname || "";
  const { value: nickname, onChange: onNicknameChange } =
    useInput(initialNickname);
  const [profileImage, setProfileImage] = useState<string | null>(
    currentUser?.profileImage || null
  );

  const handleProfileImage = async (imageUrl: string) => {
    const profileImageUrl = await dispatch(
      uploadProfileImage(imageUrl)
    ).unwrap();
    setProfileImage(profileImageUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData.entries());
    const data = {
      image: profileImage,
      nickname,
    };
    console.log(data);

    // 닉네임이 비어 있을 경우 오류 메시지
    if (!nickname) {
      toast.error(errorMessages.nicknameRequired);
      return;
    }

    const loadingToastId = toast.loading("프로필 변경 중...");

    try {
      await dispatch(updateProfileAsync({ nickname, profileImage })).unwrap();
      dispatch(setUser({ nickname, profileImage })); // 상태 업데이트

      toast.success("프로필 변경이 완료되었습니다.", { id: loadingToastId });
      // navigate("/settings");
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
      <form onSubmit={handleSubmit}>
        <ImageUploader
          // image={profileImage}
          image={user?.profileImage}
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
