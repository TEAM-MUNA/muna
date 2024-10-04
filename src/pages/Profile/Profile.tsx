import React from "react";
import styles from "./Profile.module.scss";
import Avatar from "../../components/common/Avatar/Avatar";
import Button from "../../components/common/Button/Button";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import Tab from "../../components/common/Tab/Tab";
import DropdownSelect from "../../components/common/Dropdown/DropdownSelect";
import PosterCard from "../../components/common/PosterCard/PosterCard";

// import ReviewCard from "../../components/common/ReviewCard/ReviewCard";
// import ReviewGalleryCard from "../../components/common/ReviewGalleryCard/ReviewGalleryCard";

export default function Profile() {
  const tabList: (string | [string, number | null])[] = [
    ["북마크한 공연", null],
    ["나의 후기", 10],
  ];
  const stateSelectOptions = ["공연전체", "진행중", "진행완료"];
  const orderSelectOptions = ["최신순", "진행중", "진행완료"];
  const handleDropdownSelect = () => {};

  return (
    <div>
      <h1 className='sr_only'>00님의 프로필페이지</h1>
      <article className={styles.top}>
        <Avatar size='lg' />
        <Button label='프로필 설정' iconOnly={<SettingsIcon />} />
      </article>
      {/* TODO: 탭 선택시 > 현재 활성화 탭 필요 */}
      <Tab tabList={tabList} withNumber />
      <section className={`${styles.tab_content} ${styles.bookmark}`}>
        <DropdownSelect
          onSelect={handleDropdownSelect}
          options={stateSelectOptions}
        />
        <DropdownSelect
          onSelect={handleDropdownSelect}
          options={orderSelectOptions}
        />
        <ul>
          <li>
            <PosterCard concertLink='#' isBookmarked />
          </li>
        </ul>
      </section>

      {/* <div>
        <ReviewGalleryCard reviewLink='#' hasMultiImages />
        <ReviewGalleryCard reviewLink='#' />
        <ReviewGalleryCard reviewLink='#' />
        <ReviewGalleryCard reviewLink='#' />
      </div> */}
      {/* <ReviewCard reviewLink='#' />
      <ReviewCard reviewLink='#' page='concert' />
      <ReviewCard reviewLink='#' page='profile' />
       */}
    </div>
  );
}
