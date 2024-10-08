import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { firebaseAuth } from "../firebase";
import { setUser } from "../slices/authSlice";
import { getUserFromFirebase } from "../api/authAPI";

const useUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userInfo = await getUserFromFirebase(currentUser.uid);
        console.log(currentUser);
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            nickname: currentUser.displayName || null,
            profileImage: userInfo?.profileImage || null,
          })
        );
      } else {
        dispatch(setUser(null)); // 로그아웃 -> null
      }
      return unsubscribe;
    });
  }, [dispatch]);
};

export default useUser;
