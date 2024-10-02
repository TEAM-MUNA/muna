import React from "react";
import styles from "./StarTag.module.scss";
import StarIcon from "../../../assets/svg/StarIcon";

interface StarTagProps {
  rating?: number;
}

export default function StarTag({ rating = 0 }: StarTagProps) {
  const fixedRating = rating.toFixed(1);

  return (
    <div className={styles.container}>
      {rating ? (
        <>
          <StarIcon size='14px' active />
          <div>{fixedRating}</div>
        </>
      ) : (
        <StarIcon size='12.84px' />
      )}
    </div>
  );
}
