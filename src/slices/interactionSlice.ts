import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

import {
  getUserFromFirebase,
  updateUserBookmark,
  updateUserReview,
} from "../api/firebase/authAPI";
import {
  addConcert,
  getConcertFromFirebase,
  updateConcertBookmark,
} from "../api/firebase/concertAPI";
import { UserInteractionType } from "../types/userType";
import { ConcertType } from "../types/concertType";
import { ReviewType } from "../types/reviewType";
import { addReviewToFirebase } from "../api/firebase/reviewAPI";

import { uploadReviewImages } from "./imageSlice";

// 사용자 인터렉션

interface InteractionState {
  userInteraction: UserInteractionType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InteractionState = {
  userInteraction: {
    bookmarkedConcerts: [],
    likedReviews: [],
    reviews: [],
  },
  status: "idle",
  error: null,
};

// 유저 인터랙션 초기화하기 위해 fetch
// initializeUserInteraction
export const fetchUserInteraction = createAsyncThunk<
  UserInteractionType | null,
  string,
  { rejectValue: string }
>(
  "interaction/fetchUserInteraction",
  async (userId: string, { rejectWithValue }) => {
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
  }
);

// 북마크
export const bookmarkConcertAsync = createAsyncThunk<
  string[] | undefined, // 업데이트된 북마크 목록 반환
  {
    userId: string;
    concert: ConcertType;
    cancel?: boolean;
  }
>(
  "interaction/bookmark",
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

export const uploadReviewAsync = createAsyncThunk<
  string[] | undefined,
  { userId: string; review: ReviewType }
>(
  "interaction/review",
  async ({ userId, review }, { dispatch, rejectWithValue }) => {
    let downloadUrls: string[] = [];
    try {
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
        await updateUserReview(userId, review.reviewId),
      ]);
      // 유저 정보에 리뷰를 저장해야됨
      const updatedUser = await getUserFromFirebase(userId);
      return updatedUser?.reviews; // 유저 정보의 리뷰 리스트 반환
    } catch (error) {
      console.error("uploadReviewAsync", error);
      return rejectWithValue(error);
    }
  }
);

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    setUserInteraction: (
      state,
      action: PayloadAction<InteractionState["userInteraction"]>
    ) => {
      state.userInteraction = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 초기화
    builder
      .addCase(fetchUserInteraction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserInteraction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInteraction = action.payload; // user interaction 정보 초기화
      })
      .addCase(fetchUserInteraction.rejected, (state, action) => {
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
        if (state.userInteraction) {
          state.userInteraction.bookmarkedConcerts = action.payload;
        }
        state.error = null;
      })
      .addCase(bookmarkConcertAsync.rejected, (state, action) => {
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
        if (state.userInteraction) {
          state.userInteraction.reviews = action.payload;
        }
        state.error = null;
      })
      .addCase(uploadReviewAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { setUserInteraction } = interactionSlice.actions;
export default interactionSlice.reducer;
