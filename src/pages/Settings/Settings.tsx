import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import useToggle from "../../hooks/useToggle";
import { logoutAsync } from "../../slices/authSlice";

import Toggle from "../../components/common/Toggle/Toggle";
import ColumnMenuItem from "../../components/common/ColumnMenuItem/ColumnMenuItem";

export default function Settings() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { isActive: isSettingToggleActive, onToggle: onSettingToggle } =
    useToggle(false);

  const handleLogout = () => {
    dispatch(logoutAsync());
    toast.success("로그아웃 되었습니다.");
    navigate("/");
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
      <ColumnMenuItem label='로그아웃' onClick={handleLogout} />
    </ul>
  );
}
