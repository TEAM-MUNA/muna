import axios from "axios";
import parseXml from "../utils/parseXml";
import { ConcertReturnType } from "../types/concertType";

// const PROXY =
//   window.location.hostname === "localhost"
//     ? "/openApi/restful/pblprfr"
//     : "/openApi/restful/pblprfr";
// const URL = `${PROXY}`;

// kopis Open API
axios.defaults.baseURL = "https://www.kopis.or.kr/openApi/restful/pblprfr";

// 공연 상세 정보 조회
export const fetchConcertDetail = async (mt20id: string) => {
  try {
    const { data } = await axios.get(`/${mt20id}`, {
      params: {
        service: process.env.REACT_APP_kopisKey,
      },
    });

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
  keyword: string
): Promise<ConcertReturnType[]> => {
  try {
    const { data } = await axios.get("/", {
      params: {
        service: process.env.REACT_APP_kopisKey,
        stdate: "20000101",
        eddate: "20251230",
        rows: 15,
        cpage: page,
        shcate: genreCode,
        prfstate: pfStateCode,
        signgucode: regionCode,
        shprfnm: keyword,
      },
    });

    const concertList = parseXml(data) as ConcertReturnType[];
    return concertList;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error fetching data:", error);
    return [];
  }
};
