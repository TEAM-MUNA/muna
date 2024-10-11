import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Firebase 공연 정보 불러오는 API
export const getUserFromFirebase = async (
  uid: string
): Promise<DocumentData | undefined> => {
  const result = await getDoc(doc(db, "users", uid));
  return result.data();
};

export const a = () => {
  return 0;
};
