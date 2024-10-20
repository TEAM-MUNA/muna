import React from "react";
import Button from "../../components/common/Button/Button";
import styles from "./RecentSearchList.module.scss";
import CloseIcon from "../../assets/svg/CloseIcon";

type RecentSearch = {
  query: string;
  date: number;
};

interface RecentSearchListProps {
  recentQueries: RecentSearch[];
  onQueryClick: (keyword: string) => void;
  onQueryRemove: (queryToRemove: string) => void;
}

function RecentSearchList({
  recentQueries,
  onQueryClick,
  onQueryRemove,
}: RecentSearchListProps) {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}.${day}`;
  };

  return (
    <div>
      <h2 className={styles.h2}>최근 검색어</h2>
      <ul className={styles.recentSearchList}>
        {recentQueries.map((item) => (
          <li key={item.query} className={styles.recentSearchItem}>
            <Button
              label={item.query}
              onClick={() => onQueryClick(item.query)}
            />
            <div className={styles.searchInfo}>
              <span>{formatDate(item.date)}</span>
              <Button
                label=''
                onClick={() => onQueryRemove(item.query)}
                iconOnly={<CloseIcon size='18' />}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSearchList;
