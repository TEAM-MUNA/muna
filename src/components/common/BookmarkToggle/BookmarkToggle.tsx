import React from "react";
import toast from "react-hot-toast";
import { bookmarkConcertAsync } from "../../../slices/activitySlice";
import useGetConcert from "../../../hooks/useGetConcert";
import useGetConcertDetail from "../../../hooks/useGetConcertDetail";
import { useAppDispatch } from "../../../app/hooks";
import useCurrentUser from "../../../hooks/useCurrentUser";

import useToggle from "../../../hooks/useToggle";
import styles from "./BookmarkToggle.module.scss";
import Button from "../Button/Button";
import BookmarkIcon from "../../../assets/svg/BookmarkIcon";

interface BookmarkToggleProps {
  concertId?: string;
  interactive?: boolean;
  color?: "white" | "primary";
  pageName: string; // Firebase 사용 추적
}

export default function BookmarkToggle({
  concertId,
  interactive = false,
  color = "white",
  pageName,
}: BookmarkToggleProps) {
  const dispatch = useAppDispatch();
  const userId = useCurrentUser().userId;

  const {
    concertDetail,
    // isLoading: isConcertDetailLoading,
    // error: concertDetailError,
  } = useGetConcertDetail(concertId); // kopis
  const {
    concert,
    // isLoading: isConcertLoading,
    // error: concertError,
  } = useGetConcert(concertId, pageName); // Firebase

  const isBookmarkedInitialState =
    concert?.bookmarkedBy?.some(
      (bookmarkedUserId: string) => bookmarkedUserId === userId
    ) || false;
  const { isActive: isBookmarked, onToggle: onBookmarkToggle } = useToggle(
    isBookmarkedInitialState
  );

  const handleBookmark = async () => {
    // console.log(userId, concert);
    if (userId && concertDetail) {
      onBookmarkToggle();
      try {
        await dispatch(
          bookmarkConcertAsync({
            userId,
            concert: {
              concertId: concertDetail.mt20id,
              title: concertDetail.prfnm,
              poster: concertDetail.poster,
              area: concertDetail.area,
              venue: concertDetail.fcltynm,
              startDate: concertDetail.prfpdfrom,
              endDate: concertDetail.prfpdto,
              genre: concertDetail.genrenm,
              state: concertDetail.prfstate,
            },
            cancel: isBookmarked,
          })
        ).unwrap();
        // console.log(updatedBookmarks);

        toast.success(
          !isBookmarked ? "북마크에 추가되었습니다." : "북마크를 해제했습니다."
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // console.error(e);
        toast.error("북마크에 추가하지 못했습니다.");
        onBookmarkToggle(); // 북마크 해제
      }
    } else {
      // TODO: 로그인 페이지로 이동 등 처리 필요
      toast.error("로그인 후 이용 가능합니다.");
    }
  };

  if (!interactive && !isBookmarked) {
    return null;
  }
  return (
    <Button
      className={`${styles.btn_bookmark} ${styles[color]}`}
      label='북마크'
      iconOnly={<BookmarkIcon active={isBookmarked} />}
      iconShadow={interactive && color === "white"}
      onClick={handleBookmark}
    />
  );
}
