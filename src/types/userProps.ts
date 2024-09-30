import userDefault from "../assets/img/user-default.png";

export interface UserProps {
  nickname?: string;
  userId?: string;
  userImage?: string;
}

export const defaultUserProps = {
  nickname: "nickname",
  userId: "userId",
  userImage: userDefault,
};
