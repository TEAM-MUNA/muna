import axios from "axios";
import { Handler } from "@netlify/functions";
import parseXml from "../../src/utils/parseXml"; // XML 파싱 유틸리티 가져오기

export const handler: Handler = async (event) => {
  const params = event.queryStringParameters;
  try {
    const response = await axios.get(
      `https://www.kopis.or.kr/openApi/restful/pblprfr/${params?.mt20id}`,
      {
        params: {
          service: process.env.REACT_APP_kopisKey,
          ...params,
        },
      }
    );

    const result = parseXml(response.data);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Request failed" }),
    };
  }
};
