import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.scss";
import poster1 from "../../assets/img/temp-poster1.png";
import poster2 from "../../assets/img/temp-poster2.png";
import poster3 from "../../assets/img/temp-poster3.png";
import StarScoreOnlyIcon from "../../components/common/StarScoreOnlyIcon/StarScoreOnlyIcon";
import Button from "../../components/common/Button/Button";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import { genreMap } from "../../utils/constants/genreData";

export default function Main() {
  const mainShowingConcertTitle = "랭보";
  const navigate = useNavigate();

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
        {mainShowingConcertTitle}
      </p>
      <figure className={styles.main_showing_concert_posters}>
        <img src={poster1} alt='메인 인기 포스터1' width={182} />
        <img src={poster2} alt='메인 인기 포스터2' width={215} />
        <img src={poster3} alt='메인 인기 포스터3' width={182} />
      </figure>
      <div className={styles.main_showing_concert_reviews}>
        {/* TODO: 반복문 사용 */}
        <div>
          <blockquote id='review1' className={styles.review}>
            기대한것만큼 재밌습니다
          </blockquote>
          <cite
            id='nickname1'
            className={styles.nickname}
            aria-labelledby='review1'
          >
            abdc123
          </cite>
        </div>
        <div>
          <blockquote id='review2' className={styles.review}>
            시들이 하나하나 너무 아름답고 멜로디도 서정적이어서 아주 감명
            깊었습니다.
          </blockquote>
          <cite
            id='nickname2'
            className={styles.nickname}
            aria-labelledby='review2'
          >
            abdc123
          </cite>
        </div>
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
      <ReviewCard title='랭보' />
      <ReviewCard title='랭보' />
      <ReviewCard title='랭보' />
      <ReviewCard title='랭보' />
    </section>
  );
}
