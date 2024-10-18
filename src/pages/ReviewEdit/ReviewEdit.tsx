import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom"; // useLocation : 현재페이지의 주소(URL) 정보를 제공 / useParams : URL의 동적 파라미터를 키/값 객체로 반환
import useCurrentUser from "../../hooks/useCurrentUser"; // 사용자의 기본 정보 및 홈페이지에서 남긴 기록데이터를 가져옴
import styles from "./ReviewEdit.module.scss";
import Title from "../../components/common/Title/Title";
import CalendarInput from "../../components/common/CalendarInput/CalendarInput";
import StarForm from "../../components/common/StarForm/StarForm";
import useGetConcertDetail from "../../hooks/useGetConcertDetail";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import ReviewImageUploader from "../../components/common/ReviewImageUploader/ReviewImageUploader";
import { addReviewToFirebase } from "../../api/firebase/reviewAPI";
import { ReviewType } from "../../types/reviewType";

export default function ReviewEdit() {
  // 원래 있던 리뷰면 가져오기 (필요)
  // 원래 없던 새로운 리뷰면 새로 등록
  const location = useLocation();
  const { concertId } = location.state || {}; // 특정 콘서트의 concertId를 가져옴 (이전페이지에서 전달받은 concertId를 가져옴)
  const { userId, nickname, profileImage } = useCurrentUser(); // 로그인한 사용자의 userId를 가져옴
  const { id } = useParams<{ id: string }>(); // 리뷰 아이디
  const {
    concertDetail,
    isLoading: isConcertDetailLoading,
    error: concertDetailError,
  } = useGetConcertDetail(concertId); // 파이어베이스 통신 줄이기 위해 kopis에서 불러옴

  const [reviewImageList, setReviewImageList] = useState<string[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(undefined);

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReviewContent(value);
  };

  // // 오른쪽상단 체크아이콘 클릭시 저장
  const handleDone = async () => {
    // 리뷰 체크표시 클릭시 저장
    // 리뷰 업로드
    if (!id) {
      // 리뷰 없음.
      return;
    }
    if (!userId || !nickname) {
      // 유저 없음. 로그인 페이지로 이동 등
      return;
    }
    if (!concertDetail?.prfnm || !concertDetail?.poster) {
      // 콘서트 정보 없음
      return;
    }

    const newReview: ReviewType = {
      concert: {
        id: concertDetail.mt20id,
        title: concertDetail?.prfnm,
        poster: concertDetail?.poster,
      },
      reviewId: id, // review id
      author: {
        id: userId,
        nickname,
        profileImage: profileImage || undefined,
      },
      rating,
      date,
      createdAt: new Date().toISOString(), // 현재시간
      contents: reviewContent,
      images: reviewImageList, // firebase에 등록하고 가져와야함.
      likedBy: [], // 기본값
      likeCount: 0, // 기본값
    };

    try {
      const reviewId = await addReviewToFirebase(newReview);
      console.log(reviewId, "저장 완료");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.reviewEdit_form}>
      <h2 className='sr_only'>리뷰생성 및 수정</h2>
      <Title
        label='기록하기'
        buttonLeft='close'
        buttonRight='done'
        handleDoneButton={handleDone}
      />
      {!isConcertDetailLoading ? (
        <div className={styles.concert_date}>
          <div className={styles.concert_image}>
            <img src={concertDetail?.poster} alt={concertDetail?.prfnm} />
          </div>
          <div className={styles.concert_inner}>
            <p>
              <h3 className={styles.concert_title}>{concertDetail?.prfnm}</h3>
              <span className={styles.concert_genre}>
                {concertDetail?.genrenm}
              </span>
            </p>
            <CalendarInput
              onCalendarChange={(selectedDate) => {
                setDate(selectedDate);
              }}
            />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <div className={styles.star_form}>
        <StarForm
          initialRating={0}
          onRatingChange={(newRating) => {
            setRating(newRating);
          }}
        />
      </div>
      <ReviewImageUploader
        onImageChange={(imageUrls) => {
          setReviewImageList(imageUrls);
        }}
      />
      <label htmlFor='review-textarea'>
        <span className='sr_only'>리뷰 작성</span>
        <textarea
          id='review-textarea'
          className={styles.textarea}
          placeholder={`${concertDetail?.prfnm}에 대한 기록을 남겨보세요. (1,500자 이내)`}
          onChange={handleTextArea}
        />
      </label>
    </section>
  );
}
