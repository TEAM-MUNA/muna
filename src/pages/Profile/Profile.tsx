import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import useProfile from "../../hooks/useProfile";

// 1. 현재 로그인한 사용자의 정보 불러오기 (화)
// ㄴ 상단 프로필
// ㄴ 북마크한 콘서트 - 제목, 이미지
// ㄴ 리뷰 - 공연제목, 썸네일, 복수 이미지 여부, 내용미리보기, 좋아요, 별점, 관람일
// * 주소에 따라 해당 유저 프로필이 보여야 함
// 2. 북마크 기능 (-목)
// ㄴ 북마크 버튼 누르면 해제 + 토스트 알림 (실행취소 버튼)
// 3. 필터와 정렬기능 - 여러페이지에서 중복사용됨 (-금)
// ㄴ 콘서트 - 공연상태, 지역 필터
// ㄴ 콘서트, 리뷰 - 순서 정렬

export default function Profile() {
  const { userId, nickname, profileImage } = useProfile();
  const tabList: (string | [string, number | null])[] = [
    ["북마크한 공연", null],
    ["나의 후기", 10],
  ];
  const concertStateSelectOptions = ["공연전체", "진행중", "진행완료"];
  const concertOrderSelectOptions = ["최신순", "북마크순"];
  const reviewOrderSelectOptions = ["최신순", "인기순"];
  const handleConcertDropdownSelect = () => {};
  const handleReviewDropdownSelect = () => {};

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
      <h1 className='sr_only'>{nickname}님의 프로필페이지</h1>
      <article className={styles.top}>
        <Avatar
          nickname={nickname || undefined}
          userId={userId}
          userImage={profileImage || undefined}
          size='lg'
          userLink={null}
        />
        <Link to='/settings'>
          <Button label='프로필 설정' iconOnly={<SettingsIcon />} />
        </Link>
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
          <div className={styles.wrapper_dropdown}>
            <DropdownSelect
              onSelect={handleConcertDropdownSelect}
              options={concertStateSelectOptions}
            />
            <DropdownSelect
              onSelect={handleConcertDropdownSelect}
              options={concertOrderSelectOptions}
            />
            <DropdownSelect
              onSelect={handleConcertDropdownSelect}
              options={concertOrderSelectOptions}
              position='right'
            />
          </div>
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
              onSelect={handleReviewDropdownSelect}
              options={reviewOrderSelectOptions}
              outline={false}
              position='right'
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
