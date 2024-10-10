import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useGetImageDownloadUrl, { ImageCategory } from "../hooks/useUploadImage";
// TODO: 그냥 훅으로 만들기
interface ImageSlice {
  profileImage: string | null;
  contentImage: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ImageSlice = {
  profileImage: null,
  contentImage: null,
  status: "idle",
  error: null,
};

// 프로필 이미지 업로드
export const uploadProfileImage = createAsyncThunk(
  "images/uploadProfile",
  async (imageUrl: string, { rejectWithValue }) => {
    const { getImageDownloadUrl } = useGetImageDownloadUrl(); // 훅
    try {
      const url = await getImageDownloadUrl(imageUrl, ImageCategory.Users);
      return url;
    } catch (error) {
      console.log("프로필 error", error);
      return rejectWithValue("프로필 이미지 업로드 실패");
    }
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState,

  // reducers - 해당 슬라이스에서 기본적으로 사용할 수 있는 액션들 정의
  // ex) 상태를 수정하거나 변경하는 동기 액션
  reducers: {
    // logout: () => {},
  },

  // extraReducers - 다른 슬라이스에서 생성된 액션 (특히 비동기작업)
  // 주로 createAsyncThunk를 통해 생생된 비동기 작업에 대한 액션을 처리
  extraReducers: (builder) => {
    // 프로필 이미지 업로드 처리
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileImage = action.payload; // 프로필 이미지 저장
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.status = "failed";
        console.log("프로필 이미지 업로드 rejected", action.payload);
        // state.error = action.payload as string;
      });
  },
});

export default imageSlice.reducer;
