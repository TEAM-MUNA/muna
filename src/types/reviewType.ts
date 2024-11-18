import reviewTest from "../assets/img/test-cat.png";
import reviewTest2 from "../assets/img/test.jpg";

// Firebase에 올리는 리뷰 타입
export interface ReviewType {
  concert: {
    id: string;
    title: string;
    poster: string;
  };
  reviewId: string;
  author: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
  rating?: number;
  date: string;
  createdAt: string;
  contents: string;
  images?: string[];
  likedBy: string[];
  likeCount: number;
}

export interface ReviewListType {
  concert?: {
    id?: string;
    title: string;
    poster?: string;
  };
  reviewId?: string;
  author?: {
    id?: string;
    nickname?: string;
    profileImage?: string;
  };
  rating?: number;
  date?: string;
  contentsPreview?: string; // 200자 미리보기
  thumbnail?: string; // 대표이미지
  hasMultipleImages?: boolean; // 갤러리뷰에서 필요
  likeCount?: number;
}

export interface ReviewPropType {
  reviewId?: string;
  title?: string;
  content?: string;
  date?: string;
  starRate?: number;
  likeCount?: number;
  thumbnail?: string;
  images?: string[];
  reviewLink?: string;
}

export const defaultReviewType = {
  reviewId: "reviewId",
  title: "공연명",
  content:
    "통신·방송의 시설기준과 신문의 기능을 보장하기 위하여 필요한 사항은 법률로 정한다. 모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다. 공개하지 아니한 회의내용의 공표에 관하여는 법률이 정하는 바에 의한다. ",
  date: "2024.10.22",
  starRate: 5.0,
  likeCount: 50,
  thumbnail: reviewTest,
  images: [reviewTest, reviewTest2],
  reviewLink: "#",
};
