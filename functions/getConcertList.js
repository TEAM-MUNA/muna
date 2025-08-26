// functions/getConcertList.js
// eslint-disable-next-line no-undef, @typescript-eslint/no-require-imports
const axios = require("axios");

// eslint-disable-next-line no-undef
exports.handler = async function (event) {
  const {
    genreCode,
    pfStateCode,
    regionCode,
    page,
    keyword,
    startDate,
    endDate,
  } = event.queryStringParameters;

  // eslint-disable-next-line no-undef
  const serviceKey = process.env.REACT_APP_kopisKey; // Netlify 환경변수에서 가져오기

  try {
    const { data } = await axios.get(
      "https://www.kopis.or.kr/openApi/restful/pblprfr",
      {
        params: {
          service: serviceKey,
          stdate: startDate,
          eddate: endDate,
          rows: 5, // 임시
          cpage: page,
          shcate: genreCode,
          prfstate: pfStateCode,
          signgucode: regionCode,
          shprfnm: keyword,
        },
      }
    );

    return {
      statusCode: 200,
      body: data, // XML 그대로 반환
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch concert list" }),
    };
  }
};
