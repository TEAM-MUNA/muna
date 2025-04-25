import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../app/store";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";
import { fetchConcertDataForPeriod } from "../../api/kopisAPI";
import useScroll from "../../hooks/useScroll";
import styles from "./ConcertList.module.scss";
import { ConcertReturnType, ConcertType } from "../../types/concertType";
import { genreCodeList, genreList } from "../../utils/constants/genreData";
import regionList from "../../utils/constants/regionData";
import sortConcertList from "./sortConcertList";
import { clearQuery } from "../../slices/searchSlice";
import {
  fetchConcertsFromFirebase,
  sortConcerts,
} from "../../api/firebase/concertAPI";

const pfStateCodeMap: { [key: string]: string } = {
  공연중: "02",
  공연예정: "01",
  공연완료: "03",
  공연전체: "",
};

const regionCodeMap: { [key: string]: string[] } = {
  "서울/경기/인천": ["11", "41", "28"],
  "충청/대전/세종": ["43", "44", "30", "36"],
  "경상/부산/대구/울산": ["47", "48", "26", "27", "31"],
  "전라/광주": ["45", "46", "29"],
  강원: ["51"],
  제주: ["50"],
  전국: [],
};

export default function ConcertList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = useSelector((state: RootState) => state.search.query);
  const isEnd = useScroll();

  const [concertList, setConcertList] = useState<ConcertReturnType[]>([]);
  const [fbConcertList, setFbConcertList] = useState<ConcertType[]>([]);

  const [genreCode, setGenreCode] = useState<string>("");
  const [pfStateCode, setPfStateCode] = useState<string>("");
  const [regionCodes, setRegionCodes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("최신순");

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const handleTabChange = useCallback((index: number) => {
    setSelectedTabIndex(index); // 탭 인덱스 업데이트
    const code = genreCodeList[index];
    setGenreCode(code);
  }, []);

  const handlePfStateChange = useCallback((selected: string) => {
    setPfStateCode(pfStateCodeMap[selected]);
  }, []);

  const handleRegionStateChange = useCallback((selected: string) => {
    setRegionCodes(regionCodeMap[selected]);
  }, []);

  const handleSortChange = useCallback((selected: string) => {
    setSortOrder(selected);
  }, []);

  // 콘서트 카드 렌더링 함수
  const renderConcertItem = (concert: ConcertReturnType | ConcertType) => {
    if (!concert) {
      return null;
    }

    const isKopisConcert = "mt20id" in concert; // mt20id 속성이 있다면 kopis 공연 데이터
    // 다음은 kopis 데이터와 firebase 데이터의 key와 제목을 각각 설정해줍니다.
    const key = isKopisConcert
      ? `kopis-${concert.mt20id}`
      : `firebase-${concert.concertId}`;
    const title = isKopisConcert ? concert.prfnm : concert.title;

    if (!key || !title) return null; // key와 title이 유효하지 않으면 null 반환

    return (
      <li key={key}>
        {isKopisConcert ? (
          <ConcertCard concert={concert as ConcertReturnType} />
        ) : (
          <ConcertCard fbConcert={concert as ConcertType} />
        )}
      </li>
    );
  };

  // 의존성이 바뀌지 않으면, 이전 값을 그대로 재사용하여 불필요한 계산을 방지
  const sortedFbConcertList: ConcertType[] = useMemo(
    () => sortConcerts(fbConcertList, sortOrder), // 무거운 정렬
    [fbConcertList, sortOrder]
  );

  // kopis 공연 데이터 요청 - useCallback으로 변경
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const ALL_REGIONS = ""; // 전국 조회
    const list = regionCodes.length ? regionCodes : [ALL_REGIONS];
    const result = await Promise.all(
      list.map((regionCode) =>
        fetchConcertDataForPeriod(
          genreCode,
          pfStateCode,
          regionCode,
          page,
          keyword
        )
      )
    );
    const data = result.flat();
    const sortedData = sortConcertList(data, sortOrder);
    setConcertList((prev) => [...prev, ...sortedData]);
    setIsLoading(false);
  }, [page, sortOrder]);

  // fetchData 변경시 공연 목록 불러옴
  useEffect(() => {
    // console.log("🎬 useEffect triggered");
    // console.log("page: ", page);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const loadFirebaseConcerts = async () => {
      const data = await fetchConcertsFromFirebase();
      setFbConcertList(data);
    };
    loadFirebaseConcerts();
  }, []);

  useEffect(() => {
    setConcertList([]);
    setPage(1);
  }, [genreCode, pfStateCode, regionCodes, keyword, sortOrder]);

  // 화면 하단부 도착시 페이지 변경
  useEffect(() => {
    if (isEnd) setPage((prev) => prev + 1);
  }, [isEnd]);

  useEffect(
    () => () => {
      dispatch(clearQuery());
    },
    [dispatch]
  );

  // URL에서 장르 정보 가져와서 선택된 탭과 장르 변경
  useEffect(() => {
    const genreParam = new URLSearchParams(location.search).get("genre");
    if (genreParam) {
      const index = genreCodeList.indexOf(genreParam);
      if (index !== -1) {
        setGenreCode(genreParam); // 장르 코드 변경
        setSelectedTabIndex(index); // 선택된 탭 설정
      }
    }
  }, [location.search]);

  // ===== 조건 변수 =====
  const isFbSort = ["북마크순", "리뷰순", "평점순"].includes(sortOrder);
  const isEmpty = !concertList.length && !isLoading;

  // ===== 렌더링 =====
  return (
    <>
      <Tab
        tabList={genreList}
        onTabChanged={handleTabChange}
        selectedIndex={selectedTabIndex}
      />
      <div className={styles.flex_container}>
        <div>
          <DropdownSelect
            options={["공연전체", "공연중", "공연예정", "공연완료"]}
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
      {isLoading && <LoadingSpinner />}
      {isEmpty ? (
        <p className={styles.emptyMessage}>
          조건에 맞는 공연이 없습니다.
          <br />
          다른 키워드로 검색하거나, 필터 조건을 변경해 보세요!
        </p>
      ) : (
        <ul className={isLoading ? styles.faded : ""}>
          {isFbSort ? (
            <>
              {sortedFbConcertList.map(renderConcertItem)}
              {concertList.map(renderConcertItem)}
            </>
          ) : (
            concertList.map(renderConcertItem)
          )}
        </ul>
      )}
    </>
  );
}
