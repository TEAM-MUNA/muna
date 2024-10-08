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

const genreList = ["전체", "뮤지컬", "연극", "클래식"];
const genreMap: { [key: string]: string } = {
  전체: "", // 전체 장르
  뮤지컬: "GGGA",
  연극: "AAAA",
  클래식: "CCCA",
};

export default function ConcertList() {
  const [concertList, setConcertList] = useState<ConcertItem[]>([]);
  const [genreCode, setGenreCode] = useState<string>(""); // 전체장르(default)
  const [pfStateCode, setPfStateCode] = useState<string>("02"); // 공연중
  const [regionCode, setRegionCode] = useState<string>(""); // 전국

  const getData = async () => {
    try {
      const response = await fetch(
        `/openApi/restful/pblprfr?service=${process.env.REACT_APP_kopisKey}&stdate=20240901&eddate=20241230&rows=30&cpage=3&shcate=${genreCode}&prfstate=${pfStateCode}&signgucode=${regionCode}`
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
  }, [genreCode, pfStateCode, regionCode]);

  // onTabChanged 함수 정의
  const handleTabChange = (index: number) => {
    const selectedGenre = genreList[index];
    const code = genreMap[selectedGenre];
    setGenreCode(code);
  };

  // 공연 상태 onSelect 함수 정의
  const handlePfStateChange = (selected: string) => {
    let code = "";
    switch (selected) {
      case "공연중":
        code = "02";
        break;
      case "공연예정":
        code = "01";
        break;
      case "공연완료":
        code = "03";
        break;
      default:
        code = "";
    }
    setPfStateCode(code);
  };

  // 공연 상태 onSelect 함수 정의
  const handleRegionStateChange = (selected: string) => {
    let code = "";
    switch (selected) {
      case "서울":
        code = "11";
        break;
      case "인천":
        code = "28";
        break;
      case "강원":
        code = "51";
        break;
      case "부산":
        code = "26";
        break;
      default:
        code = "";
    }
    setRegionCode(code);
  };

  return (
    <>
      <Tab tabList={genreList} onTabChanged={handleTabChange} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0",
        }}
      >
        <div>
          <DropdownSelect
            options={["공연중", "공연예정", "공연완료", "공연전체"]}
            onSelect={handlePfStateChange}
          />
          <DropdownSelect
            options={[
              // "전국",
              // "서울/경기/인천",
              // "충청/대전/세종",
              // "경상/부산/대구/울산",
              // "전라/광주",
              // "강원",
              // "제주",
              "전국",
              "서울",
              "인천",
              "강원",
              "부산",
            ]}
            onSelect={handleRegionStateChange}
          />
        </div>
        <DropdownSelect
          options={["최신순", "북마크순", "리뷰순", "평점순"]}
          onSelect={() => {}}
        />
      </div>

      <ul>
        {concertList.map((concert) => {
          if (!concert || !concert.prfnm) {
            // concert이 null이거나 prfnm 속성이 없으면 스킵합니다.
            return null;
          }
          const concertProps = mapApiDataToConcertProps(concert);
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
