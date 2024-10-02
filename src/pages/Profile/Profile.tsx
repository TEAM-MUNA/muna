import React from "react";
import DropdownMenu from "../../components/common/Dropdown/DropdownMenu";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import PosterCard from "../../components/common/PosterCard/PosterCard";
import ReviewGalleryCard from "../../components/common/ReviewGalleryCard/ReviewGalleryCard";

export default function Profile() {
  const dropdownMenuOptions = ["수정", "삭제"];
  const handleDropdownMenu = () => {};

  const dropdownSelectOptions = ["공연전체", "진행중", "진행완료"];
  const handleDropdownSelect = () => {};

  return (
    <div>
      <h1>Profile</h1>
      <DropdownMenu
        onSelect={handleDropdownMenu}
        options={dropdownMenuOptions}
      />
      <DropdownSelect
        onSelect={handleDropdownSelect}
        options={dropdownSelectOptions}
      />
      <ReviewCard reviewLink='#' />
      <ReviewCard reviewLink='#' page='concert' />
      <ReviewCard reviewLink='#' page='profile' />
      <div>
        <PosterCard link='#' isBookmarked />
        <PosterCard link='#' />
        <PosterCard link='#' />
        <PosterCard link='#' />
      </div>
      <div>
        <ReviewGalleryCard link='#' hasMultiImages />
        <ReviewGalleryCard link='#' />
        <ReviewGalleryCard link='#' />
        <ReviewGalleryCard link='#' />
      </div>
    </div>
  );
}
