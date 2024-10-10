// src/api/concertAPI.ts
import { XMLParser } from "fast-xml-parser";
// import { ConcertListItem } from "../types/concertProps";

interface ConcertListItem {
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  area: string;
  genrenm: string;
  openrun: string;
  prfstate: "공연중" | "공연예정" | "공연완료" | undefined;
  // [key: string]: any; // 필요에 따라 추가적인 키를 허용
}

export default async function fetchConcertData(
  genreCode: string,
  pfStateCode: string,
  regionCode: string
): Promise<ConcertListItem[]> {
  try {
    const response = await fetch(
      `/openApi/restful/pblprfr?service=${process.env.REACT_APP_kopisKey}&stdate=20240901&eddate=20241230&rows=30&cpage=3&shcate=${genreCode}&prfstate=${pfStateCode}&signgucode=${regionCode}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching data:", errorData);
      return [];
    }

    const xmlString = await response.text();
    const parser = new XMLParser();
    const jsonObj = parser.parse(xmlString);

    const dbs = jsonObj.dbs;
    const dbList = dbs.db;

    return Array.isArray(dbList) ? dbList : [dbList];
  } catch (error) {
    console.error("Network or parsing error:", error);
    return [];
  }
}
