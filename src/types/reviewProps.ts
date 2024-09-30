export interface ReviewProps {
  title?: string;
  content?: string;
  thumbnail?: string;
  date?: string;
  rating?: number;
  likeCount?: number;
}

export const defaultReviewProps = {
  title: "title",
  content: "content",
  thumbnail: undefined,
  date: "2024.10.22",
  rating: "5.0",
  likeCount: "1",
};
