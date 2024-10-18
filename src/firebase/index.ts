import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(); // app 인스턴스를 getAuth에 전달
export const db = getFirestore(app); // app 인스턴스를 getFirestore에 전달

// 에뮬레이터가 실행 중인 경우 연결
const connectToEmulators = async () => {
  // 현재 호스트가 localhost인지 확인하고, 에뮬레이터에 연결
  if (window.location.hostname === "localhost") {
    try {
      const response = await fetch("http://localhost:9099/"); // Auth 에뮬레이터 확인
      if (response.ok) {
        connectFirestoreEmulator(db, "localhost", 8080); // Firestore 에뮬레이터
        connectAuthEmulator(firebaseAuth, "http://localhost:9099"); // Auth 에뮬레이터
        console.log("Connected to emulators");
      }
    } catch {
      console.log("Emulator is not running");
    }
  }
};

// 연결 함수 호출
connectToEmulators();
