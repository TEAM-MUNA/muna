import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  deleteUser,
  updateProfile,
  updatePassword,
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
  await signOut(firebaseAuth);
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

// Firebase 비밀번호 변경
export const updatePasswordToFirebase = async (
  user: User,
  newPassword: string
) => {
  await updatePassword(user, newPassword);
};

// Firebase 재인증 - 탈퇴, 비밀번호 변경 시 확인
export const ReauthenticateFromFirebase = async (password: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return true;
  }

  console.error("현재 사용자 정보가 없습니다.");
  return false; // 사용자 정보가 없는 경우 false 반환
};

// Firebase 계정 삭제 (탈퇴)
export const withdrawFromFirebase = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await deleteDoc(userRef);
  await deleteUser(user);
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

// 유저 아이디로 북마크한 콘서트 아이디 배열 가져오기
export const getUserBookmark = async (
  userId: string
): Promise<string[] | undefined> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData.bookmarkedConcerts || [];
    }
  } catch (error) {
    console.error("유저의 북마크 리스트 가져오기 실패:", error);
  }
  return undefined;
};
