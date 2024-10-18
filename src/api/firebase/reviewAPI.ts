import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { ReviewListType } from "../../types/reviewType";
import { db } from "../../firebase";

// 콘서트 아이디 입력 -> Firebase에서 리뷰 리스트 불러오기
export const getReviewListFromFirebase = async (
  concertId?: string,
  criteria?: string // 정렬 기준
): Promise<DocumentData | undefined> => {
  const docRef = collection(db, "reviews");
  let q;

  if (criteria) {
    // 인기 리뷰 (메인 페이지에서 보여줌)
    q = query(docRef, orderBy(criteria, "desc"), limit(10)); // length도 옵션으로 받기
  } else {
    // 특정 공연에 해당하는 리뷰
    q = query(docRef, where("concertId", "==", concertId));
  }

  const querySnapshot = await getDocs(q);

  const reviewList = querySnapshot.docs.map((fbDoc) => ({
    reviewId: fbDoc.id,
    ...fbDoc.data(),
  }));
  return reviewList;
};

// 리뷰 아이디 입력 -> 리뷰 리스트에 필요한 데이터 출력
export const getReviewListById = async (
  reviewIds?: string[]
): Promise<ReviewListType[] | undefined> => {
  if (!reviewIds || reviewIds.length === 0) {
    // console.warn("유효하지 않은 리뷰 ID입니다.");
    return []; // 유효하지 않은 경우 undefined 반환
  }

  // 각 리뷰 ID에 대한 비동기 작업을 배열로 만듭니다.
  const reviewPromises = reviewIds.map(async (reviewId) => {
    const reviewDocRef = doc(db, "reviews", reviewId);
    const reviewDocSnapshot = await getDoc(reviewDocRef);

    if (reviewDocSnapshot.exists()) {
      const data = reviewDocSnapshot.data();
      return {
        reviewId: reviewDocSnapshot.id,
        concert: {
          title: data.concert.title,
          poster: data.concert.poster,
        },
        date: data.date,
        contentsPreview: data.contents.slice(0, 200), // 내용 앞 200자
        thumbnail: data.images[0],
        hasMultipleImages: data.images.length > 1,
        likeCount: data.likeCount,
        rating: data.rating || 0,
      } as ReviewListType;
    }
    // console.warn(`리뷰 ID ${reviewId}에 해당하는 문서를 찾을 수 없습니다.`);
    return null; // 문서가 존재하지 않거나 에러가 발생한 경우 null 반환
  });

  // 모든 프로미스가 완료될 때까지 기다립니다.
  const reviewList = await Promise.all(reviewPromises);

  // null이 아닌 값만 필터링합니다.
  return reviewList.filter((review) => review !== null) as ReviewListType[];
};

export const a = () => null;
