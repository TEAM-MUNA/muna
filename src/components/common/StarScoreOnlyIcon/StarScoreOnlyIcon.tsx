import React from "react";
import StarIcon from "../../../assets/svg/StarIcon";
import styles from "./StarScoreOnlyIcon.module.scss";

type StarScoreOnlyIconProps = {
  rating: number | null;
  primary?: boolean;
};

export default function StarScoreOnlyIcon({
  rating,
  primary = false,
}: StarScoreOnlyIconProps) {
  const getClassName = () => {
    if (primary) {
      return styles.primary;
    }

    if (rating === null) {
      return styles.black_lighter;
    }

    return styles.black;
  };

  const className = getClassName();
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
