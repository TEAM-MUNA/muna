import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

// Firebase 공연 정보 하나 불러오는 API
export const getConcertFromFirebase = async (
  concertId: string
): Promise<DocumentData | undefined> => {
  const docRef = doc(db, "concerts", concertId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : undefined;
};
/*
처음에는 함수명에 Firebase 명칭 붙여서 구분하기 쉽게 하려고 했지만, 
지금 보니 함수명이 너무 길어지는 것 같아서 앞으로는 명칭 빼고 작성하겠습니다.
추후에 수정할 것을 고려해보겠습니다.
*/

// 해당 공연에 북마크를 추가한 사용자 추가/삭제
export const updateConcertBookmark = async (
  userId: string,
  concertId: string,
  cancel: boolean = false
) => {
  const concertsDocRef = doc(db, "concerts", concertId);
  const action = cancel ? arrayRemove : arrayUnion;

  await updateDoc(concertsDocRef, {
    bookmarkedBy: action(userId),
  });
};

export const a = () => 0;
