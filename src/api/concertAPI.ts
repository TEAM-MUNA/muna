import {
  doc,
  DocumentData,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

// Firebase 공연 정보 하나 불러오는 API
export const getConcertFromFirebase = async (
  concertId: string
): Promise<DocumentData | undefined> => {
  const docRef = doc(db, "concerts", concertId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : undefined;
};

// Firebase 공연 정보 업데이트 - (1. 북마크)
export const bookmarkConcertToFirebase = async (
  userId: string,
  concertId: string,
  cancel: boolean = false
) => {
  const docRef = doc(db, "concerts", concertId);
  await updateDoc(docRef, {
    bookmarkedBy: !cancel ? arrayUnion(userId) : arrayRemove(userId),
  });
};

export const a = () => 0;
