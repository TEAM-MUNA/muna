import userDefault from "../assets/img/user-default.png";

export interface UserType {
  nickname?: string;
  email?: string;
  userId?: string;
  profileImage?: string | undefined; // 프로필이미지 초기화 기능이 생긴다면 null도 필요할듯
  userLink?: string;
}

export const defaultUserType = {
  nickname: "닉네임",
  email: "userEmail",
  userId: "userId",
  profileImage: userDefault,
  userLink: undefined,
};
