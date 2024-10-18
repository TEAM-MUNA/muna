import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartSpinner } from "react-spinners-kit";
import styles from "./Main.module.scss";
import StarScoreOnlyIcon from "../../components/common/StarScoreOnlyIcon/StarScoreOnlyIcon";
import Button from "../../components/common/Button/Button";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import { genreMap } from "../../utils/constants/genreData";
import useGetReviewList from "../../hooks/useGetReviewList";
import ImageSlider from "../../components/common/ImageGallery/ImageSlider";

interface MainReviewType {
  concert: {
    id: string;
    title: string;
    poster: string;
  };
  reviews: { id: string; contents: string; nickname: string; rating: number }[];
}

export default function Main() {
  const navigate = useNavigate();
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

  const goToConcertList = (code: string) => {
    const navigateUrl =
      code.length === 0 ? `/concert` : `/concert?genre=${code}`;
    navigate(navigateUrl);
  };

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
            <p className={styles.main_showing_concert_title}>
              {mainReviews[currentPosterIndex].concert.title}
            </p>
          </>
        )}
      {isMainShowingReviewListLoading ? (
        <div className={styles.loading_imageSlider}>
          <HeartSpinner size={40} color='#c9a8ff' />
        </div>
      ) : (
        <ImageSlider
          images={mainReviews.map((reviews) => reviews.concert)}
          setCurrentPosterIndex={setCurrentPosterIndex}
        />
      )}

      <div className={styles.main_showing_concert_reviews}>
        {mainReviews &&
        mainReviews.length > 0 &&
        mainReviews[currentPosterIndex]
          ? mainReviews[currentPosterIndex].reviews.map((review) => (
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
      <div className={styles.category_nav}>
        {Object.entries(genreMap).map(([genre, code]) => (
          <Button
            key={code}
            label={genre === "전체" ? "모든 공연 보기" : genre}
            color='default'
            size='md'
            className={code === "" ? styles.fullWidth : ""}
            onClick={() => {
              goToConcertList(code);
            }}
          />
        ))}
      </div>
      <div className={styles.share_your_experience}>
        최근 관람한 공연이 있나요?
        <br />
        후기를 공유하고 감동을 나눠보세요!
      </div>
      {isPopularReviewListLoading && <HeartSpinner />}
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
