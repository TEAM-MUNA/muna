import React from "react";
import styles from "./Main.module.scss";
import poster1 from "../../assets/img/temp-poster1.png";
import poster2 from "../../assets/img/temp-poster2.png";
import poster3 from "../../assets/img/temp-poster3.png";

export default function Main() {
  const mainShowingConcertTitle = "랭보";
  const mainShowingConcertGenre = "뮤지컬";

  return (
    <section className={styles.main}>
      <h2 className='sr_only'>메인</h2>
      <div className={styles.star}>별</div>
      <p className={styles.main_showing_concert_title}>
        {mainShowingConcertGenre} &lt;{mainShowingConcertTitle}&gt;
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
      <div className={styles.category_nav}>button</div>
      
    </section>
  );
}
