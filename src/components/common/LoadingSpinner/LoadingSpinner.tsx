import React from "react";
import { HeartSpinner } from "react-spinners-kit";
import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.center}>
      {/* 100% */}
      {/* <HeartSpinner size={40} color='#7926ff' /> */}
      {/* 60% */}
      {/* <HeartSpinner size={40} color='#af7dff' /> */}
      {/* 40% */}
      <HeartSpinner size={40} color='#c9a8ff' />
    </div>
  );
}
