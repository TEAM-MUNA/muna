import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Firebase에서 리뷰 리스트 불러오기
export const getReviewListFromFirebase = async (
  concertId?: string,
  popular: boolean = false
): Promise<DocumentData | undefined> => {
  const docRef = collection(db, "reviews");
  let q;

  console.log(concertId, popular);

  if (popular) {
    // 인기 리뷰 (메인 페이지에서 보여줌)
    q = query(docRef, orderBy("likeCount", "desc"), limit(10)); // length도 옵션으로 받기
  } else {
    // 특정 공연에 해당하는 리뷰
    q = query(docRef, where("concertId", "==", concertId));
  }

  const querySnapshot = await getDocs(q);

  const reviewList = querySnapshot.docs.map((fbDoc) => ({
    reviewId: fbDoc.id,
    ...fbDoc.data(),
  }));
  console.log(reviewList);
  return reviewList;
};

export const a = () => null;
