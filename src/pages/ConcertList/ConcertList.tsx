import React, { useEffect } from "react";
import xmlToJson from "../../utils/xmlToJson";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";

export default function ConcertList() {
  // const [concertList, setConcertList] = useState([]);
  const genreList = [
    "전체",
    "뮤지컬",
    "연극",
    "콘서트",
    "클래식",
    "가족/아동",
    "전체",
    "뮤지컬",
    "연극",
    "콘서트",
    "클래식",
  ];

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
        `/openApi/restful/pblprfr?service=${process.env.REACT_APP_kopisKey}&stdate=20160101&eddate=20160630&rows=10&cpage=101`
      );

      if (!response.ok) {
        // 오류 발생 시 오류 데이터를 JSON으로 출력
        const errorData = await response.json();
        console.error("Error fetching data:", errorData);
        return;
      }

      const xmlString = await response.text();
      const parser = new DOMParser();
      const xmlNode = parser.parseFromString(xmlString, "text/xml");

      // XML을 JSON으로 변환하여 출력
      const item = xmlToJson(xmlNode);
      console.log("🚀 ~ getData ~ item:", item);
    } catch (error) {
      // 네트워크 오류 등 기타 오류 처리
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
        <li key={1}>
          <ConcertCard concert={concert} />
        </li>
        <li key={2}>
          <ConcertCard concert={concert} />
        </li>
        <li key={3}>
          <ConcertCard concert={concert} />
        </li>
      </ul>
    </>
  );
}
