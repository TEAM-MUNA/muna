import posterDefault from "../assets/img/test-cat.png";

// TODO: 변수명 Props 대신 Type 등으로 변경하는게 좋을 것 같음.
export interface ConcertProps {
  concertId?: string;
  concertLink?: string;
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

// 공연 정보 api로부터 받아오는 값의 타입
export interface ConcertReturnType {
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  area: string;
  genrenm: string;
  openrun: string;
  prfstate: "공연중" | "공연예정" | "공연완료" | undefined;
  // [key: string]: any; // 필요에 따라 추가적인 키를 허용
}

export const defaultConcertProps = {
  concertId: "",
  concertLink: "#",
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
