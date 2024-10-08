const xmlToJson = (xml) => {
  // xml => json 변환 함수

  // 변환된 JSON 객체를 저장할 빈 객체 생성
  let obj = {};

  // XML 요소 노드일 경우 (nodeType 1은 요소 노드를 의미)
  if (xml.nodeType === 1) {
    // 요소에 속성이 있는 경우 @attributes 객체를 생성하여 속성 추가
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {}; // 속성을 담을 객체
      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j);
        // 각 속성을 객체의 key-value 형식으로 저장
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  }
  // 텍스트 노드일 경우 (nodeType 3은 텍스트 노드를 의미)
  else if (xml.nodeType === 3) {
    obj = xml.nodeValue; // 텍스트 값을 그대로 반환
  }

  // 자식 노드 처리
  // 자식 노드가 모두 텍스트 노드인 경우, 텍스트 내용을 하나의 문자열로 연결
  const textNodes = Array.from(xml.childNodes).filter(
    (node) => node.nodeType === 3
  );

  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    // 모든 자식이 텍스트일 때, 텍스트 노드의 값을 누적하여 하나의 문자열로 반환
    obj = Array.from(xml.childNodes).reduce(
      (text, node) => text + node.nodeValue,
      ""
    );
  }
  // 자식 노드가 요소일 경우
  else if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i += 1) {
      const item = xml.childNodes.item(i);
      const { nodeName } = item;

      // 자식 노드의 이름이 처음 등장하면 재귀 호출하여 변환된 객체를 추가
      if (typeof obj[nodeName] === "undefined") {
        obj[nodeName] = xmlToJson(item);
      }
      // 동일한 이름의 자식 노드가 여러 개 존재할 경우 배열로 변환하여 추가
      else {
        if (!Array.isArray(obj[nodeName])) {
          // 기존의 객체를 배열로 변환
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old); // 이전의 객체를 배열에 넣기
        }
        // 새롭게 변환한 객체를 배열에 추가
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }

  return obj; // 최종 변환된 JSON 객체 반환
};

export default xmlToJson;
