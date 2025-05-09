import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { deleteUser, User } from "firebase/auth";
import {
  loginToFirebase,
  logoutFromFirebase,
  setUserOnDoc,
  updateUserOnDoc,
  signupToFirebase,
  updateProfileToFirebase,
  updatePasswordToFirebase,
  withdrawFromFirebase,
} from "../api/firebase/authAPI";
import { UserType } from "../types/userType";
import { firebaseAuth } from "../firebase";
import { uploadProfileImage } from "./imageSlice";

interface AuthState {
  user: UserType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

// 회원가입 액션
export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (
    {
      email,
      password,
      nickname,
      profileImage,
    }: {
      email: string;
      password: string;
      nickname: string;
      profileImage: string | null;
    },
    { dispatch, rejectWithValue }
  ) => {
    let user: User | null = null;
    let downloadUrl: string | null = null;

    try {
      // 1. 회원가입
      user = await signupToFirebase(email, password);

      if (user && profileImage) {
        // 2. profileImage storage에 업로드
        try {
          downloadUrl = await dispatch(
            uploadProfileImage({ userId: user.uid, imageUrl: profileImage })
          ).unwrap();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          return rejectWithValue("프로필 이미지를 등록하지 못했습니다.");
        }
      }

      // 3. nickname(displayName), profileImage(photoURL) 업데이트
      if (user) {
        await updateProfileToFirebase(user, nickname, downloadUrl);
      } else {
        return rejectWithValue("회원가입에 실패했습니다.");
      }

      // 4. Firestore에 사용자 정보 등록
      await setUserOnDoc(user, nickname, downloadUrl || profileImage);

      return {
        user: {
          userId: user.uid,
          email: user.email,
          nickname: user.displayName,
          profileImage: user.photoURL,
        },
      };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (user) {
          try {
            await deleteUser(user); // 하나라도 실패하면 삭제
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            // console.error("사용자 삭제 중 에러", e);
          }
        }
        return rejectWithValue(error.message); // firebase 오류일 경우
      }
      return rejectWithValue("회원가입 중 에러 발생"); // 그 외 오류: 기본 메시지
    }
  }
);

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

// 프로필 변경하기 액션
export const updateProfileAsync = createAsyncThunk(
  "auth/updateProfile",
  async (
    {
      nickname,
      profileImage,
    }: {
      nickname: string;
      profileImage: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        await updateProfileToFirebase(user, nickname, profileImage);

        // Firestore에 사용자 정보 업데이트
        await updateUserOnDoc(user, nickname, profileImage);

        // Firebase에서 업데이트된 사용자 정보를 가져와서 리덕스에 저장
        const updatedUser = {
          nickname,
          profileImage: profileImage || user.photoURL || null, // 이미지가 없으면 기존 이미지 사용
        };

        return updatedUser; // 반환값
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // console.log("파이어베이스 에러:", error.message);
        return rejectWithValue(error.message); // firebase 오류일 경우
      }
      return rejectWithValue("프로필 변경 중 에러 발생"); // 그 외 오류: 기본 메시지
    }
  }
);

// 비밀번호 변경 액션
export const updatePasswordAsync = createAsyncThunk(
  "auth/updatePassword",
  async (
    {
      newPassword,
    }: {
      newPassword: string;
    },
    { rejectWithValue }
  ) => {
    const user = firebaseAuth.currentUser;

    try {
      if (user) {
        updatePasswordToFirebase(user, newPassword);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("비밀번호 변경 중 에러 발생");
    }
  }
);

// 회원 탈퇴 액션
export const withdrawAsync = createAsyncThunk(
  "auth/withdraw",
  async (_, { rejectWithValue }) => {
    const user = firebaseAuth.currentUser;

    if (!user) {
      return rejectWithValue("사용자를 찾을 수 없습니다.");
    }

    try {
      await withdrawFromFirebase(user);
      // console.log("탈퇴 성공");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("탈퇴 중 에러 발생");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  // reducers - 해당 슬라이스에서 기본적으로 사용할 수 있는 액션들 정의
  // ex) 상태를 수정하거나 변경하는 동기 액션
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<{ nickname?: string; profileImage?: string | null }>
    ) => {
      if (state.user) {
        // 기존 유저 정보에서 필요한 필드만 업데이트
        state.user.nickname = action.payload.nickname ?? state.user.nickname;
        state.user.profileImage =
          action.payload.profileImage ?? state.user.profileImage;
      }
    },
    // logout은 extraReducers에서 처리
  },

  // extraReducers - 다른 슬라이스에서 생성된 액션 (특히 비동기작업)
  // 주로 createAsyncThunk를 통해 생생된 비동기 작업에 대한 액션을 처리
  extraReducers: (builder) => {
    // 회원가입 처리
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signupAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: {
              userId: string;
              email: string | null;
              nickname: string | null;
              profileImage: string | null;
            };
          }>
        ) => {
          state.status = "succeeded";
          // console.log(action.payload);
          // state.user = action.payload; // 유저 정보 업데이트
          state.user = {
            userId: action.payload.user.userId,
            email: action.payload.user.email || undefined,
            nickname: action.payload.user.nickname || undefined,
            profileImage: action.payload.user.profileImage || undefined,
          };
          state.error = null;
        }
      )
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // 사용자 정의 에러 메시지 저장
        // console.error("에러 확인:", state.error, action.error.message);
      });

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
        // TODO: state.error = action.payload as string; 으로 변경하기
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

    // 프로필 변경 처리
    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateProfileAsync.fulfilled,
        (
          state,
          action: PayloadAction<
            | {
                nickname: string | null;
                profileImage: string | null;
              }
            | undefined
          >
        ) => {
          state.status = "succeeded";
          if (action.payload) {
            state.user = {
              ...state.user, // 기존의 state.user 속성 유지
              nickname: action.payload.nickname ?? state.user?.nickname, // 닉네임 업데이트
              profileImage:
                action.payload.profileImage ?? state.user?.profileImage, // 프로필 이미지 업데이트
            };
            state.status = "succeeded";
            state.error = null;
          } else {
            state.status = "failed";
          }
        }
      )
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 탈퇴 처리
    builder
      .addCase(withdrawAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(withdrawAsync.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.error = null;
      })
      .addCase(withdrawAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "탈퇴 실패했습니다.";
      });
  },
});
export const { setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
