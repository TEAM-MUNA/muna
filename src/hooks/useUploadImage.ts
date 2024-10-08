import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import getResizeImage from "../utils/getResizeImage";
/**
 * Firebase storage에 이미지를 등록합니다.
 * 일반 ImageUploader 컴포넌트 (이미지 셀렉) 관련 훅이 아닌, Firebase 관련 훅입니다.
 * (일반 ImageUploader 컴포넌트는 따로 훅 없음)
 * 프로필 이미지 업로드, 리뷰 작성 이미지 업로드 시 사용됩니다.
 */
export enum ImageCategory {
  Users = "users",
  Reviews = "reviews",
  Logo = "logo",
}

const useGetImageDownloadUrl = () => {
  const getImageDownloadUrl = async (
    imageUrl: string,
    category: ImageCategory
  ) => {
    const storage = getStorage();
    // 업로드 시 사진 사이즈 줄이기
    const canvas = await getResizeImage(imageUrl, 300, 300);
    const resizedImageUrl = canvas.toDataURL();

    const storageRef = ref(storage, `${category}/${Date.now()}`);
    await uploadString(storageRef, resizedImageUrl, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("download url", downloadUrl);

    return downloadUrl;
  };
  return { getImageDownloadUrl };
};

export default useGetImageDownloadUrl;
