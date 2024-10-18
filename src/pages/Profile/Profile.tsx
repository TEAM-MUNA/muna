import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import useProfile from "../../hooks/useProfile";
import { getConcertsForBookmarkList } from "../../api/firebase/concertAPI";
import emptyMessages from "../../utils/constants/emptyMessages";
import { useRequestContext } from "../../context/RequestContext";

import styles from "./Profile.module.scss";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import Avatar from "../../components/common/Avatar/Avatar";
import Button from "../../components/common/Button/Button";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import QueueListIcon from "../../assets/svg/QueueListIcon";
import GalleryIcon from "../../assets/svg/GalleryIcon";
import Tab from "../../components/common/Tab/Tab";
// import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import PosterCard from "../../components/common/PosterCard/PosterCard";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import ReviewGalleryCard from "../../components/common/ReviewGalleryCard/ReviewGalleryCard";

function BookmarkList() {
  const { incrementRequestCount } = useRequestContext();

  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const [bookmarkedConcerts, setBookmarkedConcerts] = useState<
    { concertId: string; title: string; poster: string }[]
  >([]);

  // 1. 유저의 북마크 콘서트 아이디 배열 가져오기
  const bookmarkedConcertsId = useCurrentUser().bookmarkedConcerts;
  console.log(bookmarkedConcertsId);

  useEffect(() => {
    const fetchBookmarks = async () => {
      // API 요청을 보낼 때마다 요청 수 추적
      incrementRequestCount("Profile fetchBookmarks");

      try {
        if (userId) {
          // 2. 북마크 콘서트의 title과 poster 가져오기
          if (bookmarkedConcertsId && bookmarkedConcertsId.length > 0) {
            const bookmarkedConcertData =
              await getConcertsForBookmarkList(bookmarkedConcertsId);
            setBookmarkedConcerts(Object.values(bookmarkedConcertData));
          }
        }
      } catch (error) {
        console.error("북마크 데이터 가져오기 실패:", error);
      }
    };
    fetchBookmarks();
    console.log(bookmarkedConcerts);
  }, [userId, bookmarkedConcertsId]);

  // const concertStateSelectOptions = ["공연전체", "진행중", "진행완료"];
  // const concertOrderSelectOptions = ["최신순", "북마크순"];
  // const handleConcertDropdownSelect = () => {};

  if (bookmarkedConcerts.length > 0) {
    return (
      <>
        {/* <div className={styles.wrapper_dropdown}>
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
          </div> */}
        <ul>
          {bookmarkedConcerts.reverse().map((i) => (
            <li key={i.concertId}>
              <PosterCard
                concertId={i.concertId}
                title={i.title}
                poster={i.poster}
                bookmarkInteractive
                pageName='Profile'
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
  return (
    // TODO: 비어있을때 UI
    <div className='empty'>
      <p>{emptyMessages.profileMyBookmark}</p>
      <div className='wrapper_btn'>
        <Button
          label='모든 공연 보기'
          size='md'
          color='default'
          onClick={() => navigate("/concert")}
        />
      </div>
    </div>
  );
}

function ReviewList({ activeView }: { activeView: "list" | "grid" }) {
  // getUserReviewIds;

  // const reviewOrderSelectOptions = ["최신순", "인기순"];
  // const handleReviewDropdownSelect = () => {};

  if (activeView === "list") {
    return (
      <section className={`${styles.tab_content} ${styles.review_list}`}>
        {/* <div className='wrapper_dropdown_noline'>
            <DropdownSelect
              onSelect={handleReviewDropdownSelect}
              options={reviewOrderSelectOptions}
              outline={false}
              position='right'
            />
          </div> */}
        <ul>
          <li>
            <ReviewCard reviewLink='#' />
          </li>
        </ul>
      </section>
    );
  }

  return (
    <section className={`${styles.tab_content} ${styles.review_gallery}`}>
      <ul>
        <li>
          <ReviewGalleryCard reviewLink='#' hasMultiImages />
        </li>
      </ul>
    </section>
  );
}

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const currentUserId = useCurrentUser().userId;
  const { profile, isLoading } = useProfile(userId);
  const [isMine, setIsMine] = useState<boolean>(false);
  const [tabTitle, setTabTitle] = useState<[string, number | null][]>([
    ["북마크한 공연", null],
    ["나의 후기", 10],
  ]);

  useEffect(() => {
    const isProfileOwner = userId === currentUserId;
    setIsMine(isProfileOwner);

    const newTabTitle: [string, number | null][] = isProfileOwner
      ? [
          ["북마크한 공연", null],
          ["나의 후기", 10],
        ]
      : [[`${profile?.nickname ?? ""}님의 후기`, 10]];
    setTabTitle(newTabTitle);
  }, [userId, currentUserId, profile?.nickname]);

  const tabList = useMemo<[string, number | null][]>(
    () => tabTitle,
    [tabTitle]
  );

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeView, setActiveView] = useState<"list" | "grid">("list");
  const handleTabChanged = (index: number) => {
    if (tabTitle.length === 1) {
      setActiveTab(0);
    } else {
      setActiveTab(index);
    }
  };
  const handleViewButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = e.currentTarget.id;
    setActiveView(targetId === "listView" ? "list" : "grid");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!profile) {
    // TODO: 리다이렉트 처리할지?
    return <p>Error: 존재하지 않는 회원</p>;
  }
  return (
    <div>
      <h1 className='sr_only'>
        {profile && profile.nickname}님의 프로필페이지
      </h1>
      <article className={styles.top}>
        <Avatar
          nickname={profile.nickname || undefined}
          userId={userId}
          profileImage={profile.profileImage || undefined}
          size='lg'
        />
        {isMine && (
          <Link to='/settings'>
            <Button label='프로필 설정' iconOnly={<SettingsIcon />} />
          </Link>
        )}
      </article>
      <nav className={styles.wrapper_tab}>
        <Tab tabList={tabList} withNumber onTabChanged={handleTabChanged} />
        {(activeTab === 1 || !isMine) && (
          <div className={styles.wrapper_btn}>
            <Button
              id='listView'
              label='리스트 보기'
              iconOnly={<QueueListIcon />}
              onClick={handleViewButton}
              className={
                activeView === "list" ? "text_black" : "text_black_lighter"
              }
            />
            <Button
              id='galleryView'
              label='갤러리 보기'
              iconOnly={<GalleryIcon />}
              onClick={handleViewButton}
              className={
                activeView === "grid" ? "text_black" : "text_black_lighter"
              }
            />
          </div>
        )}
      </nav>
      {activeTab === 0 && isMine && (
        <section className={`${styles.tab_content} ${styles.concert_bookmark}`}>
          <BookmarkList />
        </section>
      )}
      {(activeTab === 1 || !isMine) && <ReviewList activeView={activeView} />}
    </div>
  );
}
