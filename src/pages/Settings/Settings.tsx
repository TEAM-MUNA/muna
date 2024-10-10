import React from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/common/Toggle/Toggle";
import ColumnMenuItem from "../../components/common/ColumnMenuItem/ColumnMenuItem";
import useToggle from "../../hooks/useToggle";

export default function Settings() {
  const navigate = useNavigate();

  const { isActive: isSettingToggleActive, onToggle: onSettingToggle } =
    useToggle(false);

  return (
    <ul>
      <ColumnMenuItem
        label='이메일 알림'
        buttonRight={<Toggle isActive={isSettingToggleActive} />}
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
        onClick={() => {
          console.log("로그아웃");
        }}
      />
    </ul>
  );
}
