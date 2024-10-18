import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { genreMap } from "../ConcertList/constants/genreData";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./Search.module.scss";
import Button from "../../components/common/Button/Button";
import { ConcertType } from "../../types/concertType";
import { getConcertsFromFirebase } from "../../api/firebase/concertAPI";
import PosterCard from "../../components/common/PosterCard/PosterCard";
import { setQuery } from "../../slices/searchSlice";

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recommends, setRecommends] = useState<ConcertType[]>();
  const [recentQueries, setRecentQueries] = useState<
    { query: string; date: number }[]
  >([]);
  const query = useSelector((state: RootState) => state.search.query);

  const goToConcertList = (code: string) => {
    const navigateUrl =
      code.length === 0 ? `/concert` : `/concert?genre=${code}`;
    navigate(navigateUrl);
  };

  useEffect(() => {
    const getdata = async () => {
      const fbConcertsData = await getConcertsFromFirebase();

      const fbConcerts: ConcertType[] = Object.entries(fbConcertsData).map(
        ([, data]) => ({
          concertId: data.concertId,
          title: data.title,
          poster: data.poster,
          averageRating: data.averageRating,
          bookmarkedBy: data.bookmarkedBy,
          reviews: data.reviews,
        })
      );

      setRecommends(fbConcerts);
    };
    getdata();
  }, []);

  useEffect(() => {
    // console.log("🚀 ~ recommends:", recommends);
  }, [recommends]); // recommends가 변경될 때마다 실행

  // 최근 검색어 가져오기
  useEffect(() => {
    const storedQueries = JSON.parse(
      localStorage.getItem("recentQueries") || "[]"
    );
    setRecentQueries(storedQueries);
  }, [query]);

  // 검색어 클릭 핸들러
  const handleRecentQueryClick = (keyword: string) => {
    dispatch(setQuery(keyword));
  };

  // 검색어 삭제
  const removeQuery = (queryToRemove: string) => {
    const updatedQueries = recentQueries.filter(
      (item) => item.query !== queryToRemove
    );
    setRecentQueries(updatedQueries);
    localStorage.setItem("recentQueries", JSON.stringify(updatedQueries));
  };

  // 날짜 포맷팅 함수
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}.${day}`;
  };

  return (
    <div>
      {query ? (
        <SearchResult />
      ) : (
        <>
          <div>
            <h2>최근 검색어</h2>
            <ul>
              {recentQueries.map((item) => (
                <li
                  key={item.query}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    label={item.query}
                    onClick={() => handleRecentQueryClick(item.query)}
                  />
                  <div>
                    <span>{formatDate(item.date)}</span>
                    <button
                      type='button'
                      onClick={() => removeQuery(item.query)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.category_nav}>
            {Object.entries(genreMap).map(([genre, code]) => {
              // 제외할 장르의 코드
              const excludeCodes = ["EEEA", "BBBC", "EEEB", "BBBE"];
              if (excludeCodes.includes(code)) {
                return null;
              }

              return (
                <Button
                  key={code}
                  label={genre}
                  color='default'
                  size='md'
                  onClick={() => {
                    goToConcertList(code);
                  }}
                />
              );
            })}
          </div>
          <div>
            <h2>추천 콘텐츠</h2>
            <ul className={styles.recommends_container}>
              {recommends?.map((item) => (
                <li key={item.concertId}>
                  <PosterCard
                    title={item.title}
                    poster={item.poster}
                    concertId={item.concertId}
                    pageName='Search'
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
