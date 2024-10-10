import React from "react";
import styles from "./ConcertDetail.module.scss";
import src from "../../assets/img/temp-poster1.png";
import Tag from "../../components/common/Tag/Tag";
import Button from "../../components/common/Button/Button";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";
import CalendarIcon from "../../assets/svg/CalendarIcon";
import LocationIcon from "../../assets/svg/LocationIcon";
// import StarScore from "../../components/common/StarScore/StarScore";
export default function ConcertDetail() {
  const finalUpdateDate = "2024.09.13."; // string 말고 날짜형식으로 변경하기
  const bookingRate: number = 74.8;
  const genre = "뮤지컬";
  const title = "랭보";
  return (
    <section className={styles.concert_detail}>
      <h2 className='sr_only'>공연 상세</h2>
      <small className={styles.info_update}>
        본 정보는 주최 측의 사정에 따라 변경될 수 있음. 최종 업데이트{" "}
        {finalUpdateDate}
      </small>
      <div className={styles.details}>
        <img className={styles.poster} width={108} src={src} alt='/' />
        <div className={styles.info}>
          <div>
            <span className={styles.booking_info}>
              <span>
                <Tag label='공연중' color='white' />
                <p className={styles.booking_rate}>예매율 {bookingRate}%</p>
              </span>
              <BookmarkIcon active={false} />
            </span>
            <p className={styles.title}>
              {genre} &lt;{title}&gt;
            </p>
            <span className={styles.rating}>
              <div className={styles.star_score} />
              <p className={styles.rating_text}>평점 8.0</p>
              {/* <StarScore rating={4} /> */}
            </span>
          </div>
          <div>
            <p className={styles.concert_info}>
              {genre} | {120}분 | 12세 이상
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
        {/* TODO: 아이콘 모양 조금 다름 - 사이즈 */}
        <span className={styles.icon_text_container}>
          <CalendarIcon width={16} />
          <p>2024.07.12 ~ 2024.11.10</p>
        </span>
        <span className={styles.icon_text_container}>
          <LocationIcon width={16} />
          <p>서울 | 광림아트센터 BBCH홀</p>
        </span>
      </div>
    </section>
  );
}
