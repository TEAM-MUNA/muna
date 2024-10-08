import React from "react";
import { Toaster } from "react-hot-toast";
import styles from "./Signup.module.scss";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

export default function Signup() {
  return (
    <article className={styles.signup}>
      <Toaster />
      <section>
        <h2 className={styles.title}>회원가입</h2>
        <form className={styles.form} onSubmit={() => {}}>
          <span className={styles.image_uploader}>
            <ImageUploader />
          </span>
          <Input label='이메일' placeholder='이메일 주소를 입력해 주세요.' />
          <Input
            type='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요.'
          />
          <Input
            type='password'
            label='비밀번호 확인'
            placeholder='현재 비밀번호를 입력해 주세요.'
          />
          <Input label='사용자 닉네임' placeholder='닉네임을 입력해 주세요.' />
          <Button
            size='xl'
            type='submit'
            color='black'
            fullWidth
            label='회원가입'
            className={styles.button}
          />
        </form>
      </section>
    </article>
  );
}
