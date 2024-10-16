import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserFromFirebase,
  updateUserBookmark,
} from "../api/firebase/authAPI";
import {
  addConcert,
  getConcertFromFirebase,
  updateConcertBookmark,
} from "../api/firebase/concertAPI";
import { UserInteractionType } from "../types/userType";
import { ConcertType } from "../types/concertType";

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
      console.log("updated", updatedUser);

      // 업데이트된 북마크 목록 반환
      return updatedUser?.bookmarkedConcerts;
    } catch (error) {
      console.log("bookmarkconceertasync", error);

      return rejectWithValue(error);
    }
  }
);
const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default interactionSlice.reducer;
