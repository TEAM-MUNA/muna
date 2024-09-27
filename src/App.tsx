import React, { useEffect } from "react";
import "./App.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import LoginForm from "./components/LoginForm";
import Counter from "./components/Counter";
import Button from "./components/common/Button";

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
      <Counter />
      <LoginForm />
      <Button />
    </div>
  );
}

export default App;
