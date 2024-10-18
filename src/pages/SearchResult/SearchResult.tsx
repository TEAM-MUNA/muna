import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ConcertList from "../ConcertList/ConcertList";
import styles from "./SearchResult.module.scss";

export default function SearchResult() {
  const query = useSelector((state: RootState) => state.search.query);
  if (!query) {
    return null; // 검색어가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <>
      <div className={styles.searchResult}>
        <p className={styles.searchQuery}>&quot;{query}&quot; 검색 결과</p>
      </div>
      <ConcertList />
    </>
  );
}
