import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import useCurrentUser from "../../hooks/useCurrentUser";
import styles from "./ReviewEdit.module.scss";
import Title from "../../components/common/Title/Title";
import CalendarInput from "../../components/common/CalendarInput/CalendarInput";
import StarForm from "../../components/common/StarForm/StarForm";
import useGetConcertDetail from "../../hooks/useGetConcertDetail";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import ReviewImageUploader from "../../components/common/ReviewImageUploader/ReviewImageUploader";
import { ReviewType } from "../../types/reviewType";
import { uploadReviewAsync } from "../../slices/interactionSlice";

export default function ReviewEdit() {
  // 원래 있던 리뷰면 가져오기 (필요)
  // 원래 없던 새로운 리뷰면 새로 등록
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { concertId } = location.state || {};
  const { id } = useParams<{ id: string }>(); // 리뷰 아이디
  const navigate = useNavigate();

  const {
    userId,
    nickname,
    profileImage,
    // likedReviews,
    // bookmarkedConcerts,
    reviews,
  } = useCurrentUser();

  useEffect(() => {
    console.log(
      userId,
      nickname,
      profileImage,
      // likedReviews,
      // bookmarkedConcerts,
      reviews
    );
    if (reviews && reviews.length > 0) {
      // reviews.some((review) => review)
      console.log(reviews);
    }
  }, []);

  const {
    concertDetail,
    isLoading: isConcertDetailLoading,
    error: concertDetailError,
  } = useGetConcertDetail(concertId); // 파이어베이스 통신 줄이기 위해 kopis에서 불러옴

  const [reviewImageList, setReviewImageList] = useState<string[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const status = useSelector((state: RootState) => state.interaction.status);
  const isLoading = status === "loading";

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
      // 리뷰 등록
      await dispatch(
        uploadReviewAsync({
          userId,
          review: newReview,
        })
      ).unwrap();
      toast.success("리뷰가 등록되었습니다.");
      navigate(`/review/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("리뷰를 등록하지 못했습니다.");
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
      {isLoading && <LoadingSpinner />}
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
