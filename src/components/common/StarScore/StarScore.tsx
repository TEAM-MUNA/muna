import React from "react";
<<<<<<< HEAD
import { useState } from "react";
import styles from "./StarScore.module.scss";
import StarIcon from "../../../assets/svg/StarIcon";

interface StarScoreProps {
    initialRating: number;
    onRatingChange: (rating: number) => void;
}

export default function StarScore({
    initialRating = 0,
    onRatingChange
}: StarScoreProps){
    const [rating, setRating] = useState(initialRating);

    const handleClick = (selectRating: number) => {
        const newRating = selectRating === rating ? 0 : selectRating;
        setRating(newRating);
        onRatingChange(newRating);
        if(onRatingChange){
            onRatingChange(newRating);
        }return newRating;
    };

    function ratingText() {
    let result;
    switch(rating){
        case 1:
            result = <span className = {`${styles.font_lg} ${styles.black}`}>1점 (별로예요)</span>
        break;
        case 2:
            result = <span className = {`${styles.font_lg} ${styles.black}`}>2점 (그저그래요)</span>
        break;
        case 3:
            result = <span className = {`${styles.font_lg} ${styles.black}`}>3점 (괜찮아요)</span>
        break;
        case 4:
            result = <span className = {`${styles.font_lg} ${styles.black}`}>4점 (좋아요)</span>
        break;
        case 5:
            result = <span className = {`${styles.font_lg} ${styles.black}`}>5점 (최고예요)</span>
        break;
        default:
            result = <span className = {`${styles.font_md} ${styles.black_lighter}`}>별점을 선택하세요</span>
        break;
    } return result;
    };

    return (
        <div className = {styles.container}>
            <div>
            {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
                <span
                onClick={() => handleClick(starValue)}
                className = {`${rating == 0 ? styles.black_lighter : styles.primary}`}
                >
                    <StarIcon active = {starValue <= rating} size="40"/>
                </span>
            );
            })}
            </div>
            {ratingText()}
        </div>
    )
}
=======
import styles from "./StarScore.module.scss";
import StarIcon from "../../../assets/svg/StarIcon";
import getRatingText from "../../../utils/getRatingText";

export interface StarScoreProps {
  rating: number;
  handleClick: (newRating: number) => void;
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
              onClick={() => handleClick(starValue)}
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
>>>>>>> 756ee767a9823ce8755d2c8877b28da10f9caa89
