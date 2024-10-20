import React from "react";
import styles from "./StarTag.module.scss";
import StarIcon from "../../../assets/svg/StarIcon";

interface StarTagProps {
  rating: number | undefined;
}

function StarTag({ rating }: StarTagProps) {
  let fixedRating = "0.0";
  if (typeof rating === "number") {
    fixedRating = rating.toFixed(1);
  }

  return (
    <div className={styles.star_tag}>
      <StarIcon />
      <span>{fixedRating}</span>
    </div>
  );
}

export default StarTag;
