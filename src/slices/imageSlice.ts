import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useGetImageDownloadUrl, { ImageCategory } from "../hooks/useUploadImage";
// TODO: 그냥 훅으로 만들기
interface ImageSlice {
  profileImage: string | null;
  reviewImages: string[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ImageSlice = {
  profileImage: null,
  reviewImages: null,
  status: "idle",
  error: null,
};

// 프로필 이미지 업로드
export const uploadProfileImage = createAsyncThunk(
  "images/uploadProfile",
  async (
    { userId, imageUrl }: { userId: string; imageUrl: string },
    { rejectWithValue }
  ) => {
    const { getImageDownloadUrl } = useGetImageDownloadUrl(); // 훅
    try {
      const downloadUrl = await getImageDownloadUrl(
        userId,
        imageUrl,
        ImageCategory.Users
      );
      return downloadUrl;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log("프로필 error", error);
      return rejectWithValue("프로필 이미지 업로드 실패");
    }
  }
);

// 리뷰 이미지 리스트 업로드
export const uploadReviewImages = createAsyncThunk(
  "images/uploadReview",
  async (
    { reviewId, imageUrls }: { reviewId: string; imageUrls: string[] },
    { rejectWithValue }
  ) => {
    const { getImageDownloadUrl } = useGetImageDownloadUrl();
    try {
      const downloadUrls = await Promise.all(
        imageUrls.map((imageUrl) =>
          getImageDownloadUrl(reviewId, imageUrl, ImageCategory.Reviews)
        )
      );
      return downloadUrls;
    } catch (error) {
      console.error("uploadReviewImages", error);
      return rejectWithValue("리뷰 이미지 업로드 실패");
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
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileImage = action.payload; // 프로필 이미지 저장
      })
      .addCase(uploadProfileImage.rejected, (state) => {
        state.status = "failed";
        // console.log("프로필 이미지 업로드 rejected", action.payload);
        // state.error = action.payload as string;
      });
    // 리뷰 이미지 업로드 처리
    builder
      .addCase(uploadReviewImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadReviewImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviewImages = action.payload;
      })
      .addCase(uploadReviewImages.rejected, (state, action) => {
        state.status = "failed";
        console.log("리뷰 이미지 업로드 rejected", action.payload);
        state.error = action.payload as string;
      });
  },
});

export default imageSlice.reducer;
