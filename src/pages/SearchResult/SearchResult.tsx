import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function SearchResult() {
  const query = useSelector((state: RootState) => state.search.query);
  if (!query) {
    return null; // 검색어가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div>
      <p>{query}에 대한 검색 결과</p>
      {/* 검색 결과 목록 */}
    </div>
  );
}
