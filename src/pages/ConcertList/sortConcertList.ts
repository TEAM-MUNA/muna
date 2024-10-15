import { IntergratedConcertType } from "../../types/concertType";

// 공연 목록 최신순으로 정렬하기
const sortConcertList = (list: IntergratedConcertType[], sortOrder: string) => {
  const sortedList = [...list];
  if (sortOrder === "최신순") {
    sortedList.sort(
      (a, b) =>
        new Date(b.prfpdfrom).getTime() - new Date(a.prfpdfrom).getTime()
    );
    // } else if (sortOrder === "평점순") {
    //   sortedList.sort((a, b) => {
    //     const A = a.averageRating || 0;
    //     const B = b.averageRating || 0;
    //     return B - A;
    //   });
    // } else if (sortOrder === "북마크순") {
    //   sortedList.sort((a, b) => {
    //     const A = a.bookmarkedBy?.length || 0;
    //     const B = b.bookmarkedBy?.length || 0;
    //     return B - A;
    //   });
  }
  return sortedList;
};

export default sortConcertList;
