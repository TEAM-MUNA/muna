import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import toastMessages from "../utils/constants/toastMessages";

const useUserRedirect = (redirectPath = "/login") => {
  const navigate = useNavigate();
  const currentUserId = useCurrentUser().userId;
  const hasRedirected = useRef(false); // 처음 렌더링인지 확인

  useEffect(() => {
    if (!currentUserId && !hasRedirected.current) {
      navigate(redirectPath); // 로그인 정보가 없을 때 페이지 리다이렉트
      toast.error(toastMessages.userRedirect);
      hasRedirected.current = true; // 이후에는 실행되지 않도록
    }
  }, [currentUserId, navigate, redirectPath]);
};

export default useUserRedirect;
