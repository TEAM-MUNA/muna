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
import DropdownSelect from "./components/common/Dropdown/DropdownSelect";
import DropdownMenu from "./components/common/Dropdown/DropdownMenu";

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

  // DropdownSelect 선택시 기능 추가
  const handleDropdownSelect = (value: string) => {
    console.log(`Selected: ${value}`);
  };
  // DropdownSelect 선택시 기능 추가
  const handleDropdownMenu = (value: string) => {
    console.log(`Menu: ${value}`);
  };

  return (
    <div>
      <h1 className='danger'>muna</h1>
      {/* <Counter /> */}
      <LoginForm />
      <Button label='버튼' color='primary_line' size='sm' fullWidth={false} />
      <Button label='버튼' color='primary_line' size='sm' fullWidth />
      <Button label='test' />
      <Button label='test' iconOnly={<UserIcon />} />
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
      <DropdownSelect
        options={["Option One", "Option Two", "Option Three"]}
        onSelect={handleDropdownSelect}
      />
      <DropdownMenu
        options={["후기 수정", "후기 삭제"]}
        onSelect={handleDropdownMenu}
      />
      <Input placeholder='공연 관람일을 입력하세요' icon={<UserIcon />} />
      <SearchInput placeholder='검색어를 입력하세요' />
      <Header buttonLeft='profile' />
      <Header buttonLeft='login' />
      <Header buttonLeft='back' />
      <Header buttonLeft='back' />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, tenetur
      necessitatibus ratione iste omnis numquam unde? Magnam, illum! Quasi eum
      magnam deleniti cum officiis ipsum a voluptatibus ratione aliquam
      exercitationem.
    </div>
  );
}

export default App;
