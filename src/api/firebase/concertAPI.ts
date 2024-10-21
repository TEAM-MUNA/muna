import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  runTransaction,
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
  await setDoc(docRef, concert);
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
// TODO: update 함수 합치기(refactor)
export const updateConcertReview = async (
  concertId: string,
  reviewId: string
) => {
  const concertsDocRef = doc(db, "concerts", concertId);
  await updateDoc(concertsDocRef, {
    reviews: arrayUnion(reviewId),
  });
};

export const updateConcertRating = async (
  concertId: string,
  rating: number | undefined
) => {
  const concertsDocRef = doc(db, "concerts", concertId);

  if (!rating) {
    // 평점 없으면 리턴
    return;
  }
  await runTransaction(db, async (transaction) => {
    const concertDoc = await transaction.get(concertsDocRef);

    if (!concertDoc.exists()) {
      return;
    }

    const existingData = concertDoc.data();
    const existingRatings = existingData.ratings || [];

    // 1. 평점 배열에 추가
    const updatedRatings = [...existingRatings, rating];

    // 2. 평점 계산
    const averageRating =
      updatedRatings.reduce((total, rate) => total + rate, 0) /
      updatedRatings.length;

    transaction.update(concertsDocRef, {
      ratings: updatedRatings,
      averageRating,
    });
  });
};

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("콘서트 타이틀, 포스터 정보를 가져오는데 실패함:", error);
    return {};
  }
};

// Firebase에서 공연 데이터를 불러오는 함수
export const fetchConcertsFromFirebase = async (): Promise<ConcertType[]> => {
  const querySnapshot = await getDocs(collection(db, "concerts"));
  const concertList: ConcertType[] = [];

  querySnapshot.forEach((fbdoc) => {
    const data = fbdoc.data() as ConcertType;
    concertList.push(data);
  });

  return concertList;
};

// 파이어 베이스에서 불러온 공연 리스트 정렬하는 함수
export const sortConcerts = (
  list: ConcertType[],
  sortOrder: string
): ConcertType[] => {
  // 리스트가 없거나 비어 있으면 그대로 반환
  if (!list || list.length === 0) return list;

  // 정렬 조건에 따라 정렬
  const sortedConcerts = list.sort((A, B) => {
    if (sortOrder === "북마크순") {
      const aBookmarks = A.bookmarkedBy?.length || 0;
      const bBookmarks = B.bookmarkedBy?.length || 0;
      return bBookmarks - aBookmarks;
    }
    if (sortOrder === "리뷰순") {
      const aReviews = A.reviews?.length || 0;
      const bReviews = B.reviews?.length || 0;
      return bReviews - aReviews;
    }
    if (sortOrder === "평점순") {
      const aRating = A.averageRating || 0;
      const bRating = B.averageRating || 0;
      return bRating - aRating;
    }
    return 0; // 기본 정렬은 없음
  });

  return sortedConcerts;
};
