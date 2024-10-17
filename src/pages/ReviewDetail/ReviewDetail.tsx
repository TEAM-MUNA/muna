import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import styles from "./ReviewDetail.module.scss";
import ReviewTitle from "../../components/common/ReviewTitle/ReviewTitle";
import ReviewAvatar from "../../components/common/Avatar/ReviewAvatar";
import StarTag from "../../components/common/StarTag/StarTag";
import ReviewBar from "../../components/common/ReviewBar/ReviewBar";
import { ReviewPropType, defaultReviewType } from "../../types/reviewType";

export default function ReviewDetail() {
  const reviewData: ReviewPropType = {
    title: defaultReviewType.title,
    content: defaultReviewType.content,
    date: defaultReviewType.date,
    starRate: defaultReviewType.starRate,
    likeCount: defaultReviewType.likeCount,
    thumbnail: defaultReviewType.thumbnail,
    images: defaultReviewType.images,
    reviewLink: "#",
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [translate, setTranslate] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.pageX - (imageRef.current?.offsetLeft || 0));
    setIsSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    const x = e.pageX - (imageRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    setTranslate(walk);
  };

  const handleMouseUp = () => {
    setIsSwiping(false);
    if (Math.abs(translate) > (imageRef.current?.offsetWidth || 0) / 4) {
      if (translate > 0 && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (
        translate < 0 &&
        currentImageIndex < (reviewData.images?.length || 0) - 1
      ) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }
    setTranslate(0);
  };

  useEffect(() => {
    const setupEventListeners = () => {
      const imageBox = imageRef.current;
      if (!imageBox) {
        return () => {};
      }

      const mouseMoveHandler = (e: MouseEvent) =>
        handleMouseMove(e as unknown as ReactMouseEvent<HTMLDivElement>);

      imageBox.addEventListener("mousemove", mouseMoveHandler);
      imageBox.addEventListener("mouseup", handleMouseUp);
      imageBox.addEventListener("mouseleave", handleMouseUp);

      return () => {
        imageBox.removeEventListener("mousemove", mouseMoveHandler);
        imageBox.removeEventListener("mouseup", handleMouseUp);
        imageBox.removeEventListener("mouseleave", handleMouseUp);
      };
    };

    return setupEventListeners();
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.review_container}>
      <section className={styles.review_form}>
        <h2 className='sr_only'>공연 후기</h2>
        <div className={styles.review_title}>
          <ReviewTitle
            title='어마무시하게 긴 제목의 콘서트같은 느낌이지만 더 어마무시한 느낌'
            isMine
            genre='콘서트'
            concertId={1}
          />
        </div>
        <div className={styles.review_avatar}>
          <ReviewAvatar />
          <StarTag rating={5} />
        </div>
        <div className={styles.review_imageForm}>
          <div className={styles.review_dot}>
            <ul>
              {defaultReviewType.images?.map((imageUrl, index) => (
                <li
                  key={`image-${imageUrl}`}
                  aria-label={`Image ${index + 1}`}
                  className={`${styles.review_dotList} ${currentImageIndex === index ? styles.active : ""}`}
                  role='tab'
                  aria-selected={currentImageIndex === index}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleDotClick(index);
                    }
                  }}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </ul>
          </div>
          <div
            className={styles.review_imageBox}
            ref={imageRef}
            onMouseDown={handleMouseDown}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              handleMouseDown(e as unknown as React.MouseEvent);
            }}
          >
            {reviewData.images?.map((imageUrl, index) => (
              <div
                key={`image-${imageUrl}`}
                className={`${styles.review_images} ${styles[`review_image_${index}`]} ${currentImageIndex === index ? styles.selected : ""}`}
                style={{ left: `${(index - currentImageIndex) * 100}%` }}
              >
                <img
                  key={`img-${imageUrl}`}
                  src={imageUrl}
                  alt={`Review visual ${index + 1}`}
                  className={styles[`review_image_${index}`]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.review_content}>
          <p className={styles.review_text}>{reviewData.content}</p>
        </div>
      </section>
      <div className={styles.review_bar}>
        <ReviewBar review={reviewData} />
      </div>
    </div>
  );
}
