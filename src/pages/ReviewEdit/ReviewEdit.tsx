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
import useGetReview from "../../hooks/useGetReview";
import Button from "../../components/common/Button/Button";

export default function ReviewEdit() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { id } = useParams<{ id: string }>(); // 리뷰 아이디
  const navigate = useNavigate();

  const { userId, nickname, profileImage } = useCurrentUser();

  const {
    review,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetReview(id);

  const { concertId: reviewConcertId } = location.state || {};
  const [concertId, setConcertId] = useState<string>(reviewConcertId);

  const {
    concertDetail,
    isLoading: isConcertDetailLoading,
    error: concertDetailError,
  } = useGetConcertDetail(concertId);

  const [reviewImageList, setReviewImageList] = useState<string[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!isReviewLoading && review) {
      setReviewImageList(review.images || []);
      setReviewContent(review.contents || "");
      setDate(review.date || "");
      setRating(review.rating || undefined);
      setConcertId(review.concert.id);
    }
  }, [isReviewLoading, review]);

  const status = useSelector((state: RootState) => state.interaction.status);
  const isLoading = status === "loading";

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReviewContent(value);
  };

  const handleDone = async () => {
    if (
      !id ||
      !userId ||
      !nickname ||
      !concertDetail?.prfnm ||
      !concertDetail?.poster
    ) {
      toast.error("후기를 등록하는 도중 문제가 발생했습니다.");
      return;
    }

    const newReview: ReviewType = {
      concert: {
        id: concertDetail.mt20id,
        title: concertDetail.prfnm,
        poster: concertDetail.poster,
      },
      reviewId: id,
      author: {
        id: userId,
        nickname,
        profileImage: profileImage || undefined,
      },
      rating,
      date,
      createdAt: new Date().toISOString(),
      contents: reviewContent,
      images: reviewImageList,
      likedBy: [],
      likeCount: 0,
    };

    try {
      await dispatch(uploadReviewAsync({ userId, review: newReview })).unwrap();
      toast.success("리뷰가 등록되었습니다.");
      navigate(`/review/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("리뷰를 등록하지 못했습니다.");
    }
  };

  if (isReviewLoading || isConcertDetailLoading) {
    return <LoadingSpinner />;
  }

  if (reviewError || concertDetailError) {
    return <div>Error: {reviewError || concertDetailError}</div>;
  }

  return (
    <section className={styles.reviewEdit_form}>
      <h2 className='sr_only'>리뷰생성 및 수정</h2>
      <Title
        label='기록하기'
        buttonLeft='close'
        buttonRight='done'
        handleDoneButton={handleDone}
      />
      <Button onClick={() => console.log(reviewImageList)} label='화깅ㄴ' />
      {isLoading && <LoadingSpinner />}
      {concertDetail && (
        <div className={styles.concert_date}>
          <div className={styles.concert_image}>
            <img src={concertDetail.poster} alt={concertDetail.prfnm} />
          </div>
          <div className={styles.concert_inner}>
            <p>
              <h3 className={styles.concert_title}>{concertDetail.prfnm}</h3>
              <span className={styles.concert_genre}>
                {concertDetail.genrenm}
              </span>
            </p>
            <CalendarInput
              currentDate={date}
              onCalendarChange={(selectedDate) => {
                setDate(selectedDate);
              }}
            />
          </div>
        </div>
      )}
      <div className={styles.star_form}>
        <StarForm
          initialRating={rating || 0}
          onRatingChange={(newRating) => {
            setRating(newRating);
          }}
        />
      </div>
      <ReviewImageUploader
        imageList={reviewImageList}
        onImageChange={(imageUrls) => {
          setReviewImageList(imageUrls);
        }}
      />
      <label htmlFor='review-textarea'>
        <span className='sr_only'>리뷰 작성</span>
        <textarea
          id='review-textarea'
          className={styles.textarea}
          placeholder={`${concertDetail?.prfnm || "공연"}에 대한 기록을 남겨보세요. (1,500자 이내)`}
          onChange={handleTextArea}
          value={reviewContent}
        />
      </label>
    </section>
  );
}
