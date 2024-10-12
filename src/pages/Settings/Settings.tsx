import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import useToggle from "../../hooks/useToggle";
import { logoutAsync } from "../../slices/authSlice";
import useUserRedirect from "../../hooks/useUserRedirect";

import Toggle from "../../components/common/Toggle/Toggle";
import ColumnMenuItem from "../../components/common/ColumnMenuItem/ColumnMenuItem";

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
      await dispatch(logoutAsync()).unwrap(); // unwrap()을 사용해 오류 처리
      toast.success("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      // 에러 메시지는 슬라이스에서 처리
    } finally {
      setIsLoggingOut(false); // 완료 후 플래그 초기화
    }
  };

  return (
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
      <ColumnMenuItem
        label='회원 탈퇴'
        isFaded
        onClick={() => {
          console.log("탈퇴 팝업");
        }}
      />
      <ColumnMenuItem
        label='로그아웃'
        onClick={handleLogout}
        disabled={isLoggingOut} // 로그아웃 진행 중 버튼 비활성화
      />
    </ul>
  );
}
