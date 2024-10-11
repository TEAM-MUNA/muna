import userDefault from "../assets/img/user-default.png";

export interface UserType {
  userId?: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
  userLink?: string;
  bookmarkedConcerts?: string[];
  reviews?: string[];
  likedReviews?: string[];
}

export const defaultUserType = {
  userId: "userId",
  email: "userEmail",
  nickname: "닉네임",
  profileImage: userDefault,
};
