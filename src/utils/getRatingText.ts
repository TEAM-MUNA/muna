function getRatingText(rating: number) {
  switch (rating) {
    case 1:
      return "별로예요";
    case 2:
      return "그저그래요";
    case 3:
      return "괜찮아요";
    case 4:
      return "좋아요";
    case 5:
      return "최고예요";
    default:
      return "별점을 선택하세요";
  }
}
export default getRatingText;
