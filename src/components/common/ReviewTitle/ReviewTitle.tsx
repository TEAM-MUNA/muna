import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import styles from "./ReviewTitle.module.scss";
import Button from "../Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import DropdownMenu from "../Dropdown/DropdownMenu";
import { deleteReviewAsync } from "../../../slices/activitySlice";
import Modal from "../Modal/Modal";
import useModal from "../../../hooks/useModal";

interface ReviewTitleProps {
  title: string; // 공연 제목 (prfnm)
  isMine?: boolean; // 내 리뷰임?
  concertId?: string;
  nickname?: string;
  reviewId?: string;
  userId?: string;
}

export default function ReviewTitle({
  title,
  isMine = false,
  concertId,
  nickname = "",
  reviewId,
  userId,
}: ReviewTitleProps) {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const [isConfirmedDeletion, setIsConfirmedDeletion] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleBackButton = () => {
    navigate(-1);
  };
  const handleDropDown = async (value: string) => {
    if (value === "후기 수정") {
      navigate(`/review/edit/${reviewId}`);
    } else {
      // 후기 삭제 모달 열림
      openModal();
    }
  };

  const deleteReview = async () => {
    if (!reviewId) {
      return;
    }
    try {
      await dispatch(deleteReviewAsync(reviewId)).unwrap();
      toast.success("리뷰가 삭제되었습니다.");
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error(error);
      toast.error("리뷰를 삭제하지 못했습니다.");
    }
  };

  useEffect(() => {
    if (!isConfirmedDeletion || !reviewId) {
      return;
    }
    // 리뷰 삭제
    deleteReview();
  }, [isConfirmedDeletion]);

  const reviewOwner = isMine ? "나" : `${nickname} 님`; // 내 후기일 경우 "나"로 설정
  return (
    <header className={styles.review_title}>
      <div className={styles.left_btn}>
        <Button
          label='back'
          iconOnly={<ArrowLeftIcon />}
          onClick={handleBackButton}
        />
      </div>
      <div className={styles.title_container}>
        <h2>{reviewOwner}의 후기</h2>
        <Link to={`/concert/${concertId}`} key={concertId}>
          <h1>{`<${title}>`}</h1>
        </Link>
      </div>
      {isMine && (
        <div className={styles.right_btn}>
          <DropdownMenu
            options={["후기 수정", "후기 삭제"]}
            onSelect={handleDropDown}
          />
        </div>
      )}
      <Modal
        isOpen={isOpen}
        title='후기 삭제'
        description='삭제된 후기는 되돌릴 수 없습니다. 그래도 계속 진행하시겠습니까?'
        onClose={closeModal}
      >
        <Button label='취소' color='primary_line' onClick={closeModal} />
        <Button
          label='삭제'
          color='primary'
          onClick={() => {
            setIsConfirmedDeletion(true);
          }}
        />
      </Modal>
    </header>
  );
}
