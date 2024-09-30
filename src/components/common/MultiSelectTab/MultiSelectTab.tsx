import React from "react";
import styles from "./MultiSelectTab.module.scss";
import TabButton from "./TabButton";

export default function MultiSelectTab() {
  return (
    <div className={`${styles.container}`}>
      <TabButton label='뮤지컬' />
      <TabButton label='연극' />
      <TabButton label='콘서트' />
      <TabButton label='클래식' />
      <TabButton label='가족/아동' />
      <TabButton label='오페라' />
    </div>
  );
}
