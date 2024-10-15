import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { UserType } from "../../../types/userType";

import styles from "./Header.module.scss";
import Button from "../../common/Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import Logo from "../../../assets/img/logo";
import UserIcon from "../../../assets/svg/UserIcon";
import SearchIcon from "../../../assets/svg/SearchIcon";
import SearchInput from "../../common/SearchInput/SearchInput";

interface HeaderProps extends UserType {
  buttonLeft?: "back" | "profile";
}

function HeaderLeftButton({ buttonLeft, userId }: HeaderProps) {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  const handleProfileButton = () => {};

  if (buttonLeft === "back") {
    return (
      <Button
        label='back'
        iconOnly={<ArrowLeftIcon />}
        onClick={handleBackButton}
      />
    );
  }

  if (userId) {
    return (
      <Link to={`/profile/${userId}`}>
        <Button
          label='profile'
          iconOnly={<UserIcon />}
          onClick={handleProfileButton}
        />
      </Link>
    );
  }

  return (
    <Link to='/login'>
      <Button label='로그인' size='md' color='default' />
    </Link>
  );
}

export default function Header({ buttonLeft }: HeaderProps) {
  const currentUserId = useCurrentUser().userId;
  const location = useLocation();
  const isSearchPage = location.pathname.includes("/search");

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.left_btn}`}>
        <HeaderLeftButton buttonLeft={buttonLeft} userId={currentUserId} />
      </div>
      {isSearchPage ? (
        <SearchInput placeholder='검색어를 입력하세요' fullWidth />
      ) : (
        <>
          <Link to='/' className={`${styles.logo}`}>
            <Button label='muna logo' iconOnly={<Logo />} />
          </Link>
          <Link to='/search'>
            <Button label='search' iconOnly={<SearchIcon />} />
          </Link>
        </>
      )}
    </header>
  );
}
