import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useCurrentUser from "../../hooks/useCurrentUser";
import useUserRedirect from "../../hooks/useUserRedirect";
import { AppDispatch, RootState } from "../../app/store";
import { updateProfileAsync, updateUser } from "../../slices/authSlice";
import { uploadProfileImage } from "../../slices/imageSlice";
import { useRequestContext } from "../../context/RequestContext";
import { updateAuthorProfileInReviews } from "../../api/firebase/reviewAPI";

import styles from "./Settings.module.scss";

import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";

import errorMessages from "../../utils/constants/errorMessages";
import Title from "../../components/common/Title/Title";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function SettingsProfile() {
  const { incrementRequestCount } = useRequestContext();
  useUserRedirect();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useCurrentUser();
  const initialNickname = currentUser?.nickname || "";

  const { value: nickname, onChange: onNicknameChange } =
    useInput(initialNickname);
  const [profileImage, setProfileImage] = useState<string | null>(
    currentUser?.profileImage || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // API 요청을 보낼 때마다 요청 수 추적
    incrementRequestCount("SettingsProfile handleSubmit");
    e.preventDefault();

    // 이미지가 업로드 중일 경우에는 제출을 막음
    if (isUploading) {
      toast.error("이미지 업로드 중입니다. 잠시 후에 다시 시도해주세요.");
      return;
    }

    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData.entries());
    // console.log(data);

    // 닉네임이 비어 있을 경우 오류 메시지
    if (!nickname || !user?.userId) {
      toast.error(errorMessages.nicknameRequired);
      return;
    }

    // 로딩 중임을 알리는 토스트
    toast.loading("프로필 변경 중...");

    try {
      // 닉네임과 프로필 이미지 URL로 업데이트 호출
      await dispatch(updateProfileAsync({ nickname, profileImage })).unwrap();
      // 프로필 정보 업데이트 (세션 초기화 없이)
      dispatch(
        updateUser({
          nickname,
          profileImage: profileImage || currentUser?.profileImage || null,
        })
      );

      await updateAuthorProfileInReviews(
        currentUser.reviews,
        user.userId,
        nickname,
        profileImage
      );

      toast.dismiss(); // 이전 로딩 토스트 제거
      toast.success("프로필 변경이 완료되었습니다.");
      navigate("/settings");
    } catch (error) {
      if (typeof error === "string") {
        toast.dismiss();
        toast.error(error);
      } else {
        toast.dismiss();
        const errorMessage =
          (error as { message?: string }).message ||
          "프로필 변경 중 에러가 발생했습니다.";
        toast.error(errorMessage);
      }
    }
  };

  const handleProfileImage = async (imageUrl: string) => {
    setIsUploading(true);
    if (!user?.userId) {
      return;
    }
    try {
      const profileImageUrl = await dispatch(
        uploadProfileImage({ userId: user.userId, imageUrl })
      ).unwrap();
      setProfileImage(profileImageUrl);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("이미지 업로드 중 오류 발생:", error);
    } finally {
      setIsUploading(false); // 업로드 완료 또는 오류 발생 시 업로드 상태 초기화
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
