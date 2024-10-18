export const genreList = [
  "전체",
  "뮤지컬",
  "연극",
  "국악",
  "클래식",
  "대중음악",
  "서양/한국무용",
  "서커스/마술",
  "대중무용",
  "기타",
];

export const genreCodeList = [
  "", // 전체
  "GGGA", // 뮤지컬
  "AAAA", // 연극
  "CCCC", // 국악
  "CCCA", // 클래식
  "CCCD", // 대중음악
  "BBBC", // 서양/한국무용
  "EEEB", // 서커스/마술
  "BBBE", // 대중무용
  "EEEA", // 기타
];

export const genreMap: { [key: string]: string } = {
  뮤지컬: "GGGA",
  연극: "AAAA",
  국악: "CCCC",
  클래식: "CCCA",
  대중음악: "CCCD",
  "서양/한국무용": "BBBC",
  "서커스/마술": "EEEB",
  대중무용: "BBBE",
  기타: "EEEA",
  전체: "", // 전체 장르
};
