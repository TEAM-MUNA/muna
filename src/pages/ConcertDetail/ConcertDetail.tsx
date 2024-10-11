import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeartSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import styles from "./ConcertDetail.module.scss";
import Tag from "../../components/common/Tag/Tag";
import Button from "../../components/common/Button/Button";
import BookmarkIcon from "../../assets/svg/BookmarkIcon";
import CalendarIcon from "../../assets/svg/CalendarIcon";
import LocationIcon from "../../assets/svg/LocationIcon";
import useGetConcertDetail from "../../hooks/useGetConcertDetail";
import useToggle from "../../hooks/useToggle";

export default function ConcertDetail() {
  const { id } = useParams<{ id: string | undefined }>();
  // PF132236

  const { concertDetail, isLoading, error } = useGetConcertDetail(id);
  const { isActive: isBookmarked, onToggle: onBookmarkToggle } =
    useToggle(false);

  const handleBookmark = () => {
    onBookmarkToggle();
  };

  useEffect(() => {
    if (error) {
      toast.error("공연 상세 정보를 불러오지 못했습니다.");
    }
  }, [error]);

  if (isLoading) {
    return <HeartSpinner />;
  }

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
            <div>
              <span className={styles.booking_info}>
                <span>
                  <Tag label={concertDetail.prfstate} color='white' />
                </span>
                <Button
                  className={styles.bookmark}
                  iconOnly={<BookmarkIcon active={isBookmarked} />}
                  label='북마크'
                  onClick={handleBookmark}
                />
              </span>
              <p className={styles.title}>
                {concertDetail.genrenm} &lt;{concertDetail.prfnm}&gt;
              </p>
              <span className={styles.rating}>
                <div className={styles.star_score} />
                <p className={styles.rating_text}>평점 8.0</p>
              </span>
            </div>
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
      </section>
    );
  }

  return null;
}
