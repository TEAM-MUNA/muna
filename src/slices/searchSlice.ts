import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;

      // 공백 문자열 제거
      const trimmedQuery = action.payload.trim();
      if (trimmedQuery === "") return;

      const storedQueries = JSON.parse(
        localStorage.getItem("recentQueries") || "[]"
      );

      // 현재 날짜의 타임스탬프 가져오기
      const timestamp = Date.now();

      // 검색어 & 검색 날짜 객체로 저장
      const newEntry = { query: trimmedQuery, date: timestamp };

      const updatedQueries = [
        newEntry,
        ...storedQueries.filter(
          (entry: typeof newEntry) => entry.query !== trimmedQuery
        ),
      ].slice(0, 5); // 5개만 저장

      localStorage.setItem("recentQueries", JSON.stringify(updatedQueries));
    },
    clearQuery(state) {
      state.query = "";
    },
  },
});

export const { setQuery, clearQuery } = searchSlice.actions;
export default searchSlice.reducer;
