import React from "react";
import Header from "../../components/layout/Header/Header";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";

export default function ConcertList() {
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

  return (
    <>
      <Tab tabList={genreList} />
      <div style={{ display: "flex", gap: "10px", padding: "20px 0" }}>
        <DropdownSelect options={["최신순", "리뷰순"]} onSelect={() => {}} />
        <DropdownSelect options={["전국", "인천"]} onSelect={() => {}} />
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <li>
          <ConcertCard concert={concert} />
        </li>
        <li>
          <ConcertCard concert={concert} />
        </li>
        <li>
          <ConcertCard concert={concert} />
        </li>
      </ul>
    </>
  );
}
