// hooks/useProfile.ts
import { useEffect, useState } from "react";
import { getUserFromFirebase } from "../api/authAPI";
import { UserProps } from "../types/userProps";

const useProfile = (userId: string | undefined) => {
  const [profile, setProfile] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const userProfile: UserProps | undefined =
            await getUserFromFirebase(userId);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            setProfile(null); // 사용자 정보가 없을 경우 null
          }
        } catch (error) {
          console.error("프로필 정보를 가져오는 중 오류 발생:", error);
          setProfile(null); // 오류 발생 시 null
        }
      }
    };

    fetchProfile(); // 프로필 정보 가져오기
  }, [userId]);

  return profile;
};

export default useProfile;
