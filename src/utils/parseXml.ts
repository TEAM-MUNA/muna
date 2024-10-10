import { XMLParser } from "fast-xml-parser";
import { ConcertReturnType } from "../types/concertType";

// XML 파싱 함수
const parseXml = (
  xmlString: string
): ConcertReturnType | ConcertReturnType[] => {
  const parser = new XMLParser();
  const jsonObj = parser.parse(xmlString);

  const dbs = jsonObj.dbs;
  const dbList = dbs.db;

  return Array.isArray(dbList) ? dbList : [dbList];
};

export default parseXml;
