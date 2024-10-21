import { ConcertType, ConcertReturnType } from "../types/concertType";

export default function mapApiDataToConcertType(
  apiData: ConcertReturnType
): ConcertType {
  return {
    concertId: apiData.mt20id,
    title: apiData.prfnm,
    poster: apiData.poster,
    area: apiData.area,
    venue: apiData.fcltynm,
    startDate: apiData.prfpdfrom,
    endDate: apiData.prfpdto,
    genre: apiData.genrenm,
    state: apiData.prfstate,
    // averageRating?: string;
    // bookmarkedBy?: string[];
    // reviews?: string[];
  };
}
