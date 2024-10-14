import React, { useEffect, useState } from "react";
import { HeartSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { bookmarkConcertAsync } from "../../slices/interactionSlice";
import styles from "./ConcertDetail.module.scss";
import Tag from "../../components/common/Tag/Tag";
import Button from "../../components/common/Button/Button";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";
import CalendarIcon from "../../assets/svg/CalendarIcon";
import LocationIcon from "../../assets/svg/LocationIcon";
import useGetConcertDetail from "../../hooks/useGetConcertDetail";
import useToggle from "../../hooks/useToggle";
import useCurrentUser from "../../hooks/useCurrentUser";
import ConcertList from "../ConcertList/ConcertList";
import Tab from "../../components/common/Tab/Tab";
import useGetReviewList from "../../hooks/useGetReviewList";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";

export default function ConcertDetail() {
  const { id: concertId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [tabIndex, setTabIndex] = useState<number>(0);

  // TODO: 애초에 불러올 때 북마크 여부 판단해야됨
  const {
    concertDetail,
    isLoading: isConertDetailLoading,
    error: concertDetailError,
  } = useGetConcertDetail(concertId); // kopis
  const {
    reviewList,
    isLoading: isReviewListLoading,
    error: reviewListError,
  } = useGetReviewList(concertId);
  const { isActive: isBookmarked, onToggle: onBookmarkToggle } =
    useToggle(false);
  const { userId } = useCurrentUser();

  useEffect(() => {
    if (concertDetailError) {
      toast.error("공연 상세 정보를 불러오지 못했습니다.");
    }
  }, [concertDetailError]);

  useEffect(() => {
    if (!isReviewListLoading) {
      console.log(reviewList);
    }
  }, [isReviewListLoading]);

  if (!concertId) {
    return <ConcertList />;
  }

  if (isConertDetailLoading) {
    return <HeartSpinner />;
  }

  // 북마크 토글
  const handleBookmark = async () => {
    if (userId) {
      onBookmarkToggle();
      try {
        await dispatch(
          bookmarkConcertAsync({ userId, concertId, cancel: isBookmarked })
        ).unwrap();

        toast.success(
          !isBookmarked ? "북마크에 추가되었습니다." : "북마크를 해제했습니다."
        );
      } catch (e) {
        console.error(e);
        onBookmarkToggle(); // 북마크 해제
        toast.error("북마크에 추가하지 못했습니다.");
      }
    } else {
      // TODO: 로그인 페이지로 이동 등 처리 필요
      toast.error("로그인 후 이용 가능합니다.");
    }
  };

  const handleTab = (index: number) => {
    setTabIndex(index);
  };

  if (concertDetail) {
    return (
      <section className={styles.concert_detail}>
        <Toaster />
        <h2 className='sr_only'>공연 상세</h2>
        <small className={styles.info_update}>
          본 정보는 주최 측의 사정에 따라 변경될 수 있음. 최종 업데이트{" "}
          {concertDetail.updatedate}
        </small>

        <div className={styles.details}>
          <img
            className={styles.poster}
            width={108}
            src={concertDetail.poster}
            alt='/'
          />
          <div className={styles.info}>
            <Button
              className={styles.bookmark}
              iconOnly={<BookmarkIcon active={isBookmarked} />}
              label='북마크'
              onClick={handleBookmark}
            />
            <span className={styles.booking_info}>
              <span>
                <Tag label={concertDetail.prfstate} color='white' />
              </span>
              {/* <span>예매율</span> */}
            </span>
            <p className={styles.title}>
              {concertDetail.genrenm} &lt;{concertDetail.prfnm}&gt;
            </p>
            <span className={styles.rating}>
              <div className={styles.star_score} />
              <p className={styles.rating_text}>평점 8.0</p>
            </span>

            <div>
              <p className={styles.concert_info}>
                {concertDetail.genrenm} | {concertDetail.prfruntime} |{" "}
                {concertDetail.prfage}
              </p>
              <Button
                className={styles.booking_button}
                size='sm'
                color='default'
                label='예매하러 가기'
              />
            </div>
          </div>
        </div>
        <div className={styles.date_location}>
          <span className={styles.icon_text_container}>
            <CalendarIcon width={16} />
            <p>
              {concertDetail.prfpdfrom} ~ {concertDetail.prfpdto}
            </p>
          </span>
          <span className={styles.icon_text_container}>
            <LocationIcon width={16} />
            <p>
              {concertDetail.area} | {concertDetail.fcltynm}
            </p>
          </span>
        </div>
        <div className={styles.tab_section}>
          <Tab
            onTabChanged={handleTab}
            tabList={[
              ["후기", reviewList?.length || 0],
              ["공연정보", null],
            ]}
            withNumber
          />
          <Button
            className={styles.write_review}
            color='primary_line'
            size='sm'
            label='후기 작성하기'
          />
        </div>
        {tabIndex === 0 ? (
          <article className={styles.reviews}>
            {isReviewListLoading && <HeartSpinner />}
            {!isReviewListLoading && reviewListError && (
              <p>리뷰를 불러오는 중 오류가 발생했습니다.</p>
            )}
            {!isReviewListLoading &&
              !reviewListError &&
              reviewList &&
              reviewList.length > 0 &&
              reviewList.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  profileImage={review.author.profileImage}
                  nickname={review.author.nickname}
                  userId={review.author.id}
                  title='제목'
                  content={review.contents}
                  likeCount={review.likedBy?.length || 0}
                  date={review.createdAt}
                  starRate={review.rating?.toString()}
                />
              ))}
            {!isReviewListLoading &&
              !reviewListError &&
              (!reviewList || reviewList.length === 0) && (
                <p>리뷰가 존재하지 않습니다.</p>
              )}
          </article>
        ) : (
          <article className={styles.more_info}>
            <h3 className='sr_only'>공연 추가 정보</h3>
            <dl>
              <dt className={styles.label}>공연시간</dt>
              <dd className={styles.detail}>{concertDetail.dtguidance}</dd>

              <dt className={styles.label}>출연진</dt>
              <dd className={styles.detail}>{concertDetail.prfcast}</dd>

              <dt className={styles.label}>제작사</dt>
              <dd className={styles.detail}>{concertDetail.entrpsnm}</dd>

              <dt className='sr_only'>공연 사진</dt>
              <dd className={styles.poster}>
                <img src={concertDetail.poster} alt={concertDetail.prfnm} />
              </dd>

              <dt className={styles.label}>장소</dt>
              <dd className={styles.detail}>{concertDetail.fcltynm}</dd>
            </dl>
          </article>
        )}
      </section>
    );
  }

  return null;
}
