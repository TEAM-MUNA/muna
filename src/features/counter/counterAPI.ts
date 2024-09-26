// 데이터를 위한 비동기 요청을 모방하는 mock 함수
const fetchCount = (amount = 1) =>
  new Promise<{ data: number }>((resolve) => {
    setTimeout(() => resolve({ data: amount }), 500);
  });

export default fetchCount;
