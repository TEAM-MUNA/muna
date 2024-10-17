import { useEffect, useState } from "react";
import { ReviewType } from "../types/reviewType";
import { getReviewListFromFirebase } from "../api/firebase/reviewAPI";

const useGetReviewList = ({
  concertId,
  criteria,
}: {
  concertId?: string | undefined;
  criteria?: "likeCount" | "rating" | "createdAt" | "date";
}) => {
  const [reviewList, setReviewList] = useState<ReviewType[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const reviewData = await getReviewListFromFirebase(concertId, criteria);
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
