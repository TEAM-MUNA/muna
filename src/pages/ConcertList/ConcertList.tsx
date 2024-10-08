import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";
import { ConcertProps } from "../../types/concertProps";

interface ConcertItem {
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

function mapApiDataToConcertProps(apiData: ConcertItem): ConcertProps {
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

export default function ConcertList() {
  const [concertList, setConcertList] = useState<ConcertItem[]>([]);

  const genreList = ["전체", "뮤지컬", "연극", "콘서트", "클래식", "가족"];

  const concert = {
    mt20id: "PF210776",
    prfnm: "김광석 다시부르기 [울산]",
    prfpdfrom: "2016.05.21",
    prfpdto: "2016.05.21",
    fcltynm: "현대예술관",
    poster:
      "http://www.kopis.or.kr/upload/pfmPoster/PF_PF210604_230216_151032.gif",
    area: "울산광역시",
    genrenm: "대중음악",
    openrun: "N",
    prfstate: "공연완료",
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `/openApi/restful/pblprfr?service=${process.env.REACT_APP_kopisKey}&stdate=20240901&eddate=20241230&rows=30&cpage=1`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching data:", errorData);
        return;
      }

      const xmlString = await response.text();
      const parser = new XMLParser();
      const jsonObj = parser.parse(xmlString);

      // 원하는 데이터에 접근하기
      const dbs = jsonObj.dbs;
      const dbList = dbs.db;

      // dbList가 배열인지 확인하고, 아니면 배열로 변환
      const list = Array.isArray(dbList) ? dbList : [dbList];
      // 상태 업데이트
      setConcertList(list);
    } catch (error) {
      console.error("Network or parsing error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Tab tabList={genreList} />
      <div style={{ display: "flex", gap: "10px", padding: "20px 0" }}>
        <DropdownSelect options={["최신순", "리뷰순"]} onSelect={() => {}} />
        <DropdownSelect options={["전국", "인천"]} onSelect={() => {}} />
      </div>

      <ul>
        {concertList.map((item) => {
          const concertProps = mapApiDataToConcertProps(item);
          return (
            <li key={concert.mt20id}>
              <ConcertCard concert={concertProps} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
