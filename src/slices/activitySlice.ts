import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

import {
  addUserReview,
  getUserFromFirebase,
  removeUserReview,
  updateUserBookmark,
  updateUserLike,
} from "../api/firebase/authAPI";
import {
  addConcert,
  addConcertReview,
  getConcertFromFirebase,
  removeConcertReview,
  updateConcertBookmark,
  updateConcertRating,
} from "../api/firebase/concertAPI";
import { UserActivityType } from "../types/userType";
import { ConcertType } from "../types/concertType";
import { ReviewType } from "../types/reviewType";
import {
  addReviewToFirebase,
  getReviewFromFirebase,
  removeReviewFromFirebase,
  updateReviewLike,
} from "../api/firebase/reviewAPI";

import { uploadReviewImages } from "./imageSlice";
import { deleteImageFromFireStorage } from "../api/firebase/storageAPI";

// 사용자 인터렉션

interface ActivityState {
  userActivity: UserActivityType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActivityState = {
  userActivity: {
    bookmarkedConcerts: [],
    likedReviews: [],
    reviews: [],
  },
  status: "idle",
  error: null,
};

// 유저 인터랙션 초기화하기 위해 fetch
// initializeUserActivity
export const fetchUserActivity = createAsyncThunk<
  UserActivityType | null,
  string,
  { rejectValue: string }
>("activity/fetchUserActivity", async (userId: string, { rejectWithValue }) => {
  try {
    const user = await getUserFromFirebase(userId);
    return {
      bookmarkedConcerts: user?.bookmarkedConcerts || [],
      likedReviews: user?.likedReviews || [],
      reviews: user?.reviews || [],
    };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      // console.log("파이어베이스 에러:", error.message);
      return rejectWithValue(error.message);
    }
    return rejectWithValue("사용자 데이터를 불러오는 데 실패했습니다.");
  }
});

// 북마크
export const bookmarkConcertAsync = createAsyncThunk<
  string[] | undefined, // 업데이트된 북마크 목록 반환
  {
    userId: string;
    concert: ConcertType;
    cancel?: boolean;
  }
>(
  "activity/bookmark",
  async (
    {
      userId,
      concert,
      cancel = false,
    }: { userId: string; concert: ConcertType; cancel?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const firebaseConcert = await getConcertFromFirebase(concert.concertId!);

      if (!firebaseConcert) {
        await addConcert(concert);
      }
      const currentBookmarkCount = firebaseConcert
        ? firebaseConcert.bookmarkCount
        : 0;

      await Promise.all([
        updateConcertBookmark(
          userId,
          concert.concertId!,
          currentBookmarkCount,
          cancel
        ),
        updateUserBookmark(userId, concert.concertId!, cancel),
      ]);
      const updatedUser = await getUserFromFirebase(userId);
      // console.log("updated", updatedUser);

      // 업데이트된 북마크 목록 반환
      return updatedUser?.bookmarkedConcerts;
    } catch (error) {
      // console.log("bookmarkconceertasync", error);

      return rejectWithValue(error);
    }
  }
);

// 좋아요
export const likeReviewAsync = createAsyncThunk<
  string[] | undefined, // 업데이트된 좋아요 목록 반환
  {
    userId: string;
    // review: ReviewType;
    reviewId: string | undefined;
    cancel?: boolean;
  }
