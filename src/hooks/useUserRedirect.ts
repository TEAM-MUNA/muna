import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import toastMessages from "../utils/constants/toastMessages";
import useCurrentUser from "./useCurrentUser";

const useUserRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId: currentUserId } = useCurrentUser();

  useEffect(() => {
    const pathname = location.pathname;
    // 로그아웃 상태에서 "settings"가 포함된 경로 접근시, 로그인 페이지로 리다이렉트
    if (pathname.includes("settings") && !currentUserId) {
      navigate("/login");
      toast.error(toastMessages.userRequiresLogin);
    }

    // 로그인 상태에서 "login" 또는 "signup" 경로 접근 시, 본인 프로필 페이지로 리다이렉트
    if (
      (pathname.includes("login") || pathname.includes("signup")) &&
      currentUserId
    ) {
      navigate(`/profile/${currentUserId}`);
      toast.error(toastMessages.userAlreadyLoggedIn);
    }
  }, [currentUserId, navigate, location]);
};

export default useUserRedirect;
