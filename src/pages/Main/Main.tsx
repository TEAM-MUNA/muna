import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartSpinner } from "react-spinners-kit";
import styles from "./Main.module.scss";
import poster1 from "../../assets/img/temp-poster1.png";
import poster2 from "../../assets/img/temp-poster2.png";
import poster3 from "../../assets/img/temp-poster3.png";
import StarScoreOnlyIcon from "../../components/common/StarScoreOnlyIcon/StarScoreOnlyIcon";
import Button from "../../components/common/Button/Button";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import { genreMap } from "../../utils/constants/genreData";
import useGetReviewList from "../../hooks/useGetReviewList";
import ImageSlider, {
  SliderPosterType,
} from "../../components/common/ImageGallery/ImageSlider";

interface MainReviewType {
  concert: {
    id: string; // 중복 x
    title: string;
    poster: string;
  };
  reviews: { contents: string; nickname: string }[];
}

export default function Main() {
  const mainShowingConcertTitle = "랭보";
  const navigate = useNavigate();
  const {
    reviewList: popularReviewList,
    isLoading: isPopularReviewListLoading,
    error: popularReviewListError,
  } = useGetReviewList({ criteria: "likeCount" });

  // 로딩중인 다른 이미지
  const defaultImages: SliderPosterType[] = [
    {
      id: "1",
      poster: poster1,
      title: "포스터 1",
    },
    {
      id: "2",
      poster: poster2,
      title: "포스터 2",
    },
    {
      id: "3",
      poster: poster3,
      title: "포스터 3",
    },
  ];

  const {
    reviewList: mainShowingReviewList,
    isLoading: isMainShowingReviewListLoading,
    error: mainShowingReviewListError,
  } = useGetReviewList({ criteria: "rating" });

  const [mainReviews, setMainReviews] = useState<MainReviewType[]>([]);
  const [currentPosterIndex, setCurrentPosterIndex] = useState<number>(0);

  useEffect(() => {
    if (!isMainShowingReviewListLoading && mainShowingReviewList) {
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
            contents: review.contents,
            nickname: review.author.nickname,
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
                contents: review.contents,
                nickname: review.author.nickname,
              },
            ],
          });
        }
      });

      setMainReviews(newReviews);
    }
  }, [isMainShowingReviewListLoading, mainShowingReviewList]);

  useEffect(() => {
    console.log("currentPosterIndex", currentPosterIndex, mainReviews);
  }, [currentPosterIndex]);

  const goToConcertList = (code: string) => {
    const navigateUrl =
      code.length === 0 ? `/concert` : `/concert?genre=${code}`;
    navigate(navigateUrl);
  };

  return (
    <section className={styles.main}>
      <h2 className='sr_only'>메인</h2>
      <div className={styles.star}>
        <StarScoreOnlyIcon primary rating={5} />
      </div>
      <p className={styles.main_showing_concert_title}>
        {mainReviews &&
          mainReviews.length > 0 &&
          mainReviews[currentPosterIndex] &&
          mainReviews[currentPosterIndex].concert.title}
      </p>
      {isMainShowingReviewListLoading ? (
        <div className={styles.loading_imageSlider}>
          <HeartSpinner size={40} color='#c9a8ff' />
        </div>
      ) : (
        <ImageSlider
          images={
            // isMainShowingReviewListLoading
            //   ? defaultImages
            //   :
            mainReviews.map((reviews) => reviews.concert)
          }
          setCurrentPosterIndex={setCurrentPosterIndex}
        />
      )}

      <div className={styles.main_showing_concert_reviews}>
        {/* TODO: 반복문 사용 */}
        {mainReviews &&
        mainReviews.length > 0 &&
        mainReviews[currentPosterIndex]
          ? mainReviews[currentPosterIndex].reviews.map((review) => (
              <div key={review.contents}>
                <blockquote id='review1' className={styles.review}>
                  {review.contents}
                </blockquote>
                <cite
                  id='nickname1'
                  className={styles.nickname}
                  aria-labelledby='review1'
                >
                  {review.nickname}
                </cite>
              </div>
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
          />
        ))}
    </section>
  );
}
