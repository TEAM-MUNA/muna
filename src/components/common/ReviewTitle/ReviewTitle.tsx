import React from "react";
import { Link } from "react-router-dom";
import styles from "./ReviewTitle.module.scss";
import Button from "../Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import DropdownMenu from "../Dropdown/DropdownMenu";

interface ReviewTitleProps {
  title: string; // 공연 제목 (prfnm)
  concertId: number; // 공연 ID (mt20id)
  genre: string; // 공연 장르 (genrenm)
  isMine?: boolean; // 내 리뷰임?
  nickname?: string;
}

export default function ReviewTitle({
  title,
  concertId,
  genre,
  isMine = false,
  nickname = "사용자123",
}: ReviewTitleProps) {
  const handleBackButton = () => {
    // navigate(-1);
  };
  const handleDropDown = () => {};

  const reviewOwner = isMine ? "나" : `${nickname} 님`; // 내 후기일 경우 "나"로 설정
  return (
    <header className={styles.review_title}>
      <div className={styles.left_btn}>
        <Button
          label='back'
          iconOnly={<ArrowLeftIcon />}
          onClick={handleBackButton}
        />
      </div>
      <div className={styles.title_container}>
        <h2>
          {reviewOwner}의 {genre} 후기
        </h2>
        <Link to={`/concert-detail/${concertId}`}>
          <h1>{`${genre} <${title}>`}</h1>
        </Link>
      </div>
      {isMine && (
        <div className={styles.right_btn}>
          <DropdownMenu
            options={["후기 수정", "후기 삭제"]}
            onSelect={handleDropDown}
          />
        </div>
      )}
    </header>
  );
}
