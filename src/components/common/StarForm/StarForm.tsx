import React, { useState } from "react";
import StarTag from "../StarTag/StarTag";
import styles from "./StarForm.module.scss";
import ArrowUpIcon from "../../../assets/svg/ArrowUpIcon";
import useToggle from "../../../hooks/useToggle";
import ArrowDownIcon from "../../../assets/svg/ArrowDownIcon";
import Button from "../Button/Button";
import StarScore from "../StarScore/StarScore";
import getRatingText from "../../../utils/getRatingText";

interface StarFormProps {
  initialRating: number;
  onRatingChange?: (rating: number) => void;
}

export default function StarForm({
  initialRating = 0,
  onRatingChange,
}: StarFormProps) {
  const { onToggle, isActive } = useToggle(true);

  const [rating, setRating] = useState(initialRating);

  const handleClick = (selectRating: number) => {
    const newRating = selectRating === rating ? 0 : selectRating;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
    return newRating;
  };

  return (
    <div className={styles.star_form}>
      <span className={styles.desc_container}>
        <span>
          <StarTag rating={rating} />
          {rating === 0 ? (
            <p className={styles.description_not_selected}>
              공연에 대한 평가를 남겨보세요.
            </p>
          ) : (
            <p className={styles.description}>{getRatingText(rating)}</p>
          )}
        </span>
        {isActive ? (
          <Button
            label='펼치기'
            onClick={onToggle}
            iconOnly={<ArrowUpIcon />}
          />
        ) : (
          <Button
            label='접기'
            onClick={onToggle}
            iconOnly={<ArrowDownIcon />}
          />
        )}
      </span>

      {isActive ? (
        <div className={styles.starScore}>
          <StarScore handleClick={handleClick} rating={rating} />
        </div>
      ) : null}
    </div>
  );
}
