import { useEffect, useState } from "react";
import { ReviewType } from "../types/reviewType";
import { getReviewListFromFirebase } from "../api/firebase/reviewAPI";

const useGetReviewList = (mt20id: string | undefined) => {
  const [reviewList, setReviewList] = useState<ReviewType[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      if (!mt20id) {
        setError("공연이 존재하지 않습니다.");
        return;
      }

      try {
        const reviewData = await getReviewListFromFirebase(mt20id);
        setReviewList(reviewData as ReviewType[]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [mt20id]);

  return { reviewList, isLoading, error };
};
export default useGetReviewList;
