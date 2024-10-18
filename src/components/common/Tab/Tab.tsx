import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Tab.module.scss";
import Tag from "../Tag/Tag";

interface TabProps {
  tabList?: (string | [string, number | null])[];
  withNumber?: boolean;
  onTabChanged?: (index: number) => void;
  selectedIndex?: number; // selectedIndex 속성 추가
  children?: ReactNode;
}

export default function Tab({
  tabList = [],
  withNumber = false,
  onTabChanged,
  selectedIndex, // selectedIndex 추가
  children,
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

    setTabTitleList(temp);

    // selectedIndex가 존재 하면 해당 인덱스에 값이 있도록 함
    const initialIndex = selectedIndex !== undefined ? selectedIndex : 0;

    setActiveList(
      new Array(temp.length)
        .fill(false)
        .fill(true, initialIndex, initialIndex + 1)
    );
  }, [tabList, selectedIndex]);

  const onClick = (index: number) => {
    setActiveList((prev) => prev.map((_, i) => i === index));

    // 부모 컴포넌트로 선택된 탭 정보 전달
    if (onTabChanged) {
      onTabChanged(index);
    }
  };

  return (
    <div className={styles.tab_container}>
      <div className={styles.tab_inner_container}>
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
        {children}
      </div>
    </div>
  );
}
