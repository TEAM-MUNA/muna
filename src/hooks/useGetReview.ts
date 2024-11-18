import { useEffect, useState } from "react";
import { ReviewType } from "../types/reviewType";
import { getReviewFromFirebase } from "../api/firebase/reviewAPI";
import { useRequestContext } from "../context/RequestContext";

const useGetReview = (reviewId: string | undefined, pageName: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewType | null>(null);
  const { incrementRequestCount } = useRequestContext();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      if (!reviewId) {
        setError("리뷰가 존재하지 않습니다.");
        return;
      }
      try {
        incrementRequestCount(`${pageName} useGetReview`);
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
  }, [reviewId, pageName, incrementRequestCount]);
  return { review, isLoading, error, setReview };
};
export default useGetReview;
