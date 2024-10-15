import posterDefault from "../assets/img/test-cat.png";

export const DefaultConcertType = {
  concertId: "임시 공연 아이디",
  title: "공연명",
  poster: posterDefault,
  averageRating: 999,
  bookmarkedBy: ["999"],
  reviews: ["999"],
};

export const defaultConcertType = {
  concertId: "",
  title: "공연명",
  poster: posterDefault,
  averageRating: 5.0,
  bookmarkedBy: [],
  bookmarkCount: 0,
  reviews: [],
  // TODO: ..살펴보기
  concertLink: "/",
};

// Firebase에 올리는 공연 타입
export interface ConcertType {
  concertId?: string; // TODO: ?(옵셔널) 빼기
  title?: string;
  poster?: string;
  averageRating?: number;
  bookmarkedBy?: string[];
  reviews?: string[];
  bookmarkCount?: number;
}

// 공연 정보(kopis)로부터 받아오는 공연 타입
export interface ConcertReturnType {
  mt20id: string;
  prfnm: string; // 공연 이름
  prfpdfrom: string; // 공연 시작 일시
  prfpdto: string; // 공연 끝 일시
  fcltynm: string; // 공연장
  poster: string; // 포스터 (사진)
  area: string; // 지역
  genrenm: string; // 장르
  openrun: string;
  prfstate: "공연중" | "공연예정" | "공연완료" | undefined; // 공연 상태
  prfruntime: string; // 공연 시간
  prfage: string; // 연령
  updatedate: string; // 업데이트 날짜
  // [key: string]: any; // 필요에 따라 추가적인 키를 허용
  prfcast: string; // 출연진(캐스팅)
  dtguidance: string; // 공연시간
  entrpsnm: string; // 극단 등
}

// 위에 두가지 타입 통합
// 공연 목록 정렬을 위해서는 각각의 아이템에 비교를 위한 기준이 있어야됨.
// (averageRating, bookmarkedBy, reviews)
export type IntergratedConcertType = ConcertType & ConcertReturnType;
