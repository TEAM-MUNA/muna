import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  updateDoc,
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

// Firebase 회원가입 시 프로필 업데이트 API 호출
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

// Firebase 프로필(닉네임, 이미지) 변경시 프로필 업데이트 API 호출
// export const updateProfileToFirebase = async (
//   nickname: string,
//   profileImage: string | null
// ) => {
//   const user = firebaseAuth.currentUser;
//   if (user) {
//     updateProfile(user, {
//       displayName: nickname,
//       photoURL: profileImage,
//     })
//       .then(() => {
//         console.log("프로필 변경 성공");
//       })
//       .catch((error) => {
//         console.error("프로필 변경 실패:", error);
//       });
//   }
// };

// Firebase 비밀번호 변경시 프로필 업데이트 API 호출
// export const updatePasswordToFirebase = async (
//   user: User,
//   nickname: string,
// ) => {
//   await updateProfile(user, {
//     displayName: nickname,
//     photoURL: profileImage,
//   });
// };
