import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../app/store";

import styles from "./Header.module.scss";
import Button from "../../common/Button/Button";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import Logo from "../../../assets/img/logo";
import UserIcon from "../../../assets/svg/UserIcon";
import SearchIcon from "../../../assets/svg/SearchIcon";
import SearchInput from "../../common/SearchInput/SearchInput";

interface HeaderProps {
  buttonLeft?: "back" | "profile";
}

export default function Header({ buttonLeft }: HeaderProps) {
  const navigate = useNavigate();

  // const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState(false);

  const handleBackButton = () => {
    navigate(-1);
  };
  const handleProfileButton = () => {};

  const handleSearchButton = () => {
    setSearch(!search);
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.left_btn}`}>
        {buttonLeft === "back" ? (
          <Button
            label='back'
            iconOnly={<ArrowLeftIcon />}
            onClick={handleBackButton}
          />
        ) : (
          <>
            {/* !isLoggedIn : 로그아웃 상태일때 */}
            {/* {!isLoggedIn && ( */}
            <Link to='/login'>
              <Button label='로그인' size='md' color='default' />
            </Link>
            {/* )} */}
            {/* !isLoggedIn : 로그인 상태일때 */}
            {/* {isLoggedIn && (
              <Link to={`/profile/${user?.uid}`}>
                <Button
                  label='profile'
                  iconOnly={<UserIcon />}
                  onClick={handleProfileButton}
                />
              </Link>
            )} */}
          </>
        )}
      </div>
      {search ? (
        <SearchInput placeholder='검색어를 입력하세요' fullWidth />
      ) : (
        <>
          <Link to='/' className={`${styles.logo}`}>
            <Button label='muna logo' iconOnly={<Logo />} />
          </Link>
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
