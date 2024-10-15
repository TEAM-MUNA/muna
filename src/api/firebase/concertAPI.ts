import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ConcertType } from "../../types/concertType";

// Firebase 공연 정보 하나 불러오는 API
export const getConcertFromFirebase = async (
  concertId: string
): Promise<DocumentData | undefined> => {
  const docRef = doc(db, "concerts", concertId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : undefined;
};

// Firebase 공연 여러개의 정보를 불러오기
// concertIds 배열을 넣으면 해당 공연의 정보들을 불러옴
// 인자없이 호출 시에는 모든 공연의 정보를 가져옴
export const getConcertsFromFirebase = async (
  concertIds?: string[]
): Promise<{ [key: string]: DocumentData }> => {
  const concertData: { [key: string]: DocumentData } = {};

  if (concertIds && concertIds.length > 0) {
    // 특정 concertIds에 해당하는 공연 데이터 가져오기
    const promises = concertIds.map(async (concertId) => {
      const docRef = doc(db, "concerts", concertId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        concertData[concertId] = docSnap.data();
      }
    });

    await Promise.all(promises);
  } else {
    // 모든 공연 데이터 가져오기
    const querySnapshot = await getDocs(collection(db, "concerts"));
    querySnapshot.forEach((fbDoc) => {
      concertData[fbDoc.id] = fbDoc.data();
    });
  }

  return concertData;
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
  currentBookmarkCount: number,
  cancel: boolean = false
) => {
  const concertsDocRef = doc(db, "concerts", concertId);
  const action = cancel ? arrayRemove : arrayUnion;
  const bookmarkCount = cancel
    ? currentBookmarkCount - 1
    : currentBookmarkCount + 1;

  await updateDoc(concertsDocRef, {
    bookmarkedBy: action(userId),
    bookmarkCount,
  });
};

// Firebase에 concerts 컬렉션에 공연 추가
export const addConcert = async (concert: ConcertType) => {
  const docRef = doc(db, "concerts", concert.concertId!);
  await setDoc(docRef, {
    ...concert,
  });
  console.log("Document written with ID: ", concert.concertId);
  return concert.concertId;
};

export const a = () => 0;