>(
  "activity/review",
  async (
    {
      userId,
      reviewId,
      cancel = false,
    }: { userId: string; reviewId: string | undefined; cancel?: boolean },
    { rejectWithValue }
  ) => {
    try {
      // Firebase에서 해당 리뷰를 가져오기
      const firebaseReview = await getReviewFromFirebase(reviewId!);

      // 현재 좋아요 수를 가져오기
      const currentLikeCount = firebaseReview ? firebaseReview.likeCount : 0;

      // 리뷰정보 업데이트, 사용자의 리뷰정보 업데이트
      await Promise.all([
        updateReviewLike(userId, reviewId!, currentLikeCount, cancel),
        updateUserLike(userId, reviewId!, cancel),
      ]);

      // 업데이트된 사용자 정보 (likedReviews) 가져오기
      const updatedUser = await getUserFromFirebase(userId);

      // 업데이트된 좋아요 목록 반환
      return updatedUser?.likedReviews;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const uploadReviewAsync = createAsyncThunk<
  string[] | undefined,
  { userId: string; review: ReviewType; concert: ConcertType }
>(
  "activity/uploadReview",
  async ({ userId, review, concert }, { dispatch, rejectWithValue }) => {
    let downloadUrls: string[] = [];
    let concertId: string | undefined = concert.concertId!;
    try {
      const firebaseConcert = await getConcertFromFirebase(concert.concertId!);

      if (!firebaseConcert) {
        concertId = await addConcert(concert);
      }

      if (review.images) {
        // 1. 이미지 리스트 업로드
        try {
          downloadUrls = await dispatch(
            uploadReviewImages({
              reviewId: review.reviewId,
              imageUrls: review.images,
            })
          ).unwrap();
        } catch (e) {
          rejectWithValue(e);
        }
      }

      await Promise.all([
        // 2. 리뷰 컬렉션에 추가
        await addReviewToFirebase({ ...review, images: downloadUrls }),
        // 3. 유저에 리뷰 추가
        await addUserReview(userId, review.reviewId),
        // 4. 공연에 리뷰 추가
        await addConcertReview(concertId!, review.reviewId),
        // 5. 공연에 평점 추가
        await updateConcertRating(concertId!, review.rating),
      ]);
      // 유저 정보에 리뷰를 저장해야됨
      const updatedUser = await getUserFromFirebase(userId);
      return updatedUser?.reviews; // 유저 정보의 리뷰 리스트 반환
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReviewAsync = createAsyncThunk<string[] | undefined, string>(
  "activity/deleteReview",

  async (reviewId, { rejectWithValue }) => {
    try {
      try {
        // 지워질 리뷰 정보 가져오기
        const targetReview = (await getReviewFromFirebase(
          reviewId
        )) as ReviewType;

        await Promise.all([
          // 4. 리뷰 이미지 리스트 삭제
          await deleteImageFromFireStorage(`reviews/${targetReview.reviewId}/`),

          // 1. 리뷰 컬렉션에서 제거
          await removeReviewFromFirebase(targetReview.reviewId),
          // 2. 유저 컬렉션에서 리뷰 제거
          await removeUserReview(targetReview.author.id, targetReview.reviewId),
          // 3. 공연 컬렉션에서 리뷰 제거
          await removeConcertReview(
            targetReview.concert.id,
            targetReview.reviewId
          ),
        ]);
        // 유저 정보에서 리뷰 삭제
        const updatedUser = await getUserFromFirebase(targetReview.author.id);
        return updatedUser?.reviews;
      } catch (e) {
        // 지워질 리뷰를 찾을 수 없는 경우
        return rejectWithValue(e);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setUserActivity: (
      state,
      action: PayloadAction<ActivityState["userActivity"]>
    ) => {
      state.userActivity = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 초기화
    builder
      .addCase(fetchUserActivity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userActivity = action.payload; // user activity 정보 초기화
      })
      .addCase(fetchUserActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 북마크
    builder
      .addCase(bookmarkConcertAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bookmarkConcertAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.userActivity) {
          state.userActivity.bookmarkedConcerts = action.payload;
        }
        state.error = null;
      })
      .addCase(bookmarkConcertAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 좋아요
    builder
      .addCase(likeReviewAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likeReviewAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.userActivity) {
          state.userActivity.likedReviews = action.payload;
        }
        state.error = null;
      })
      .addCase(likeReviewAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 리뷰 업로드
    builder
      .addCase(uploadReviewAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadReviewAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.userActivity) {
          state.userActivity.reviews = action.payload;
        }
        state.error = null;
      })
      .addCase(uploadReviewAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 리뷰 삭제
    builder
      .addCase(deleteReviewAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.userActivity) {
          state.userActivity.reviews = action.payload;
        }
        state.error = null;
      })
      .addCase(deleteReviewAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { setUserActivity } = activitySlice.actions;
export default activitySlice.reducer;
