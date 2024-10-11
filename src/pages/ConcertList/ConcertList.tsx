import React, { useEffect, useState } from "react";
import { HeartSpinner } from "react-spinners-kit";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";
import mapApiDataToConcertType from "../../utils/mapApiDataToConcertType";
import { fetchConcertList } from "../../api/concertAPI";
import useScroll from "../../hooks/useScroll";
import styles from "./ConcertList.module.scss";
import { ConcertReturnType } from "../../types/concertType";

const genreList = ["전체", "뮤지컬", "연극", "클래식"];
const genreMap: { [key: string]: string } = {
  전체: "", // 전체 장르
  뮤지컬: "GGGA",
  연극: "AAAA",
  클래식: "CCCA",
};

export default function ConcertList() {
  const [concertList, setConcertList] = useState<ConcertReturnType[]>([]);
  const [genreCode, setGenreCode] = useState<string>(""); // 전체장르(default)
  const [pfStateCode, setPfStateCode] = useState<string>("02"); // 공연중
  const [regionCodeList, setRegionCodeList] = useState<string[]>([""]); // 선택된 지역코드 리스트
  const [page, setPage] = useState(1);
  const isEnd = useScroll();
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("최신순");

  // 공연 목록 최신순으로 정렬하기
  const sortConcertList = (list: ConcertReturnType[]) => {
    const sortedList = [...list];
    if (sortOrder === "최신순") {
      sortedList.sort(
        (a, b) =>
          new Date(b.prfpdfrom).getTime() - new Date(a.prfpdfrom).getTime()
      );
    }
    return sortedList;
  };

  const getData = async () => {
    const dataList = await Promise.all(
      regionCodeList.map((regionCode) =>
        fetchConcertList(genreCode, pfStateCode, regionCode, page)
      )
    );
    // 모든 데이터를 평평하게 펼쳐서 concertList에 추가
    const combinedData = dataList.flat();
    setConcertList((prevData) =>
      sortConcertList([...prevData, ...combinedData])
    );
  };

  useEffect(() => {
    setConcertList([]); // 필터 값 변경 시 리스트 초기화
  }, [genreCode, pfStateCode, regionCodeList]);

  // 공연 목록 정보 조회 요청
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getData();
      setIsLoading(false);
    };

    fetchData();
  }, [genreCode, pfStateCode, regionCodeList, page]);

  // 화면 하단부 도착시 페이지 변경
  useEffect(() => {
    if (isEnd) {
      setPage((prevPage) => prevPage + 1);
    }
    console.log(page);
  }, [isEnd]);

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

  const regionList = [
    "전국",
    "서울/경기/인천",
    "충청/대전/세종",
    "경상/부산/대구/울산",
    "전라/광주",
    "강원",
    "제주",
  ];

  // 공연 상태 onSelect 함수 정의
  const handleRegionStateChange = (selected: string) => {
    let codes = [""];
    switch (selected) {
      case "서울/경기/인천":
        codes = ["11", "41", "28"];
        break;
      case "충청/대전/세종":
        codes = ["43", "44", "30", "36"];
        break;
      case "경상/부산/대구/울산":
        codes = ["47", "48", "26", "27", "31"];
        break;
      case "전라/광주":
        codes = ["45", "46", "29"];
        break;
      case "강원":
        codes = ["51"];
        break;
      case "제주":
        codes = ["50"];
        break;
      default:
        codes = [""];
    }
    setRegionCodeList(codes);
  };

  // 공연목록 정렬 기준 변경
  const handleSortChange = (selected: string) => {
    setSortOrder(selected);
  };

  // 정렬이 변경될 때마다 concertList 정렬
  useEffect(() => {
    setConcertList((prevData) => sortConcertList(prevData));
  }, [sortOrder]);

  return (
    <>
      <Tab tabList={genreList} onTabChanged={handleTabChange} />
      <div className={styles.flex_container}>
        <div>
          <DropdownSelect
            options={["공연중", "공연예정", "공연완료", "공연전체"]}
            onSelect={handlePfStateChange}
          />
          <DropdownSelect
            options={regionList}
            onSelect={handleRegionStateChange}
          />
        </div>
        <DropdownSelect
          options={["최신순", "북마크순", "리뷰순", "평점순"]}
          onSelect={handleSortChange}
        />
      </div>
      {isLoading && (
        <div className={styles.center}>
          <HeartSpinner size={65} color='#7926ff' />
        </div>
      )}
      <ul className={isLoading ? styles.faded : ""}>
        {concertList.map((concert) => {
          if (!concert || !concert.prfnm) {
            return null;
          }
          const concertProps = mapApiDataToConcertType(concert);
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
