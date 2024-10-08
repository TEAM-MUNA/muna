// 이미지 크기를 조정하는 함수
const getResizeImage = (
  imageSrc: string,
  maxWidth: number,
  maxHeight: number
): Promise<HTMLCanvasElement> =>
  new Promise<HTMLCanvasElement>((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // 가로가 긴 경우
      if (width > height && width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      // 세로가 긴 경우
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas);
    };
  });

export default getResizeImage;
