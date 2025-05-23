import { useEffect, useState } from "react";
import { ConcertReturnType } from "../types/concertType";
import { fetchConcertDetail } from "../api/kopisAPI";

// kopis
const useGetConcertDetail = (mt20id: string | undefined) => {
  const [concertDetail, setConcertDetail] = useState<ConcertReturnType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        const concertData = await fetchConcertDetail(mt20id);
        setConcertDetail(concertData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // console.error(err);
        setError("kopis 공연 상세 정보를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [mt20id]);

  return { concertDetail, isLoading, error };
};

export default useGetConcertDetail;
