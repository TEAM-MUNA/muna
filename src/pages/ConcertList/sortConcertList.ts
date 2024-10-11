import { ConcertReturnType } from "../../types/concertType";

// 공연 목록 최신순으로 정렬하기
const sortConcertList = (list: ConcertReturnType[], sortOrder: string) => {
  const sortedList = [...list];
  if (sortOrder === "최신순") {
    sortedList.sort(
      (a, b) =>
        new Date(b.prfpdfrom).getTime() - new Date(a.prfpdfrom).getTime()
    );
  }
  return sortedList;
};

export default sortConcertList;
