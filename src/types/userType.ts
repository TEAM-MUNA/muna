import userDefault from "../assets/img/user-default.png";

export interface UserType {
  nickname?: string;
  email?: string | null;
  userId?: string;
  profileImage?: string;
  userLink?: string | undefined | null;
}

export const defaultUserType = {
  nickname: "닉네임",
  email: "userEmail",
  userId: "userId",
  profileImage: userDefault,
  userLink: "profile/1",
};
