import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useUserRedirect from "../../hooks/useUserRedirect";
import { AppDispatch } from "../../app/store";
import { updatePasswordAsync } from "../../slices/authSlice";
import { ReauthenticateFromFirebase } from "../../api/firebase/authAPI";

import styles from "./Settings.module.scss";

import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";
import errorMessages from "../../utils/constants/errorMessages";
import { passwordRegex } from "../../utils/validations";

import Title from "../../components/common/Title/Title";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function SettingsPassword() {
  useUserRedirect();

  const dispatch = useDispatch<AppDispatch>();
  useUserRedirect();
  const navigate = useNavigate();

  const {
    value: password,
    onChange: onPasswordChange,
    error: passwordError,
  } = useInput("", (value) =>
    passwordRegex.test(value) ? null : errorMessages.invalidPassword
  );

  const {
    value: newPassword,
    onChange: onNewPasswordChange,
    error: newPasswordError,
  } = useInput("", (value) =>
    passwordRegex.test(value) ? null : errorMessages.invalidPassword
  );

  const {
    value: newPasswordCheck,
    onChange: onNewPasswordCheckChange,
    error: newPasswordCheckError,
  } = useInput("", (value) =>
    value === newPassword ? null : errorMessages.passwordMismatch
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const hasEmptyInput = Object.values(data).every((value) => value === "");
    const hasErrors =
      !!passwordError || !!newPasswordError || !!newPasswordCheckError;
    if (hasEmptyInput) {
      toast.error(errorMessages.allFieldsRequired);
      return;
    }
    if (hasErrors) {
      return;
    }

    const loadingToastId = toast.loading("비밀번호 변경 중...");

    try {
      const isReauthenticated = await ReauthenticateFromFirebase(password);
      if (isReauthenticated) {
        await dispatch(updatePasswordAsync({ newPassword })).unwrap();

        toast.success("비밀번호가 변경되었습니다.", { id: loadingToastId });
        navigate("/settings");
      }
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error, { id: loadingToastId });
      } else {
        toast.error("비밀번호 변경 중 에러가 발생했습니다.", {
          id: loadingToastId,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <Title label='비밀번호 변경' buttonLeft='back' />
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapper_inner}>
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
          <Input
            name='password'
            value={newPassword}
            onChange={onNewPasswordChange}
            type='password'
            label='새 비밀번호'
            error={!!newPasswordError}
            message={newPasswordError || ""}
            placeholder={placeholder.newPassword}
          />
          <Input
            name='password-check'
            type='password'
            label='새 비밀번호 확인'
            value={newPasswordCheck}
            onChange={onNewPasswordCheckChange}
            error={!!newPasswordCheckError}
            message={newPasswordCheckError || ""}
            placeholder={placeholder.newPasswordCheck}
          />
        </div>
        <div className={styles.wrapper_inner}>
          <Button
            label='변경하기'
            size='xl'
            color='black'
            fullWidth
            type='submit'
          />
        </div>
      </form>
    </div>
  );
}
