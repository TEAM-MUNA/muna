import posterDefault from "../assets/img/test-cat.png";

export interface ConcertProps {
  concertId?: string;
  title?: string;
  poster?: string;
  state?: "공연중" | "공연예정" | undefined;
  period?: string;
  location?: string;
  age?: string;
  starRate?: string;
  reviewCount?: number;
  bookmarkCount?: number;
  bookmarkList?: string[];
}

export const defaultConcertProps = {
  concertId: "",
  title: "콘서트 제목 <타이틀>",
  poster: posterDefault,
  state: "공연중",
  period: "2024.10.22",
  location: "",
  age: "만 12세 이상",
  starRate: "5.0",
  reviewCount: 50,
  bookmarkCount: 50,
  bookmarkList: ["test"],
};
