import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { loginToFirebase, logoutFromFirebase } from "../api/authAPI";

interface AuthState {
  user: { uid: string; email: string } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

// 로그인 액션
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await loginToFirebase(email, password);
      return { uid: user.uid, email: user.email! };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message); // firebase 오류일 경우
      }
      return rejectWithValue("로그인 중 에러 발생"); // 그 외 오류: 기본 메시지
    }
  }
);

// 로그아웃 액션
/* eslint-disable consistent-return */
export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutFromFirebase();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("로그아웃 중 에러 발생");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  // reducers - 해당 슬라이스에서 기본적으로 사용할 수 있는 액션들 정의
  // ex) 상태를 수정하거나 변경하는 동기 액션
  reducers: {
    // logout: () => {},
  },

  // extraReducers - 다른 슬라이스에서 생성된 액션 (특히 비동기작업)
  // 주로 createAsyncThunk를 통해 생생된 비동기 작업에 대한 액션을 처리
  extraReducers: (builder) => {
    // 로그인 처리
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ uid: string; email: string }>) => {
          state.status = "succeeded";
          state.user = action.payload; // 유저 정보를 업데이트
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "알 수 없는 오류가 발생하였습니다.";
      });

    // 로그아웃 처리
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.user = null; // 유저 정보 초기화
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "로그아웃에 실패했습니다.";
      });
  },
});

export default authSlice.reducer;
