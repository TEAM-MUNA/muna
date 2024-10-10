import { useEffect, useState } from "react";
import { ConcertReturnType } from "../types/concertType";
import { fetchConcertDetail } from "../api/concertAPI";

const useGetConcertDetail = (mt20id: string | undefined) => {
  const [concertDetail, setConcertDetail] = useState<ConcertReturnType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      if (!mt20id) {
        setError("공연이 존재하지 않습니다.");
        return;
      }

      try {
        const concertData = await fetchConcertDetail(mt20id);
        setConcertDetail(concertData);
      } catch (err) {
        console.error(err);
        setError("공연 상세 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [mt20id]);

  return { concertDetail, loading, error };
};

export default useGetConcertDetail;
