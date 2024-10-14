import { useEffect, useState } from "react";
import { ReviewType } from "../types/reviewType";
import { getReviewListFromFirebase } from "../api/firebase/reviewAPI";

const useGetReviewList = (concertId: string | undefined) => {
  const [reviewList, setReviewList] = useState<ReviewType[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      if (!concertId) {
        setError("공연이 존재하지 않습니다.");
        return;
      }

      try {
        const reviewData = await getReviewListFromFirebase(concertId);
        setReviewList(reviewData as ReviewType[]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [concertId]);

  return { reviewList, isLoading, error };
};
export default useGetReviewList;
