import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useCurrentUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userActivity = useSelector(
    (state: RootState) => state.activity.userActivity
  );
  return {
    userId: user?.userId,
    email: user?.email,
    nickname: user?.nickname,
    profileImage: user?.profileImage,
    bookmarkedConcerts: userActivity?.bookmarkedConcerts,
    reviews: userActivity?.reviews,
    likedReviews: userActivity?.likedReviews,
  };
};

export default useCurrentUser;
