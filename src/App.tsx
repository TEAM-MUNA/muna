import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import LoginForm from "./components/LoginForm";
import Button from "./components/common/Button";
import UserIcon from "./assets/svg/UserIcon";
import ArrowRightIcon from "./assets/svg/ArrowRightIcon";
import BookmarkIcon from "./assets/svg/BookmarkIcon";
import IconGallery from "./assets/svg/IconGallery";
import KebabMenuIcon from "./assets/svg/KebabMenuIcon";
import LikeIcon from "./assets/svg/LikeIcon";
import PencilIcon from "./assets/svg/PencilIcon";
import QueueListIcon from "./assets/svg/QueueListIcon";
import SearchIcon from "./assets/svg/SearchIcon";
import SettingIcon from "./assets/svg/SettingIcon";
import TrashIcon from "./assets/svg/TrashIcon";

function App() {
  // const a = 3;
  // if (a == 3) {
  //   // == 사용 못하게하는 eslint 테스트용 코드
  //   console.log("a는 3입니다");
  // }
  // const b = 3;
  // if (b == 3) {
  //   console.log("b는 3입니다");
  // }

  // firebase 사용 테스트
  const getDocs = async () => {
    try {
      const docRef = doc(db, "concert", "concert123");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("에러", e);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <div>
      <h1 className='danger'>muna</h1>
      {/* <Counter /> */}
      <LoginForm />
      <UserIcon />
      <Button label='버튼' color='danger' size='xl' />
      <Button />

      <ArrowRightIcon />
      <BookmarkIcon />
      <IconGallery />
      <KebabMenuIcon />
      <LikeIcon />
      <PencilIcon />
      <QueueListIcon />
      <SearchIcon />
      <SettingIcon />
      <TrashIcon />
      <UserIcon />
    </div>
  );
}

export default App;
