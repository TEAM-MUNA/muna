import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  deleteUser,
  updateProfile,
  User,
  EmailAuthProvider,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../firebase";

// Firebase 회원가입 API 호출
export const signupToFirebase = async (email: string, password: string) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// Firebase 프로필 업데이트 API 호출 - 회원가입, 프로필변경
export const updateProfileToFirebase = async (
  user: User,
  nickname?: string,
  profileImage?: string | null
) => {
  await updateProfile(user, {
    displayName: nickname,
    photoURL: profileImage,
  });
};

// Firebase 비밀번호 변경
// export const updatePasswordToFirebase = async (user: User) => {
//   updateProfile(user, {
//     // photoURL: profileImage,
//   })
//     .then(() => {
//       console.log("프로필 변경 성공");
//     })
//     .catch((error) => {
//       console.error("프로필 변경 실패:", error);
//     });
// };

// Firebase 회원가입 시 Firestore에 사용자 정보 등록
export const setUserOnDoc = async (
  user: User,
  nickname: string,
  profileImage: string | null
) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    email: user.email,
    nickname,
    profileImage,
  });
};

// 프로필 업데이트 시 Firestore 사용자 정보 업데이트
export const updateUserOnDoc = async (
  user: User,
  nickname: string,
  profileImage: string | null
) => {
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    nickname,
    profileImage,
  });
};

// Firebase 로그인 API 호출
export const loginToFirebase = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return userCredential.user;
};

// Firebase 로그아웃 API 호출
export const logoutFromFirebase = async () => {
  try {
    await signOut(firebaseAuth);
    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

// Firebase 재인증 - 탈퇴, 비밀번호 변경 시 확인
export const ReauthenticateFromFirebase = async (password: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      console.log("재인증 성공");
      return true;
    } catch (error) {
      console.error("재인증 실패:", error);
      return false;
    }
  }

  console.error("현재 사용자 정보가 없습니다.");
  return false; // 사용자 정보가 없는 경우 false 반환
};

// Firebase 계정 삭제 (탈퇴)
export const withdrawFromFirebase = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await deleteDoc(userRef);
  try {
    await deleteUser(user);
    console.log("탈퇴 성공");
  } catch (error) {
    console.error("탈퇴 실패:", error);
  }
};

// Firebase 사용자 불러오는 API
export const getUserFromFirebase = async (
  uid: string
): Promise<DocumentData | undefined> => {
  const result = await getDoc(doc(db, "users", uid));
  return result.data();
};

// 해당 사용자에 북마크한 공연 추가/삭제
export const updateUserBookmark = async (
  userId: string,
  concertId: string,
  cancel: boolean = false
) => {
  const usersDocRef = doc(db, "users", userId);
  const action = cancel ? arrayRemove : arrayUnion;

  await updateDoc(usersDocRef, {
    bookmarkedConcerts: action(concertId),
  });
};
