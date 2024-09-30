import userDefault from "../../../assets/img/user-default.png";

export interface UserProps {
  nickname?: string;
  userId?: string;
  image?: string;
}

export const defaultUserProps = {
  nickname: "nickname",
  userId: "userId",
  image: userDefault,
};
