import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./Search.module.scss";
import { ConcertType } from "../../types/concertType";
import { getConcertsFromFirebase } from "../../api/firebase/concertAPI";
import PosterCard from "../../components/common/PosterCard/PosterCard";
import { setQuery } from "../../slices/searchSlice";
import RecentSearchList from "./RecentSearchList";
import GenreButtons from "../../components/common/GenreButtons/GenreButtons";

export default function Search() {
  const dispatch = useDispatch();
  const [recommends, setRecommends] = useState<ConcertType[]>();
  const [recentQueries, setRecentQueries] = useState<
    { query: string; date: number }[]
  >([]);
  const query = useSelector((state: RootState) => state.search.query);

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

      // 북마크 수로 내림차순 정렬 후, 상위 6개 선택
      const sortedConcerts = fbConcerts
        .sort(
          (a, b) =>
            (b.bookmarkedBy?.length || 0) - (a.bookmarkedBy?.length || 0)
        )
        .slice(0, 6);

      // 상위 6개의 콘서트를 랜덤으로 섞기
      const shuffledConcerts = sortedConcerts.sort(() => Math.random() - 0.5);

      setRecommends(shuffledConcerts);
    };

    getdata();
  }, []);

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

  return (
    <div>
      {query ? (
        <SearchResult />
      ) : (
        <>
          {recentQueries.length !== 0 ? (
            <RecentSearchList
              recentQueries={recentQueries}
              onQueryClick={handleRecentQueryClick}
              onQueryRemove={removeQuery}
            />
          ) : null}
          <GenreButtons page='search' />
          <div>
            <h2 className={styles.h2}>추천 콘텐츠</h2>
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
