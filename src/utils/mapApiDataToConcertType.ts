import { ConcertType, ConcertReturnType } from "../types/concertType";

export default function mapApiDataToConcertType(
  apiData: ConcertReturnType
): ConcertType {
  return {
    concertId: apiData.mt20id,
    title: apiData.prfnm,
    poster: apiData.poster,
    // averageRating?: string;
    // bookmarkedBy?: string[];
    // reviews?: string[];
  };
}
