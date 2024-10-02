import posterDefault from "../assets/img/test-cat.png";

export interface ConcertProps {
  concertId?: string;
  title?: string;
  poster?: string;
  state?: "공연중" | "공연예정" | "공연완료" | undefined;
  startDate?: string;
  endDate?: string;
  location?: string;
  age?: string;
  starRate?: string;
  reviewCount?: number;
  bookmarkCount?: number;
  bookmarkList?: string[];
}

export const defaultConcertProps = {
  concertId: "",
  title: "공연명",
  poster: posterDefault,
  state: "공연중",
  startDate: "2016.05.12",
  endDate: "2016.07.30",
  location: "",
  age: "만 12세 이상",
  starRate: "5.0",
  reviewCount: 50,
  bookmarkCount: 50,
  bookmarkList: ["test"],
};
