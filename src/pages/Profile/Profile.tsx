import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import useProfile from "../../hooks/useProfile";
import { getConcertsForBookmarkList } from "../../api/firebase/concertAPI";
import emptyMessages from "../../utils/constants/emptyMessages";
import { useRequestContext } from "../../context/RequestContext";

import { getReviewIdsByUserId } from "../../api/firebase/authAPI";
import { getReviewListById } from "../../api/firebase/reviewAPI";
import { ReviewListType } from "../../types/reviewType";
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
  const bookmarkedConcertsIds = useCurrentUser().bookmarkedConcerts;

  useEffect(() => {
    const fetchBookmarks = async () => {
      // API 요청을 보낼 때마다 요청 수 추적
      incrementRequestCount("Profile fetchBookmarks");

      try {
        if (userId) {
          // 2. 북마크 콘서트의 title과 poster 가져오기
          if (bookmarkedConcertsIds && bookmarkedConcertsIds.length > 0) {
            const bookmarkedConcertData = await getConcertsForBookmarkList(
              bookmarkedConcertsIds
            );
            setBookmarkedConcerts(
              Object.values(bookmarkedConcertData).reverse()
            );
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error("북마크 데이터 가져오기 실패:", error);
      }
    };
    fetchBookmarks();
  }, [userId, bookmarkedConcertsIds]);

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
          {bookmarkedConcerts.map((i) => (
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
  const navigate = useNavigate();
  const { incrementRequestCount } = useRequestContext();
  const currentUserId = useCurrentUser().userId;
  const { userId } = useParams<{ userId: string }>();
  const [reviews, setReviews] = useState<ReviewListType[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      // API 요청을 보낼 때마다 요청 수 추적
      incrementRequestCount("Profile fetchReviews");
      // try {
      if (userId) {
        // 1. 유저 아이디로 리뷰 아이디 배열 가져오기
        const reviewIds = (await getReviewIdsByUserId(userId)) || [];
        // 2. 리뷰 아이디 배열로 리뷰리스트에 필요한 데이터 가져오기
        const reviewData = (await getReviewListById(reviewIds)) || [];
        setReviews(reviewData.reverse());
      }
      // } catch (error) {
      //   console.error("리뷰 데이터 가져오기 실패:", error);
      // }
    };
    fetchReviews();
  }, [userId]);

  // const reviewOrderSelectOptions = ["최신순", "인기순"];
  // const handleReviewDropdownSelect = () => {};

  if (reviews.length === 0) {
    return (
      <div className='empty'>
        {currentUserId === userId ? (
          <>
            <p>{emptyMessages.profileMyReview}</p>
            <div className='wrapper_btn'>
              <Button
                label='모든 공연 보기'
                size='md'
                color='default'
                onClick={() => navigate("/concert")}
              />
            </div>
          </>
        ) : (
          <p>{emptyMessages.profileReview}</p>
        )}
      </div>
    );
  }

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
          {reviews.map((i) => (
            <li key={i.reviewId}>
              <ReviewCard
                hasAvatar={false}
                reviewLink={`/review/${i.reviewId}`}
                title={i.concert?.title || "제목 없음"}
                likeCount={i.likeCount}
                starRate={i.rating}
                thumbnail={i.thumbnail || ""}
                date={i.date}
                content={i.contentsPreview}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section className={`${styles.tab_content} ${styles.review_gallery}`}>
      <ul>
        {reviews.map((i) => (
          <li key={i.reviewId}>
            <ReviewGalleryCard
              reviewLink={`/review/${i.reviewId}`}
              title={i.concert?.title || "제목 없음"}
              thumbnail={i.thumbnail || ""}
              likeCount={i.likeCount}
              poster={i.concert?.poster}
              hasMultiImages
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const currentUserId = useCurrentUser().userId;
  const { profile, isLoading } = useProfile(userId);
  const [isMine, setIsMine] = useState<boolean>(false);

  const reviewCount = profile?.reviews?.length || 0;
  const [tabTitle, setTabTitle] = useState<[string, number | null][]>([
    ["북마크한 공연", null],
    ["나의 후기", null],
  ]);

  useEffect(() => {
    const isProfileOwner = userId === currentUserId;
    setIsMine(isProfileOwner);

    const newTabTitle: [string, number | null][] = isProfileOwner
      ? [
          ["북마크한 공연", null],
          ["나의 후기", reviewCount === 0 ? null : reviewCount],
        ]
      : [
          [
            `${profile?.nickname ?? ""}님의 후기`,
            reviewCount === 0 ? null : reviewCount,
          ],
        ];
    setTabTitle(newTabTitle);
  }, [profile, reviewCount, currentUserId]);

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
    // TODO: 404 페이지 or 토스트
    navigate("/");
    return null;
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
                activeView === "list" ? "text_primary" : "text_black_lighter"
              }
            />
            <Button
              id='galleryView'
              label='갤러리 보기'
              iconOnly={<GalleryIcon />}
              onClick={handleViewButton}
              className={
                activeView === "grid" ? "text_primary" : "text_black_lighter"
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
