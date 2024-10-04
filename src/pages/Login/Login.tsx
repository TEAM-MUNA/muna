import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import styles from "./Login.module.scss";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function Login() {
  return (
    <article className={styles.login}>
      <header className={styles.header}>
        <h1>
          <img width={107} src={logo} alt='muna 로고' />
        </h1>
        <p className={styles.slogan}>우리들의 문화생활, 무나</p>
      </header>
      <main>
        <section>
          <form className={styles.form}>
            <Input label='이메일' placeholder='이메일 주소를 입력해 주세요.' />
            <Input label='비밀번호' placeholder='비밀번호를 입력해 주세요.' />
            <Button
              size='xl'
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
