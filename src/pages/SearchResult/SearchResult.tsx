import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ConcertList from "../ConcertList/ConcertList";

export default function SearchResult() {
  const query = useSelector((state: RootState) => state.search.query);
  if (!query) {
    return null; // 검색어가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "500",
            margin: "36px 0 36px",
          }}
        >
          &quot;{query}&quot; 검색 결과
        </p>
      </div>
      <ConcertList />
    </>
  );
}
