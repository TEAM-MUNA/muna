import { ConcertType, ConcertReturnType } from "../types/concertType";

export default function mapApiDataToConcertType(
  apiData: ConcertReturnType
): ConcertType {
  return {
    title: apiData.prfnm,
    poster: apiData.poster,
    state: apiData.prfstate,
    startDate: apiData.prfpdfrom,
    endDate: apiData.prfpdto,
    location: apiData.fcltynm,
    age: "전체 관람가", // API 데이터에 없으므로 기본값 설정
    starRate: "4.7", // 임시 값 또는 다른 데이터 소스에서 가져오기
    reviewCount: 777, // 임시 값 또는 다른 데이터 소스에서 가져오기
    bookmarkCount: 77, // 임시 값 또는 다른 데이터 소스에서 가져오기
    concertLink: `/concert/${apiData.mt20id}`, // 상세 페이지 링크 생성
  };
}
