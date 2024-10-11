// hooks/useProfile.ts
import { useEffect, useState } from "react";
import { getUserFromFirebase } from "../api/firebase/authAPI";
import { UserType } from "../types/userType";

const useProfile = (userId: string | undefined) => {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const userProfile: UserType | undefined =
            await getUserFromFirebase(userId);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            setProfile(null); // 사용자 정보가 없을 경우 null
          }
          setLoading(false);
        } catch (error) {
          console.error("프로필 정보를 가져오는 중 오류 발생:", error);
          setProfile(null); // 오류 발생 시 null
        }
      }
    };

    fetchProfile(); // 프로필 정보 가져오기
  }, [userId]);

  return { profile, loading };
};

export default useProfile;
