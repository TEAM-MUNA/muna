import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import LoginForm from "./components/LoginForm";
import Button from "./components/common/Button/Button";
import Input from "./components/common/Input/Input";
import UserIcon from "./assets/svg/userIcon";
import Title from "./components/common/Title/Title";

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
      <Button label='버튼' color='primary_line' size='sm' fullWidth />
      <Button icon={<UserIcon />} />
      <Button />
      <Input label='이메일' placeholder='이메일 주소를 입력해 주세요.' />

      <Input
        label='비밀번호'
        type='password'
        placeholder='현재 비밀번호를 입력해 주세요.'
        error
        message='비밀번호가 일치하지 않습니다.'
      />
      <Title label='기록하기' buttonLeft='back' />
    </div>
  );
}

export default App;
