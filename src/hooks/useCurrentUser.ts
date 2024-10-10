import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useCurrentUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return {
    userId: user?.uid,
    email: user?.email,
    nickname: user?.nickname,
    profileImage: user?.profileImage,
  };
};

export default useCurrentUser;
