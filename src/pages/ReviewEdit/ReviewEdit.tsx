import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

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
