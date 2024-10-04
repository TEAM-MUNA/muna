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

export default function Login() {
  const { value: email, onChange: onEmailChange } = useInput("");
  const { value: password, onChange: onPasswordChange } = useInput("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToastId = toast.loading("로그인 중...");

    try {
      await dispatch(loginAsync({ email, password })).unwrap();
      toast.success("로그인에 성공하였습니다.", { id: loadingToastId });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
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
      <div>
        <Toaster />
      </div>
      <header className={styles.header}>
        <h1>
          <img width={107} src={logo} alt='muna 로고' />
        </h1>
        <p className={styles.slogan}>우리들의 문화생활, 무나</p>
      </header>
      <main>
        <section>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={onEmailChange}
              label='이메일'
              placeholder='이메일 주소를 입력해 주세요.'
            />
            <Input
              type='password'
              value={password}
              onChange={onPasswordChange}
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
      {/* <LoginForm /> */}
    </article>
  );
}
