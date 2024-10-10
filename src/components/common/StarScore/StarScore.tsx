import React from "react";
import styles from "./StarScore.module.scss";
import StarIcon from "../../../assets/svg/StarIcon";
import getRatingText from "../../../utils/getRatingText";

export interface StarScoreProps {
  rating: number;
  handleClick?: (newRating: number) => void;
  // setRating:
}

export default function StarScore({ rating, handleClick }: StarScoreProps) {
  // const [rating, setRating] = useState(initialRating);

  // const handleClick = (selectRating: number) => {
  //   const newRating = selectRating === rating ? 0 : selectRating;
  //   setRating(newRating);
  //   if (onRatingChange) {
  //     onRatingChange(newRating);
  //   }
  //   return newRating;
  // };

  const ratingTextClassName =
    rating === 0
      ? `${styles.font_md} ${styles.black_lighter}`
      : `${styles.font_lg} ${styles.black}`;

  return (
    <div className={styles.container}>
      <div>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type='button'
              key={starValue}
              onClick={() => {
                if (handleClick) {
                  handleClick(starValue);
                }
              }}
              className={`${rating === 0 ? styles.black_lighter : styles.primary}`}
            >
              <StarIcon active={starValue <= rating} size='40' />
            </button>
          );
        })}
      </div>
      <span className={ratingTextClassName}>
        {rating}점 ({getRatingText(rating)})
      </span>
    </div>
  );
}
