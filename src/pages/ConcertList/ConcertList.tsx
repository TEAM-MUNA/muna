import React, { useEffect, useState } from "react";
import { HeartSpinner } from "react-spinners-kit";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";
import { ConcertProps } from "../../types/concertProps";
import fetchConcertData from "./concertAPI";
import useScroll from "../../hooks/useScroll";
import styles from "./ConcertList.module.scss";

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

function mapApiDataToConcertProps(apiData: ConcertListItem): ConcertProps {
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
  const [concertList, setConcertList] = useState<ConcertListItem[]>([]);
  const [genreCode, setGenreCode] = useState<string>(""); // 전체장르(default)
  const [pfStateCode, setPfStateCode] = useState<string>("02"); // 공연중
  const [regionCode, setRegionCode] = useState<string>(""); // 전국
  const [page, setPage] = useState(1);
  const isEnd = useScroll();
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const scrollPosition = window.scrollY;

    const data = await fetchConcertData(
      genreCode,
      pfStateCode,
      regionCode,
      page
    );
    setConcertList((prevData) => [...prevData, ...data]);
    window.scrollTo(0, scrollPosition); // 스크롤 위치 유지
  };

  // 공연 목록 정보 조회 요청
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getData();
      setIsLoading(false);
    };

    fetchData();
  }, [genreCode, pfStateCode, regionCode, page]);

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
      <div className={styles.flex_container}>
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
      {isLoading && (
        <div className={styles.center}>
          <HeartSpinner size={100} color='#7926ff' />
        </div>
      )}
      <ul className={isLoading ? styles.faded : ""}>
        {concertList.map((concert) => {
          if (!concert || !concert.prfnm) {
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
