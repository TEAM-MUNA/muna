import React from "react";
import Header from "../../components/layout/Header/Header";
import MultiSelectTab from "../../components/common/MultiSelectTab/MultiSelectTab";
import ReviewTitle from "../../components/common/ReviewTitle/ReviewTitle";

export default function Search() {
  return (
    <>
      <Header buttonLeft='back' />
      <MultiSelectTab />
      <ReviewTitle
        title='랭보의 엄청엄엄청엄청엄엄청엄청엄엄청엄청엄엄청엄청엄엄청나게 긴 하루'
        isMine
        genre='콘서트'
        concertId={1}
      />
      <ReviewTitle
        title='랭보'
        concertId={1}
        genre='뮤지컬'
        nickname='앗가이'
      />
    </>
  );
}
