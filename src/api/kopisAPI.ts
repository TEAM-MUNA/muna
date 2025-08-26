import axios from "axios";
import parseXml from "../utils/parseXml";
import { ConcertReturnType } from "../types/concertType";

// kopis Open API
axios.defaults.baseURL = "/.netlify/functions";

// 공연 상세 정보 조회
// 이제 프론트에서는 kopis API 대신 Netlify Function 호출
export const fetchConcertDetail = async (mt20id: string) => {
  try {
    const { data } = await axios.get(
      `/getConcertDetail`, // Netlify Functions은 함수이름 으로 접근
      { params: { mt20id } }
    );

    const concertDetail = parseXml(data) as ConcertReturnType;
    return concertDetail;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error(error);
    return null;
  }
};

// 공연 목록 정보 조회
export const fetchConcertList = async (
  genreCode: string,
  pfStateCode: string,
  regionCode: string,
  page: number,
  keyword: string,
  startDate: string,
  endDate: string
): Promise<ConcertReturnType[]> => {
  try {
    const { data } = await axios.get("/getConcertList", {
      params: {
        genreCode,
        pfStateCode,
        regionCode,
        page,
        keyword,
        startDate,
        endDate,
      },
    });

    const concertList = parseXml(data) as ConcertReturnType[];
    return concertList || [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};

// 날짜 범위 나누기 함수
export const splitDateRange = (
  startDate: string,
  endDate: string
): string[][] => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dateRanges: string[][] = [];

  while (start < end) {
    const rangeEnd = new Date(start);
    rangeEnd.setDate(start.getDate() + 30); // 31일 기간 설정

    if (rangeEnd > end) {
      rangeEnd.setTime(end.getTime()); // 끝 날짜로 조정
    }

    dateRanges.push([
      start.toISOString().slice(0, 10).replace(/-/g, ""),
      rangeEnd.toISOString().slice(0, 10).replace(/-/g, ""),
    ]);

    start.setDate(start.getDate() + 31); // 날짜를 31일 후로 이동
  }

  return dateRanges;
};

// 1년치 데이터를 병렬 요청하는 함수
export const fetchConcertDataForPeriod = async (
  genreCode: string,
  pfStateCode: string,
  regionCode: string,
  page: number,
  keyword: string
): Promise<ConcertReturnType[]> => {
  const now = new Date();
  const endDate = now.toISOString().slice(0, 10); // 오늘 날짜
  const start = new Date(now.setFullYear(now.getFullYear() - 1)); // 1년 전 날짜
  const startDate = start.toISOString().slice(0, 10);

  const dateRanges = splitDateRange(startDate, endDate);

  let allConcerts: ConcertReturnType[] = [];

  for (const [stdate, eddate] of dateRanges) {
    const concerts = await fetchConcertList(
      genreCode,
      pfStateCode,
      regionCode,
      page,
      keyword,
      stdate,
      eddate
    );
    allConcerts = allConcerts.concat(concerts);
  }

  // // 모든 요청을 병렬로 처리하고, 결과를 병합
  // const concertLists = await Promise.all(requests);
  // const allConcerts = concertLists.flat();

  // 💡 mt20id 기준 중복 제거
  const uniqueConcerts = Array.from(
    new Map(allConcerts.map((item) => [`kopis-${item.mt20id}`, item])).values()
  );

  return uniqueConcerts;
};
