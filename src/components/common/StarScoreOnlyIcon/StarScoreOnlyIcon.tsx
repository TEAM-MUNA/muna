import React from "react";
import StarIcon from "../../../assets/svg/StarIcon";

export default function StarScoreOnlyIcon({ rating }: { rating: number }) {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon key={starValue} active={starValue <= rating} size='20' />
        );
      })}
    </div>
  );
}
