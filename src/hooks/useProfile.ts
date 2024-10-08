import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firebaseAuth, db } from "../firebase";
import { UserProps } from "../types/userProps";

const useProfile = () => {
  const [profile, setProfile] = useState<UserProps | null>(null);

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    console.log(user, "유저정보");
    if (user) {
      const userId = user.uid;
      const { email } = user;

      const fetchUserData = async () => {
        const userDocRef = doc(db, "users", userId); // 'users' 컬렉션에서 uid로 문서 참조
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile({
            userId,
            email,
            nickname: userData?.nickname || null,
            userImage: userData?.profileImage || null,
          });
        } else {
          console.log("유저 정보가 없습니다");
          setProfile(null);
        }
      };

      fetchUserData();
    } else {
      setProfile(null);
      console.log("로그아웃 상태입니다");
    }
  }, []);

  return { ...profile };
};

export default useProfile;
