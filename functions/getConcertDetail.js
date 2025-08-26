// functions/getConcertDetail.js
// eslint-disable-next-line no-undef, @typescript-eslint/no-require-imports
const axios = require("axios");

// eslint-disable-next-line no-undef
exports.handler = async function (event) {
  const mt20id = event.queryStringParameters.mt20id;
  // eslint-disable-next-line no-undef
  const serviceKey = process.env.REACT_APP_kopisKey; // 환경변수에서 가져오기

  if (!mt20id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "mt20id is required" }),
    };
  }

  try {
    const { data } = await axios.get(
      `https://www.kopis.or.kr/openApi/restful/pblprfr/${mt20id}`,
      { params: { service: serviceKey } }
    );

    return {
      statusCode: 200,
      body: data, // XML 그대로 반환
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch concert detail" }),
    };
  }
};
