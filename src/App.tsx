import React, { useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Header from "./components/layout/Header/Header";
import Search from "./pages/Search/Search";
import ConcertList from "./pages/ConcertList/ConcertList";
import ConcertDetail from "./pages/ConcertDetail/ConcertDetail";
import ReviewEdit from "./pages/ReviewEdit/ReviewEdit";
import ReviewDetail from "./pages/ReviewDetail/ReviewDetail";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ComponentTest from "./pages/ComponentTest/ComponentTest";

function AppHeader() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  const isReviewPage = location.pathname.includes("/review");

  if (isLoginPage) {
    return <Header buttonLeft='back' />;
  }
  if (!isReviewPage) {
    return <Header buttonLeft='profile' />;
  }
  return null;
}

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
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search' element={<Search />} />
          <Route path='/concert' element={<ConcertList />} />
          <Route path='/concert/:id' element={<ConcertDetail />} />
          <Route path='/review/edit/:id' element={<ReviewEdit />} />
          <Route path='/review/:id' element={<ReviewDetail />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/component-test' element={<ComponentTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
