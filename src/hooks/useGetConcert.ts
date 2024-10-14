// Firebase
import { useEffect, useState } from "react";
import { ConcertType } from "../types/concertType";
import { getConcertFromFirebase } from "../api/firebase/concertAPI";

const useGetConcert = (concertId: string | undefined) => {
  const [concert, setConcert] = useState<ConcertType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        const data = await getConcertFromFirebase(concertId);
        setConcert(data as ConcertType);
      } catch (err) {
        console.error(err);
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
