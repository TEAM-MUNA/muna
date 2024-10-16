import { useEffect, useState } from "react";
import { ReviewType } from "../types/reviewType";
import { getReviewFromFirebase } from "../api/firebase/reviewAPI";

const useGetReview = (reviewId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewType | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      if (!reviewId) {
        setError("리뷰가 존재하지 않습니다.");
        return;
      }
      try {
        const data = await getReviewFromFirebase(reviewId);
        setReview(data as ReviewType);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("리뷰를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return { isLoading, error, review };
};
export default useGetReview;
