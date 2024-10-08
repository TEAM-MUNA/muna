import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { loginAsync } from "../../slices/authSlice";
import logo from "../../assets/img/logo.png";
import styles from "./Login.module.scss";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import useInput from "../../hooks/useInput";
import { emailRegex, passwordRegex } from "../../utils/validations";

export default function Login() {
  const {
    value: email,
    onChange: onEmailChange,
    error: emailError,
  } = useInput("", (value) =>
    emailRegex.test(value) ? null : "유효한 이메일을 입력해 주세요."
  );
  const {
    value: password,
    onChange: onPasswordChange,
    error: passwordError,
  } = useInput("", (value) =>
    passwordRegex.test(value)
      ? null
      : "비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다."
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 인풋 오류가 있을 경우 처리

    // 입력되지 않았을 경우
    if (!email || !password) {
      const errorMessage = !email
        ? "이메일을 입력해주세요."
        : "비밀번호를 입력해주세요.";
      toast.error(errorMessage);
      return;
    }
    const loadingToastId = toast.loading("로그인 중...");

    try {
      await dispatch(loginAsync({ email, password })).unwrap();
      toast.success("로그인에 성공하였습니다.", { id: loadingToastId });
      setTimeout(() => {
        navigate(-1);
      }, 500);
    } catch (error) {
      // TODO: 수정하기
      if (error instanceof FirebaseError) {
        toast.error(error.message, { id: loadingToastId });
      } else {
        toast.error("이메일 또는 비밀번호를 다시 확인해주세요.", {
          id: loadingToastId,
        });
      }
    }
  };

  return (
    <article className={styles.login}>
      <Toaster />
      <header className={styles.header}>
        <h1>
          <img width={107} src={logo} alt='muna 로고' />
        </h1>
        <p className={styles.slogan}>우리들의 문화생활, 무나</p>
      </header>
      <main>
        <section>
          <h2 className='sr_only'>로그인</h2>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={onEmailChange}
              error={!!emailError}
              message={emailError || ""}
              label='이메일'
              placeholder='이메일 주소를 입력해 주세요.'
            />
            <Input
              type='password'
              value={password}
              onChange={onPasswordChange}
              error={!!passwordError}
              message={passwordError || ""}
              label='비밀번호'
              placeholder='비밀번호를 입력해 주세요.'
            />
            <Button
              size='xl'
              type='submit'
              color='primary'
              fullWidth
              label='로그인'
              className={styles.button}
            />
            <Link to='/signup' className={styles.link}>
              이메일로 회원가입
            </Link>
          </form>
        </section>
      </main>
    </article>
  );
}
