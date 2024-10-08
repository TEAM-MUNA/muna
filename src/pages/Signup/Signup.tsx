import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import styles from "./Signup.module.scss";
import ImageUploader from "../../components/common/ImageUploader/ImageUploader";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { signupAsync } from "../../slices/authSlice";
import { emailRegex, passwordRegex } from "../../utils/validations";
import useInput from "../../hooks/useInput";
import { uploadProfileImage } from "../../slices/imageSlice";

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const {
    value: passwordCheck,
    onChange: onPasswordCheckChange,
    error: passwordCheckError,
  } = useInput("", (value) =>
    value === password ? null : "비밀번호가 일치하지 않습니다."
  );

  const { value: nickname, onChange: onNicknameChange } = useInput("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    const hasEmptyInput = Object.values(data).every((value) => value === "");
    const hasErrors = !!emailError || !!passwordError || !!passwordCheckError;

    if (hasEmptyInput) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }
    if (hasErrors) {
      return;
    }

    const loadingToastId = toast.loading("회원가입 중...");

    try {
      await dispatch(
        signupAsync({ email, password, nickname, profileImage })
      ).unwrap();
      toast.success("회원가입에 성공하였습니다.", { id: loadingToastId });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      if (typeof error === "string") {
        if (error.includes("email-already-in-use")) {
          toast.error("이미 가입된 이메일입니다.", { id: loadingToastId });
          return;
        }
        toast.error(error, { id: loadingToastId });
      } else {
        toast.error("회원가입 중 에러가 발생했습니다.", { id: loadingToastId });
      }
    }
  };

  const handleProfileImage = async (imageUrl: string) => {
    try {
      const profileImageUrl = await dispatch(
        uploadProfileImage(imageUrl)
      ).unwrap();

      console.log("업로드된 프로필 이미지 URL:", profileImageUrl);
      setProfileImage(profileImageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className={styles.signup}>
      <Toaster />
      <section>
        <h2 className={styles.title}>회원가입</h2>
        <form className={styles.form} onSubmit={handleSignup}>
          <span className={styles.image_uploader}>
            <ImageUploader onImageChange={handleProfileImage} />
          </span>
          <Input
            name='email'
            value={email}
            onChange={onEmailChange}
            label='이메일'
            error={!!emailError}
            message={emailError || ""}
            placeholder='이메일 주소를 입력해 주세요.'
          />
          <Input
            name='password'
            value={password}
            onChange={onPasswordChange}
            type='password'
            label='비밀번호'
            error={!!passwordError}
            message={passwordError || ""}
            placeholder='비밀번호를 입력해 주세요.'
          />
          <Input
            name='password-check'
            type='password'
            label='비밀번호 확인'
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            error={!!passwordCheckError}
            message={passwordCheckError || ""}
            placeholder='현재 비밀번호를 입력해 주세요.'
          />
          <Input
            name='nickname'
            value={nickname}
            onChange={onNicknameChange}
            label='사용자 닉네임'
            placeholder='닉네임을 입력해 주세요.'
          />
          <Button
            size='xl'
            type='submit'
            color='black'
            fullWidth
            label='회원가입'
            className={styles.button}
            // disabled={hasErrors || !nickname}
          />
        </form>
      </section>
    </article>
  );
}
