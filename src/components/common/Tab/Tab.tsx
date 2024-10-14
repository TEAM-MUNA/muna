import React, { useEffect, useState } from "react";
import styles from "./Tab.module.scss";
import Tag from "../Tag/Tag";

interface TabProps {
  tabList?: (string | [string, number | null])[];
  withNumber?: boolean;
  onTabChanged?: (index: number) => void;
}

export default function Tab({
  tabList = [],
  withNumber = false,
  onTabChanged,
}: TabProps) {
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
  }, [tabList]);

  const onClick = (index: number) => {
    setActiveList((prev) => prev.map((_, i) => i === index));
    // onTabChanged(index);

    // 클릭한 요소
    const selectedItem = tabTitleList[index][0];
    console.log(selectedItem);

    // 부모 컴포넌트로 선택된 탭 정보 전달
    if (onTabChanged) {
      onTabChanged(index);
    }
  };

  return (
    <div className={styles.tab_container}>
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
      </ul>
    </div>
  );
}
