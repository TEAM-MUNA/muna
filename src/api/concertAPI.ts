import axios from "axios";
import parseXml from "../utils/parseXml";
import { ConcertReturnType } from "../types/concertType";

axios.defaults.baseURL = "/openApi/restful/pblprfr";

// interface ConcertListItem {
//   mt20id: string;
//   prfnm: string;
//   prfpdfrom: string;
//   prfpdto: string;
//   fcltynm: string;
//   poster: string;
//   area: string;
//   genrenm: string;
//   openrun: string;
//   prfstate: "공연중" | "공연예정" | "공연완료" | undefined;
//   // [key: string]: any; // 필요에 따라 추가적인 키를 허용
// }

// // 공연 리스트 조회
export const getConcertList = async () => {};
//   page: number,
//   genreCode: string,
//   pfStateCode: string,
//   regionCode: string
// ): Promise<ConcertListItem[]> => {
//   try {
//     const response: AxiosResponse<ConcertListItem[]> = await axios.get("/", {
//       params: {
//         service: process.env.REACT_APP_kopisKey,
//         stdate: "20240901",
//         eddate: "20241230",
//         rows: 30,
//         cpage: page,
//         shcate: genreCode,
//         prfstate: pfStateCode,
//         signgucode: regionCode,
//       },
//     });

//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

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
  } catch (error) {
    console.error(error);
    return null;
  }
};
