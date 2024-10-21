import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.scss";
import StarScoreOnlyIcon from "../../components/common/StarScoreOnlyIcon/StarScoreOnlyIcon";

import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import useGetReviewList from "../../hooks/useGetReviewList";
import ImageSlider from "../../components/common/ImageGallery/ImageSlider";
import GenreButtons from "../../components/common/GenreButtons/GenreButtons";

interface MainReviewType {
  concert: {
    id: string;
    title: string;
    poster: string;
  };
  reviews: { id: string; contents: string; nickname: string; rating: number }[];
}

export default function Main() {
  const {
    reviewList: popularReviewList,
    isLoading: isPopularReviewListLoading,
    error: popularReviewListError,
  } = useGetReviewList({ criteria: "likeCount", pageName: "Main(likeCount)" });

  const {
    reviewList: mainShowingReviewList,
    isLoading: isMainShowingReviewListLoading,
    error: mainShowingReviewListError,
  } = useGetReviewList({ criteria: "rating", pageName: "Main(rating)" });

  const [mainReviews, setMainReviews] = useState<MainReviewType[]>([]);
  const [currentPosterIndex, setCurrentPosterIndex] = useState<number>(0);

  useEffect(() => {
    if (
      !mainShowingReviewListError &&
      !isMainShowingReviewListLoading &&
      mainShowingReviewList
    ) {
      const newReviews: MainReviewType[] = [];

      mainShowingReviewList.forEach((review) => {
        const concertId = review.concert.id;
        const existingReviewId = newReviews.findIndex(
          (r) => r.concert.id === concertId
        );

        if (existingReviewId !== -1) {
          // 이미 존재하는 공연일 경우
          // 그 인덱스에 추가
          newReviews[existingReviewId].reviews.push({
            id: review.reviewId,
            contents: review.contents,
            nickname: review.author.nickname,
            rating: review.rating || 0,
          });
        } else {
          // 새로운 공연
          newReviews.push({
            concert: {
              id: concertId,
              title: review.concert.title,
              poster: review.concert.poster,
            },
            reviews: [
              {
                id: review.reviewId,
                contents: review.contents,
                nickname: review.author.nickname,
                rating: review.rating || 0,
              },
            ],
          });
        }
      });

      setMainReviews(newReviews);
    }
  }, [isMainShowingReviewListLoading, mainShowingReviewList]);

  return (
    <section className={styles.main}>
      <h2 className='sr_only'>메인</h2>

      {mainReviews &&
        mainReviews.length > 0 &&
        mainReviews[currentPosterIndex] && (
          <>
            <div className={styles.star}>
              {/* 평균 평점 */}
              <StarScoreOnlyIcon
                primary
                rating={
                  mainReviews[currentPosterIndex].reviews.length > 0
                    ? mainReviews[currentPosterIndex].reviews.reduce(
                        (acc, cur) => acc + cur.rating,
                        0
                      ) / mainReviews[currentPosterIndex].reviews.length
                    : 0
                }
              />
            </div>
            <div className={styles.wrapper_concert_title}>
              <h3 className={styles.main_showing_concert_title}>
                {mainReviews[currentPosterIndex].concert.title}
              </h3>
            </div>
          </>
        )}
      {isMainShowingReviewListLoading ? (
        <LoadingSpinner />
      ) : (
        <ImageSlider
          images={mainReviews.map((reviews) => reviews.concert)}
          setCurrentPosterIndex={setCurrentPosterIndex}
        />
      )}

      <div className={styles.wrapper_main_showing}>
        <div className={styles.main_showing_concert_reviews}>
          {mainReviews &&
          mainReviews.length > 0 &&
          mainReviews[currentPosterIndex]
            ? mainReviews[currentPosterIndex].reviews
                .slice(0, 2)
                .map((review) => (
                  <Link
                    to={`/review/${review.id}`}
                    key={review.contents}
                    className={styles.reviews}
                  >
                    <blockquote
                      id={`review-${review.id}`}
                      className={styles.review}
                    >
                      {review.contents}
                    </blockquote>
                    <cite
                      id={`review-author-${review.id}`}
                      className={styles.nickname}
                      aria-labelledby={`review-${review.id} review-author-${review.id}`}
                    >
                      {review.nickname}
                    </cite>
                  </Link>
                ))
            : null}
        </div>
      </div>

      <GenreButtons />
      <div className={styles.share_your_experience}>
        최근 관람한 공연이 있나요?
        <br />
        후기를 공유하고 감동을 나눠보세요!
      </div>
      {isPopularReviewListLoading && <LoadingSpinner />}
      {popularReviewListError && (
        <p className={styles.error}>리뷰를 불러오는 중 문제가 발생했습니다.</p>
      )}
      {popularReviewList &&
        popularReviewList.map((review) => (
          <ReviewCard
            key={review.reviewId}
            title={review.concert.title}
            nickname={review.author.nickname}
            profileImage={review.author.profileImage}
            likeCount={review.likeCount}
            userId={review.author.id}
            content={review.contents}
            thumbnail={review.images ? review.images[0] : undefined}
            reviewLink={`/review/${review.reviewId}`}
          />
        ))}
    </section>
  );
}
