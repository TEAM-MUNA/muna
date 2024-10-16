import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useCurrentUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userInteraction = useSelector(
    (state: RootState) => state.interaction.userInteraction
  );
  return {
    userId: user?.userId,
    email: user?.email,
    nickname: user?.nickname,
    profileImage: user?.profileImage,
    bookmarkedConcerts: userInteraction?.bookmarkedConcerts,
    reviews: userInteraction?.reviews,
    likedReviews: userInteraction?.likedReviews,
  };
};

export default useCurrentUser;
