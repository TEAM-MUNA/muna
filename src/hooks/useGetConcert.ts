// Firebase
import { useEffect, useState } from "react";
import { ConcertType } from "../types/concertType";
import { getConcertFromFirebase } from "../api/firebase/concertAPI";
import { useRequestContext } from "../context/RequestContext";

const useGetConcert = (concertId: string | undefined, pageName: string) => {
  const [concert, setConcert] = useState<ConcertType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { incrementRequestCount } = useRequestContext();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      if (!concertId) {
        setError("공연이 존재하지 않습니다.");
        return;
      }

      try {
        incrementRequestCount(`${pageName} useGetConcertDetail`);
        const data = await getConcertFromFirebase(concertId);
        setConcert(data as ConcertType);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // console.error(err);
        setError("Firebase 공연 정보를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [concertId]);

  return { concert, isLoading, error };
};

export default useGetConcert;
