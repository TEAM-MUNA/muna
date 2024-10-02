import React from "react";
import DropdownMenu from "../../components/common/Dropdown/DropdownMenu";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
import PosterCard from "../../components/common/PosterCard/PosterCard";
import ReviewGalleryCard from "../../components/common/ReviewGalleryCard/ReviewGalleryCard";
import StarIcon from "../../assets/svg/StarIcon";

export default function Profile() {
  const dropdownMenuOptions = ["수정", "삭제"];
  const handleDropdownMenu = () => {};

  const dropdownSelectOptions = ["공연전체", "진행중", "진행완료"];
  const handleDropdownSelect = () => {};

  return (
    <div>
      <h1>Profile</h1>
      <StarIcon size='40' />
      <StarIcon active size='40' />
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
        <PosterCard concertLink='#' isBookmarked />
        <PosterCard concertLink='#' />
        <PosterCard concertLink='#' />
        <PosterCard concertLink='#' />
      </div>
      <div>
        <ReviewGalleryCard reviewLink='#' hasMultiImages />
        <ReviewGalleryCard reviewLink='#' />
        <ReviewGalleryCard reviewLink='#' />
        <ReviewGalleryCard reviewLink='#' />
      </div>
    </div>
  );
}
