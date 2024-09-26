import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase";

// Firebase 로그인 API 호출
export const loginToFirebase = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  console.log(response);
  return response.user;
};

// Firebase 로그아웃 API 호출
export const logoutFromFirebase = async () => {
  await signOut(firebaseAuth);
};
