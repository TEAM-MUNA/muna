import React from "react";
// import { useLocation, useParams } from "react-router-dom";      // useLocation : 현재페이지의 주소(URL) 정보를 제공 / useParams : URL의 동적 파라미터를 키/값 객체로 반환
// import useCurrentUser from "../../hooks/useCurrentUser";        // 사용자의 기본 정보 및 홈페이지에서 남긴 기록데이터를 가져옴
import styles from "./ReviewEdit.module.scss";
import Title from "../../components/common/Title/Title";
import CalendarInput from "../../components/common/CalendarInput/CalendarInput";
import StarForm from "../../components/common/StarForm/StarForm";
import { ConcertType, DefaultConcertType } from "../../types/concertType";

export default function ReviewEdit() {
  // // 이전 페이지에서 불러오기
  // const location = useLocation();
  // const { concertId, poster, title, genrenm } = location.state || {};  // 특정 콘서트의 concertId를 가져옴 (이전페이지에서 전달받은 concertId를 가져옴)
  // const { userId } = useCurrentUser();                        // 로그인한 사용자의 userId를 가져옴
  // const { id } = useParams<{ id: string }>();                 // 리뷰 아이디

  // // 디버깅 영역
  // console.log("------------");
  // console.log("concertId: ", concertId);
  // console.log("poster: ", poster);
  // console.log("title: ", title);
  // console.log("userId: ", userId);
  // console.log("reviewId :", id);
  // console.log("------------");

  const testConcertType: ConcertType = {
    concertId: DefaultConcertType.concertId,
    title: DefaultConcertType.title,
    poster: DefaultConcertType.poster,
    averageRating: DefaultConcertType.averageRating,
  };

  // // 오른쪽상단 체크아이콘 클릭시 저장
  const handleDone = () => {
    // 리뷰 체크표시 클릭시 저장
    // console.log("저장완료");
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
      <div className={styles.concert_date}>
        <div className={styles.concert_image}>
          <img src={testConcertType.poster} alt={testConcertType.title} />
        </div>
        <div className={styles.concert_inner}>
          <p>
            <h3 className={styles.concert_title}>{testConcertType.title}</h3>
            <span className={styles.concert_genre}>
              {testConcertType.title}
            </span>
          </p>
          <CalendarInput />
        </div>
      </div>
      <div className={styles.star_form}>
        <StarForm initialRating={0} />
      </div>
    </section>
  );
}
