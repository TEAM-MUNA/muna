import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import styles from "./ReviewEdit.module.scss"
import Title from "../../components/common/Title/Title";
import CalendarInput from "../../components/common/CalendarInput/CalendarInput";
import StarForm from "../../components/common/StarForm/StarForm";


export default function ReviewEdit() {
  const location = useLocation();
  const { concertId } = location.state || {};
  const { userId } = useCurrentUser();
  const { id } = useParams<{ id: string }>(); // 리뷰 아이디

  console.log("------------");
  console.log("concertId: ", concertId);
  console.log("userId: ", userId);
  console.log("reviewId :", id);
  console.log("------------");

  return <div>ReviewEdit</div>;
}
