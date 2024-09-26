import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { loginAsync } from "../slices/authSlice";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='이메일'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='비밀번호'
      />
      <button type='submit'>로그인</button>
      <button
        type='button'
        onClick={() => {
          console.log(currentUser);
        }}
      >
        유저 정보 가져오기
      </button>
      <button type='button' onClick={() => {}}>
        로그아웃
      </button>
    </form>
  );
}

export default LoginForm;
