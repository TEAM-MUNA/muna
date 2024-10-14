import React from "react";
import StarIcon from "../../../assets/svg/StarIcon";
import styles from "./StarScoreOnlyIcon.module.scss";

export default function StarScoreOnlyIcon({
  rating,
}: {
  rating: number | null;
}) {
  const className = rating === null ? styles.black_lighter : styles.black;

  return (
    <div className={className}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={starValue}
            active={rating ? starValue <= rating : false}
            size='20'
          />
        );
      })}
    </div>
  );
}
