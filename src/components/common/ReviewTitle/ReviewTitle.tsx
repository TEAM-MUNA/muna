import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ReviewTitle.module.scss";
import Button from "../Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import DropdownMenu from "../Dropdown/DropdownMenu";
import useGetReview from "../../../hooks/useGetConcert";

interface ReviewTitleProps {
  title: string; // 공연 제목 (prfnm)
  isMine?: boolean; // 내 리뷰임?
  concertId?: string;
  nickname?: string;
}

export default function ReviewTitle({
  title,
  isMine = false,
  concertId,
  nickname = "",
}: ReviewTitleProps) {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
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
        <h2>{reviewOwner}의 후기</h2>
        <Link to={`/concert/${concertId}`} key={concertId}>
          <h1>{`<${title}>`}</h1>
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
