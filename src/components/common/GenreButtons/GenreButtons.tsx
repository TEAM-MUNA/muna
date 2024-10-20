import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { genreMap } from "../../../utils/constants/genreData";
import styles from "./GenreButtons.module.scss";

interface GenreButtonsProps {
  page?: "main" | "search";
}

export default function GenreButtons({ page = "main" }: GenreButtonsProps) {
  const navigate = useNavigate();

  const goToConcertList = (code: string) => {
    const navigateUrl =
      code.length === 0 ? `/concert` : `/concert?genre=${code}`;
    navigate(navigateUrl);
  };

  return (
    <div
      className={`${styles.category_nav} ${page === "search" ? styles.search : styles.main}`}
    >
      {Object.entries(genreMap).map(([genre, code]) => (
        <Button
          key={code}
          label={genre === "전체" ? "모든 공연 보기" : genre}
          color={page === "main" ? "primary_line" : "default"}
          size='md'
          onClick={() => {
            goToConcertList(code);
          }}
        />
      ))}
    </div>
  );
}
