import {
  arrayRemove,
  arrayUnion,
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ReviewListType, ReviewType } from "../../types/reviewType";
import { db } from "../../firebase";

// 콘서트 아이디 입력 -> Firebase에서 리뷰 리스트 불러오기
export const getReviewListFromFirebase = async (
  concertId?: string,
  criteria?: string // 정렬 기준
): Promise<DocumentData | undefined> => {
  const docRef = collection(db, "reviews");
  let q = query(docRef);

  if (criteria) {
    // 인기 리뷰 (메인 페이지에서 보여줌)
    q = query(docRef, orderBy(criteria, "desc"), limit(10)); // length도 옵션으로 받기
  }
  if (concertId) {
    // 특정 공연에 해당하는 리뷰
    q = query(docRef, where("concert.id", "==", concertId));
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

// 리뷰 하나 불러오기
export const getReviewFromFirebase = async (
  reviewId: string
): Promise<DocumentData | undefined> => {
  const result = await getDoc(doc(db, "reviews", reviewId));
  return result.data();
};

// reviews에 추가하기
export const addReviewToFirebase = async (review: ReviewType) => {
  const docRef = doc(db, "reviews", review.reviewId);

  // 별점 없는 경우
  const { rating, ...rest } = review;
  const updateReview = {
    ...rest,
    ...(rating !== undefined ? { rating } : {}),
  };
  await setDoc(docRef, updateReview);
  return review.reviewId;
};

// reviews에서 리뷰 삭제하기
export const removeReviewFromFirebase = async (reviewId: string) => {
  const docRef = doc(db, "reviews", reviewId);
  await deleteDoc(docRef);
};

// 프로필 변경시, 작성한 리뷰의 author 정보 업데이트
export const updateAuthorProfileInReviews = async (
  reviewIds: string[] | undefined,
  userId: string,
  nickname: string,
  profileImage: string | null
) => {
  if (!reviewIds || reviewIds.length === 0) {
    throw new Error("No reviews found for this user.");
  }

  // 리뷰 ID 배열을 순회하며 각 후기를 업데이트
  const updatePromises = reviewIds.map(async (reviewId) => {
    const reviewDocRef = doc(db, "reviews", reviewId);

    // 파이어베이스에서 리뷰 업데이트
    await updateDoc(reviewDocRef, {
      author: {
        id: userId,
        nickname,
        profileImage: profileImage || "",
      },
    });
  });

  // 모든 업데이트가 완료될 때까지 대기
  await Promise.all(updatePromises);
};

// 해당 리뷰에 좋아요를 추가한 사용자 추가/삭제
export const updateReviewLike = async (
  userId: string,
  reviewId: string,
  currentLikeCount: number,
  cancel: boolean = false
) => {
  const concertsDocRef = doc(db, "reviews", reviewId);
  const action = cancel ? arrayRemove : arrayUnion;
  const likeCount = cancel ? currentLikeCount - 1 : currentLikeCount + 1;

  await updateDoc(concertsDocRef, {
    likedBy: action(userId),
    likeCount,
  });

  console.log("리뷰에 좋아요한 사용자정보 추가/삭제됨 -", likeCount);
};
