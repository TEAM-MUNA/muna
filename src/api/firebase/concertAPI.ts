import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
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

// Firebase concerts 컬렉션에 공연 추가
export const addConcert = async (concert: ConcertType) => {
  const docRef = doc(db, "concerts", concert.concertId!);
  await setDoc(docRef, {
    ...concert,
  });
  return concert.concertId;
};

// Firebase concerts 컬렉션에서 공연 삭제
export const deleteConcert = async (concertId: string) => {
  const docRef = doc(db, "concerts", concertId);
  await deleteDoc(docRef);
};

// 리뷰나, 북마크가 없는 공연 Firebase db에서 삭제
export const deleteInactiveConcert = async (concertId: string) => {
  const concert = await getConcertFromFirebase(concertId);

  if (!concert) {
    return;
  }

  if ((concert.bookmarkCount ?? 0) === 0 && (concert.reviewCount ?? 0) === 0) {
    await deleteConcert(concertId);
  }
};

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
  }).then(async () => {
    await deleteInactiveConcert(concertId);
  });
};

export const a = () => 0;

// 콘서트 아이디 배열로 콘서트의 title과 poster 정보만 가져오기
export const getConcertsForBookmarkList = async (
  concertIds?: string[]
): Promise<{
  [key: string]: { concertId: string; title: string; poster: string };
}> => {
  try {
    // 기존 함수 호출, 콘서트 데이터 가져오기
    const allConcertData = await getConcertsFromFirebase(concertIds);

    // 필요한 정보만 추출, 새로운 객체로 변환
    const concertInfo = Object.keys(allConcertData).reduce(
      (acc, key) => {
        const concert = allConcertData[key];
        if (concert.title && concert.poster) {
          acc[key] = {
            concertId: concert.concertId,
            title: concert.title,
            poster: concert.poster,
          };
        }
        return acc;
      },
      {} as {
        [key: string]: { concertId: string; title: string; poster: string };
      }
    );

    return concertInfo;
  } catch (error) {
    console.error("콘서트 타이틀, 포스터 정보를 가져오는데 실패함:", error);
    return {};
  }
};
