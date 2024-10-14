import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Firebase에서 해당 공연의 리뷰 리스트 불러오기
export const getReviewListFromFirebase = async (
  concertId: string
): Promise<DocumentData | undefined> => {
  try {
    const docRef = collection(db, "reviews");
    const q = query(docRef, where("concertId", "==", concertId));
    const querySnapshot = await getDocs(q);

    const reviews:
      | DocumentData
      | PromiseLike<DocumentData | undefined>
      | undefined = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ reviewId: doc.id, ...doc.data() });
    });
    return reviews;
  } catch (error) {
    console.error("리뷰 불러오기 실패", error);
    return [];
  }
};

export const a = () => null;
