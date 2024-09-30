import React, { useEffect, useState } from "react";
import styles from "./Tab.module.scss";
import Tag from "../Tag/Tag";

interface TabProps {
  tabList?: (string | [string, number | null])[];
  withNumber?: boolean;
}

export default function Tab({ tabList = [], withNumber = false }: TabProps) {
  const [activeList, setActiveList] = useState<boolean[]>([]);
  const [tabTitleList, setTabTitleList] = useState<[string, number | null][]>(
    []
  );

  useEffect(() => {
    let temp: [string, number | null][] = [];

    if (withNumber) {
      temp = tabList as [string, number | null][];
    } else {
      temp = (tabList as string[]).map((item) => [item, null]);
    }

    setActiveList(new Array(temp.length).fill(false).fill(true, 0, 1));
    setTabTitleList(temp);
  }, []);

  const onClick = (index: number) => {
    setActiveList((prev) => prev.map((_, i) => i === index));

    // 클릭한 요소
    const selectedItem = tabTitleList[index][0];
    console.log(selectedItem);
  };

  return (
    <ul className={styles.tab}>
      {tabTitleList.map(([title, number], index) => (
        <li key={title}>
          <button
            type='button'
            className={activeList[index] ? styles.active : ""}
            onClick={() => onClick(index)}
          >
            {title}
            {number !== null && (
              <Tag color='default' label={number.toString()} />
            )}
          </button>
        </li>
      ))}

      <div className={styles.line} />
    </ul>
  );
}
