import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../../app/store";
import useToggle from "../../hooks/useToggle";
import { logoutAsync, withdrawAsync } from "../../slices/authSlice";
import useUserRedirect from "../../hooks/useUserRedirect";
import Modal from "../../components/common/Modal/Modal";
import modalMessages from "../../utils/constants/modalMessages";
import useModal from "../../hooks/useModal";
import useInput from "../../hooks/useInput";
import errorMessages from "../../utils/constants/errorMessages";
import { passwordRegex } from "../../utils/validations";
import placeholder from "../../utils/constants/placeholder";
import { ReauthenticateFromFirebase } from "../../api/firebase/authAPI";

import Button from "../../components/common/Button/Button";
import Toggle from "../../components/common/Toggle/Toggle";
import ColumnMenuItem from "../../components/common/ColumnMenuItem/ColumnMenuItem";
import Input from "../../components/common/Input/Input";

export default function Settings() {
  useUserRedirect();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { isActive: isSettingToggleActive, onToggle: onSettingToggle } =
    useToggle(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // 이미 로그아웃 중이라면 중복 요청 방지

    setIsLoggingOut(true);
    try {
      navigate("/");
      await dispatch(logoutAsync()).unwrap(); // unwrap()을 사용해 오류 처리
      toast.success("로그아웃 되었습니다.");
      // } catch (error) {
      // 에러 메시지는 슬라이스에서 처리
    } finally {
      setIsLoggingOut(false); // 완료 후 플래그 초기화
    }
  };

  // Modal
  const { openModal, closeModal, isOpen } = useModal();

  const {
    value: password,
    onChange: onPasswordChange,
    error: passwordError,
  } = useInput("", (value) =>
    passwordRegex.test(value) ? null : errorMessages.invalidPassword
  );

  const handleWithdraw = async () => {
    try {
      const isReauthenticated = await ReauthenticateFromFirebase(password);
      if (isReauthenticated) {
        navigate("/");
        await dispatch(withdrawAsync()).unwrap();
        closeModal();

        console.log("계정이 성공적으로 삭제되었습니다.");
        toast.success("탈퇴 완료되었습니다.");
      }
    } catch (error) {
      toast.error("비밀번호가 올바르지 않습니다.");
      console.error("탈퇴 중 오류 발생:", error);
    }
  };

  return (
    <>
      <ul>
        <ColumnMenuItem
          label='이메일 알림'
          buttonRight={
            <Toggle
              isActive={isSettingToggleActive}
              onClick={() => {
                onSettingToggle();
              }}
            />
          }
          onClick={() => {
            onSettingToggle();
          }}
        />
        <ColumnMenuItem
          label='프로필 변경'
          onClick={() => {
            navigate("/settings-profile");
          }}
        />
        <ColumnMenuItem
          label='비밀번호 변경'
          onClick={() => {
            navigate("/settings-password");
          }}
        />
        <ColumnMenuItem label='회원 탈퇴' isFaded onClick={openModal} />
        <ColumnMenuItem
          label='로그아웃'
          onClick={handleLogout}
          disabled={isLoggingOut} // 로그아웃 진행 중 버튼 비활성화
        />
      </ul>
      <Modal
        isOpen={isOpen}
        title='회원 탈퇴'
        description={modalMessages.withdraw}
        onClose={closeModal}
        color='warning'
      >
        <Input
          name='password'
          value={password}
          onChange={onPasswordChange}
          type='password'
          label='비밀번호'
          error={!!passwordError}
          message={passwordError || ""}
          placeholder={placeholder.password}
        />
        <Button
          label='탈퇴하기'
          color='underlined'
          size='md'
          fullWidth
          onClick={handleWithdraw}
        />
      </Modal>
    </>
  );
}
