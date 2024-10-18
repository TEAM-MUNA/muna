import React, { useState } from "react";
import toast from "react-hot-toast";
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
import { errorMessages } from "../../utils/constants/errorMessages";
import { placeholder } from "../../utils/constants/placeholder";
import { useRequestContext } from "../../context/RequestContext";

export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { incrementRequestCount } = useRequestContext();

  const {
    value: email,
    onChange: onEmailChange,
    error: emailError,
  } = useInput("", (value) =>
    emailRegex.test(value) ? null : errorMessages.invalidEmail
  );

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

  const { value: nickname, onChange: onNicknameChange } = useInput("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const hasEmptyInput = Object.values(data).every((value) => value === "");
    const hasErrors = !!emailError || !!passwordError || !!passwordCheckError;

    if (hasEmptyInput) {
      toast.error(errorMessages.allFieldsRequired);
      return;
    }
    if (hasErrors) {
      return;
    }

    const loadingToastId = toast.loading("회원가입 중...");

    try {
      incrementRequestCount("Signup handleSignup");
      await dispatch(
        signupAsync({ email, password, nickname, profileImage })
      ).unwrap();
      toast.success("회원가입에 성공하였습니다.", { id: loadingToastId });
      navigate("/");
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
      incrementRequestCount("Signup handleProfileImage");
      const profileImageUrl = await dispatch(
        uploadProfileImage(imageUrl)
      ).unwrap();

      // console.log("업로드된 프로필 이미지 URL:", profileImageUrl);
      setProfileImage(profileImageUrl);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <article className={styles.signup}>
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
            placeholder={placeholder.email}
          />
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
            name='password-check'
            type='password'
            label='비밀번호 확인'
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            error={!!passwordCheckError}
            message={passwordCheckError || ""}
            placeholder={placeholder.passwordCheck}
          />
          <Input
            name='nickname'
            value={nickname}
            onChange={onNicknameChange}
            label='사용자 닉네임'
            placeholder={placeholder.nickname}
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
