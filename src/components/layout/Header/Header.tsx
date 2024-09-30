import React, { useState } from "react";
import styles from "./Header.module.scss";
import Button from "../../common/Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import Logo from "../../../assets/img/logo";
import UserIcon from "../../../assets/svg/UserIcon";
import SearchIcon from "../../../assets/svg/SearchIcon";
import SearchInput from "../../common/SearchInput/SearchInput";

interface HeaderProps {
  buttonLeft?: "back" | "login" | "profile";
}

export default function Header({ buttonLeft }: HeaderProps) {
  const [search, setSearch] = useState(false);

  const handleBackButton = () => {};
  const handleProfileButton = () => {};

  const handleSearchButton = () => {
    setSearch(!search);
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.left_btn}`}>
        {buttonLeft === "back" && (
          <Button
            label='back'
            iconOnly={<ArrowLeftIcon />}
            onClick={handleBackButton}
          />
        )}
        {buttonLeft === "login" && (
          <Button label='로그인' size='md' color='default' />
        )}
        {buttonLeft === "profile" && (
          <Button
            label='profile'
            iconOnly={<UserIcon />}
            onClick={handleProfileButton}
          />
        )}
      </div>
      {search ? (
        <SearchInput placeholder='검색어를 입력하세요' fullWidth />
      ) : (
        <>
          <div className={`${styles.logo}`}>
            <Button label='muna logo' iconOnly={<Logo />} />
          </div>
          <div>
            <Button
              label='search'
              iconOnly={<SearchIcon />}
              onClick={handleSearchButton}
            />
          </div>
        </>
      )}
    </header>
  );
}
