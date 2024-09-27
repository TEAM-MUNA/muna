import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import LoginForm from "./components/LoginForm";
import Button from "./components/common/Button/Button";
import Input from "./components/common/Input/Input";
import Title from "./components/common/Title/Title";
import UserIcon from "./assets/svg/UserIcon";
import SearchInput from "./components/common/SearchInput/SearchInput";
import Header from "./components/layout/Header/Header";

function App() {
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
      <Button label='버튼' color='primary_line' size='sm' fullWidth={false} />
      <Button label='버튼' color='primary_line' size='sm' fullWidth />
      <Button />

      <Button icon={<UserIcon />} />

      <Input label='이메일' placeholder='이메일 주소를 입력해 주세요.' />

      <Input
        label='비밀번호'
        type='password'
        placeholder='현재 비밀번호를 입력해 주세요.'
        error
        message='비밀번호가 일치하지 않습니다.'
      />
      <Title label='기록하기' buttonLeft='back' />
      <Title label='기록하기' buttonLeft='close' buttonRight='done' />
      <Input placeholder='공연 관람일을 입력하세요' icon={<UserIcon />} />
      <SearchInput placeholder='검색어를 입력하세요' />

      <Header buttonLeft='profile' />
      <Header buttonLeft='login' />
      <Header buttonLeft='back' />
      <Header buttonLeft='back' />
    </div>
  );
}

export default App;
