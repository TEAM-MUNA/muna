import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import Avatar from "../../components/common/Avatar/Avatar";
import Button from "../../components/common/Button/Button";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import QueueListIcon from "../../assets/svg/QueueListIcon";
import GalleryIcon from "../../assets/svg/GalleryIcon";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import PosterCard from "../../components/common/PosterCard/PosterCard";

import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import ReviewGalleryCard from "../../components/common/ReviewGalleryCard/ReviewGalleryCard";

export default function Profile() {
  const tabList: (string | [string, number | null])[] = [
    ["북마크한 공연", null],
    ["나의 후기", 10],
  ];
  const concertStateSelectOptions = ["공연전체", "진행중", "진행완료"];
  const concertOrderSelectOptions = ["최신순", "북마크순"];
  const reviewOrderSelectOptions = ["최신순", "인기순"];
  const handleDropdownSelect = () => {};

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeView, setActiveView] = useState<number>(0);
  const handleTabChanged = (index: number) => {
    setActiveTab(index);
  };
  const handleViewButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = e.currentTarget.id;
    setActiveView(targetId === "listView" ? 0 : 1);
  };

  return (
    <div>
      <h1 className='sr_only'>00님의 프로필페이지</h1>
      <article className={styles.top}>
        <Avatar size='lg' />
        <Button label='프로필 설정' iconOnly={<SettingsIcon />} />
      </article>
      <nav className={styles.wrapper_tab}>
        <Tab tabList={tabList} withNumber onTabChanged={handleTabChanged} />
        {activeTab === 1 && (
          <div className={styles.wrapper_btn}>
            <Button
              id='listView'
              label='리스트 보기'
              iconOnly={<QueueListIcon />}
              onClick={handleViewButton}
              className={activeView === 0 ? "text_black" : "text_black_lighter"}
            />
            <Button
              id='galleryView'
              label='갤러리 보기'
              iconOnly={<GalleryIcon />}
              onClick={handleViewButton}
              className={activeView === 1 ? "text_black" : "text_black_lighter"}
            />
          </div>
        )}
      </nav>
      {activeTab === 0 && (
        <section className={`${styles.tab_content} ${styles.concert_bookmark}`}>
          <DropdownSelect
            onSelect={handleDropdownSelect}
            options={concertStateSelectOptions}
          />
          <DropdownSelect
            onSelect={handleDropdownSelect}
            options={concertOrderSelectOptions}
          />
          <ul>
            <li>
              <PosterCard concertLink='#' isBookmarked />
            </li>
          </ul>
        </section>
      )}
      {activeTab === 1 && activeView === 0 && (
        <section className={`${styles.tab_content} ${styles.review_list}`}>
          <div className='wrapper_dropdown_noline'>
            <DropdownSelect
              onSelect={handleDropdownSelect}
              options={concertOrderSelectOptions}
              outline={false}
            />
          </div>
          <ul>
            <li>
              <ReviewCard reviewLink='#' page='profile' />
            </li>
          </ul>
        </section>
      )}
      {activeTab === 1 && activeView === 1 && (
        <section className={`${styles.tab_content} ${styles.review_gallery}`}>
          <ul>
            <li>
              <ReviewGalleryCard reviewLink='#' hasMultiImages />
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}
