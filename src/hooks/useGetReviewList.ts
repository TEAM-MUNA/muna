import { useEffect, useState } from "react";
import { ReviewType } from "../types/reviewType";
import { getReviewListFromFirebase } from "../api/firebase/reviewAPI";
import { useRequestContext } from "../context/RequestContext";

const useGetReviewList = ({
  concertId,
  criteria,
  pageName,
}: {
  concertId?: string | undefined;
  criteria?: "likeCount" | "rating" | "createdAt" | "date";
  pageName: string; // Firebase 사용 추적을 위함
}) => {
  const [reviewList, setReviewList] = useState<ReviewType[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { incrementRequestCount } = useRequestContext();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        incrementRequestCount(`${pageName} useGetReviewList`);
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
