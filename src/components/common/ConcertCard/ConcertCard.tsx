import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import StarIcon from "../../../assets/svg/StarIcon";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";
import ReviewIcon from "../../../assets/svg/ReviewIcon";
import {
  ConcertType,
  ConcertReturnType,
  DefaultConcertType,
} from "../../../types/concertType";
import { getConcertFromFirebase } from "../../../api/firebase/concertAPI";
import styles from "./ConcertCard.module.scss";

interface ConcertCardProps {
  concert?: ConcertReturnType; // Kopis API 응답 데이터
  fbConcert?: ConcertType; // Firebase 데이터
}

export default function ConcertCard({ concert, fbConcert }: ConcertCardProps) {
  // concert 혹은 fbConcert 중 하나가 필수로 존재해야 함
  const isConcert = !!concert;
  const isFbConcert = !!fbConcert;

  // ConcertReturnType일 경우 Firebase 데이터 추가로 가져오기
  const [fbData, setFbData] = useState<ConcertType>(DefaultConcertType);

  useEffect(() => {
    if (isConcert && concert) {
      const fetchFbData = async () => {
        const concertFromFirebase = (await getConcertFromFirebase(
          concert.mt20id
        )) as ConcertType;
        setFbData(concertFromFirebase);
      };
      fetchFbData();
    }
  }, [isConcert, concert]);

  // Firebase에서 가져온 데이터가 존재하면 fbConcert 대신 fbData 사용
  const poster = isConcert
    ? concert!.poster
    : fbConcert?.poster || fbData.poster;
  const title = isConcert ? concert!.prfnm : fbConcert?.title || fbData.title;
  const venue = isConcert ? concert!.fcltynm : fbConcert?.venue || fbData.venue;
  const startDate = isConcert
    ? concert!.prfpdfrom
    : fbConcert?.startDate || fbData.startDate;
  const endDate = isConcert
    ? concert!.prfpdto
    : fbConcert?.endDate || fbData.endDate;
  const state = isConcert
    ? concert!.prfstate
    : fbConcert?.state || fbData.state;

  return (
    <Link
      to={`/concert/${isConcert ? concert!.mt20id : fbConcert?.concertId || fbData.concertId}`}
      className={`${styles.concertCard} card_concert`}
    >
      <img className={styles.poster} src={poster} alt={title} />
      <div className={styles.info}>
        {state && <Tag label={state} color='white' />}
        <h3 className={styles.title}>{title}</h3>

        {(isFbConcert || fbData) && (
          <div className={styles.tag_container}>
            {(fbConcert?.averageRating || fbData.averageRating) && (
              <div className={styles.tag}>
                <StarIcon size='14' />
                <span>
                  {fbConcert?.averageRating || fbData.averageRating || null}
                </span>
              </div>
            )}
            {(fbConcert?.bookmarkedBy || fbData.bookmarkedBy || null) && (
              <div className={styles.tag}>
                <BookmarkIcon size='14' />
                <span>
                  {fbConcert?.bookmarkedBy?.length ||
                    fbData.bookmarkedBy?.length}
                </span>
              </div>
            )}
            {(fbConcert?.reviews || fbData.reviews || null) && (
              <div className={styles.tag}>
                <ReviewIcon size='14' />
                <span>
                  {fbConcert?.reviews?.length || fbData.reviews?.length}
                </span>
              </div>
            )}
          </div>
        )}

        <div className={styles.info_container}>
          <p>{venue}</p>
          <p>
            {startDate} ~ {endDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
