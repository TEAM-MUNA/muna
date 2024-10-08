import userDefault from "../assets/img/user-default.png";

export interface UserProps {
  nickname?: string;
  userId?: string;
  userImage?: string;
  userLink?: string | undefined;
}

export const defaultUserProps = {
  nickname: "닉네임",
  userId: "userId",
  userImage: userDefault,
  userLink: undefined,
};
