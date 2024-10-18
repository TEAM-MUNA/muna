import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ReviewType } from "../../types/reviewType";

// Firebase에서 리뷰 리스트 불러오기
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

export const getReviewFromFirebase = async (
  reviewId: string
): Promise<DocumentData | undefined> => {
  const result = await getDoc(doc(db, "reviews", reviewId));
  return result.data();
};

export const addReviewToFirebase = async (review: ReviewType) => {
  const docRef = doc(db, "reviews", review.reviewId);
  await setDoc(docRef, review);
  return review.reviewId;
};
