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
      <div>
        {buttonLeft === "back" && (
          <Button icon={<ArrowLeftIcon />} onClick={handleBackButton} />
        )}
        {buttonLeft === "login" && (
          <Button label='로그인' size='md' color='default' />
        )}
        {buttonLeft === "profile" && (
          <Button icon={<UserIcon />} onClick={handleProfileButton} />
        )}
      </div>
      {search ? (
        <SearchInput placeholder='검색어를 입력하세요' />
      ) : (
        <>
          <div className={`${styles.logo}`}>
            <Button icon={<Logo />} />
          </div>
          <div>
            <Button icon={<SearchIcon />} onClick={handleSearchButton} />
          </div>
        </>
      )}
    </header>
  );
}
