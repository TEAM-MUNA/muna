import React, { useEffect, useState, useCallback, useMemo } from "react";
import { HeartSpinner } from "react-spinners-kit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../app/store";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ConcertCard from "../../components/common/ConcertCard/ConcertCard";
import { fetchConcertList } from "../../api/kopisAPI";
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
  // Kopis ConcertList
  const [concertList, setConcertList] = useState<ConcertReturnType[]>([]);
  // FireBase ConcertList
  const [fbConcertList, setFbConcertList] = useState<ConcertType[]>([]);

  const [genreCode, setGenreCode] = useState<string>("");
  const [pfStateCode, setPfStateCode] = useState<string>("");
  const [regionCodes, setRegionCodes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("최신순");
  const [page, setPage] = useState(1);
  const keyword = useSelector((state: RootState) => state.search.query);
  const isEnd = useScroll();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  // kopis 공연 데이터 요청
  const getData = async () => {
    const dataList = await Promise.all(
      (regionCodes.length ? regionCodes : [""]).map((regionCode) =>
        fetchConcertList(genreCode, pfStateCode, regionCode, page, keyword)
      )
    );
    const addedConcerts = dataList.flat();

    setConcertList((prevData) => [
      ...prevData,
      ...sortConcertList(addedConcerts, sortOrder),
    ]);
  };

  // firebase 공연 전체 불러오기 (처음에만)
  useEffect(() => {
    const fetchAllConcerts = async () => {
      const allConcerts = await fetchConcertsFromFirebase();
      setFbConcertList(allConcerts);
      // 초기 정렬 설정
    };
    fetchAllConcerts(); // 처음 한번 호출
  }, []); // 빈 배열이므로 처음에만 실행

  // sortOrder가 변경될 때마다 정렬만 수행
  // 정렬된 FireBase ConcertList를 useMemo로 관리
  const sortedFbConcertList: ConcertType[] = useMemo(() => {
    if (fbConcertList.length > 0) {
      return sortConcerts(fbConcertList, sortOrder);
    }
    return [];
  }, [fbConcertList, sortOrder]);

  // 컴포넌트가 언마운트될 때 검색어 초기화
  useEffect(
    () => () => {
      dispatch(clearQuery()); // 클린업
    },
    [dispatch]
  );

  // 필터 값 변경 시 리스트 초기화
  useEffect(() => {
    setConcertList([]);
    setPage(1); // 페이지를 1로 리셋
  }, [genreCode, pfStateCode, regionCodes, keyword]);

  // 페이지 변경시 공연 리스트 요청
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getData();
      setIsLoading(false);
    };

    fetchData();
  }, [page, keyword, genreCode]);

  // 화면 하단부 도착시 페이지 변경
  useEffect(() => {
    if (isEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isEnd]);

  // onTabChanged 함수 정의
  const handleTabChange = useCallback((index: number) => {
    setSelectedTabIndex(index); // 탭 인덱스 업데이트
    const code = genreCodeList[index];
    setGenreCode(code);
  }, []);

  // URL에서 genre 파라미터를 읽어와서 해당 탭과 genreCode를 설정
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      const genreIndex = genreCodeList.indexOf(genreParam);
      if (genreIndex !== -1) {
        setSelectedTabIndex(genreIndex); // 탭 인덱스 설정
        setGenreCode(genreParam); // 장르 코드 설정
      }
    }
  }, [location.search]);

  // 공연 상태 onSelect 함수 정의
  const handlePfStateChange = useCallback((selected: string) => {
    setPfStateCode(pfStateCodeMap[selected]);
  }, []);

  // 지역 상태 onSelect 함수 정의
  const handleRegionStateChange = useCallback((selected: string) => {
    setRegionCodes(regionCodeMap[selected]);
  }, []);

  // 공연목록 정렬 기준 변경
  const handleSortChange = useCallback((selected: string) => {
    setSortOrder(selected);
  }, []);

  // 정렬이 변경될 때마다 concertList 정렬
  // useEffect(() => {
  //   setConcertList((prevData) => sortConcertList(prevData, sortOrder));
  // }, [sortOrder]);

  // 콘서트 아이템 렌더링 함수
  const renderConcertItem = (concert: ConcertReturnType | ConcertType) => {
    // concert가 존재하지 않거나 title 또는 prfnm 속성이 없을 경우 null을 반환
    if (!concert) {
      return null;
    }

    // ConcertReturnType인지 ConcertType인지에 따라 key와 title 설정
    const key =
      "mt20id" in concert
        ? `kopis-${concert.mt20id}`
        : `firebase-${concert.concertId}`;
    const title = "prfnm" in concert ? concert.prfnm : concert.title;

    // key와 title이 유효하지 않으면 null 반환
    if (!key || !title) {
      return null;
    }

    return (
      <li key={key}>
        {/* concert 혹은 fbConcert를 조건부로 전달 */}
        {"mt20id" in concert ? (
          <ConcertCard concert={concert as ConcertReturnType} />
        ) : (
          <ConcertCard fbConcert={concert as ConcertType} />
        )}
      </li>
    );
  };

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
      {isLoading && (
        <div className={styles.center}>
          <HeartSpinner size={65} color='#7926ff' />
        </div>
      )}
      {!isLoading && concertList[1] === undefined ? (
        <p className={styles.emptyMessage}>
          조건에 맞는 공연이 없습니다.
          <br />
          다른 키워드로 검색하거나, 필터 조건을 변경해 보세요!
        </p>
      ) : (
        <ul className={isLoading ? styles.faded : ""}>
          {["북마크순", "리뷰순", "평점순"].includes(sortOrder) ? (
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
