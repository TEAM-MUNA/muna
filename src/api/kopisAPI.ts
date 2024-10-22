import axios from "axios";
import { ConcertReturnType } from "../types/concertType";

const BASE_URL = "/api/kopis";

export const fetchConcertDetail = async (
  mt20id: string
): Promise<ConcertReturnType | null> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${mt20id}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const fetchConcertList = async (
  genreCode: string,
  pfStateCode: string,
  regionCode: string,
  page: number,
  keyword: string
): Promise<ConcertReturnType[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}`, {
      params: {
        shcate: genreCode,
        prfstate: pfStateCode,
        signgucode: regionCode,
        cpage: page,
        shprfnm: keyword,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};
