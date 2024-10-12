import React, { useEffect } from "react";
// import useCurrentUser from "../../hooks/useCurrentUser";
// import useProfile from "../../hooks/useProfile";

import styles from "./Settings.module.scss";

import useInput from "../../hooks/useInput";
import placeholder from "../../utils/constants/placeholder";
import errorMessages from "../../utils/constants/errorMessages";
import { passwordRegex } from "../../utils/validations";

import Title from "../../components/common/Title/Title";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function SettingsPassword() {
  const {
    value: password,
    onChange: onPasswordChange,
    error: passwordError,
  } = useInput("", (value) =>
    passwordRegex.test(value) ? null : errorMessages.invalidPassword
  );

  const {
    value: passwordCheck,
    onChange: onPasswordCheckChange,
    error: passwordCheckError,
  } = useInput("", (value) =>
    value === password ? null : errorMessages.passwordMismatch
  );

  return (
    <div className={styles.container}>
      <Title label='비밀번호 변경' buttonLeft='back' />
      <form action='POST'>
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
            value={password}
            onChange={onPasswordChange}
            type='password'
            label='새 비밀번호'
            error={!!passwordError}
            message={passwordError || ""}
            placeholder={placeholder.newPassword}
          />
          <Input
            name='password-check'
            type='password'
            label='새 비밀번호 확인'
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            error={!!passwordCheckError}
            message={passwordCheckError || ""}
            placeholder={placeholder.newPasswordCheck}
          />
        </div>
        <div className={styles.wrapper_inner}>
          <Button label='변경하기' size='lg' color='black' fullWidth />
        </div>
      </form>
    </div>
  );
}
