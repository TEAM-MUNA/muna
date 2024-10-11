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
import {
  bookmarkConcertToFirebase,
  getConcertFromFirebase,
} from "../../api/concertAPI";
import useCurrentUser from "../../hooks/useCurrentUser";
import ConcertList from "../ConcertList/ConcertList";

export default function ConcertDetail() {
  const { id } = useParams<{ id: string }>();

  // TODO: 애초에 불러올 때 북마크 여부 판단해야됨
  const { concertDetail, isLoading, error } = useGetConcertDetail(id);

  const { isActive: isBookmarked, onToggle: onBookmarkToggle } =
    useToggle(false);
  const { userId } = useCurrentUser();

  const fetchDetail = async () => {
    const res = await getConcertFromFirebase("PF250702");
    console.log(res);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error("공연 상세 정보를 불러오지 못했습니다.");
    }
  }, [error]);

  if (!id) {
    return <ConcertList />;
  }

  if (isLoading) {
    return <HeartSpinner />;
  }

  // 북마크 토글
  const handleBookmark = async () => {
    // 아이디 매칭해서 그거에다가 북마크 하나 업데이트하기
    if (userId) {
      try {
        await bookmarkConcertToFirebase(userId, id, isBookmarked);
      } catch (e) {
        console.error(e);
        toast.error("북마크를 추가하지 못했습니다.");
      }
      onBookmarkToggle();
    } else {
      // TODO: 로그인 페이지로 이동 등 처리 필요
      toast.error("로그인 후 이용 가능합니다.");
    }
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
