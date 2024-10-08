import userDefault from "../assets/img/user-default.png";

export interface UserProps {
  nickname?: string;
  email?: string | null;
  userId?: string;
  userImage?: string;
  userLink?: string | undefined | null;
}

export const defaultUserProps = {
  nickname: "닉네임",
  email: "userEmail",
  userId: "userId",
  userImage: userDefault,
  userLink: "profile/1",
};
