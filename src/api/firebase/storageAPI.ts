import { deleteObject, getStorage, listAll, ref } from "firebase/storage";

// storage에서 이미지 리스트 안 이미지들 다 삭제
export const deleteImageFromFireStorage = async (imagePath: string) => {
  const storage = getStorage();
  const folderRef = ref(storage, imagePath);

  const listResult = await listAll(folderRef);

  // 각각의 이미지 삭제
  const deletePromises = listResult.items.map((item) => deleteObject(item));

  await Promise.all(deletePromises);
};

// TODO: imageSlice에 정의된 함수들 옮기기
export const addImageFromFireStore = () => null;
