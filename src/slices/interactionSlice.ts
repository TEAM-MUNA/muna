import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUserBookmark } from "../api/firebase/authAPI";
import {
  addConcert,
  getConcertFromFirebase,
  updateConcertBookmark,
} from "../api/firebase/concertAPI";
import { UserType } from "../types/userType";
import { ConcertType } from "../types/concertType";

// 사용자 인터렉션

interface InteractionState {
  user: UserType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InteractionState = {
  user: null,
  status: "idle",
  error: null,
};

// 북마크
export const bookmarkConcertAsync = createAsyncThunk(
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
      return true;
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
      .addCase(bookmarkConcertAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(bookmarkConcertAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default interactionSlice.reducer;
