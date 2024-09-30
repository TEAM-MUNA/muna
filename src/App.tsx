import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Button from "./components/common/Button/Button";

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
        <div>
          <Header buttonLeft='profile' />
          <nav>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                gap: "4px",
              }}
            >
              <li>
                <Link to='/'>
                  <Button label='Main' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/login'>
                  <Button label='Login' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/signup'>
                  <Button label='Signup' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/search'>
                  <Button label='Search' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/concert-list'>
                  <Button label='ConcertList' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/concert-detail/1'>
                  <Button label='ConcertDetail' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/review-edit/1'>
                  <Button label='ReviewEdit' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/review-detail/1'>
                  <Button label='Review Detail' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/profile'>
                  <Button label='Profile' size='sm' color='default' />
                </Link>
              </li>
              <li>
                <Link to='/setting'>
                  <Button label='Setting' size='sm' color='default' />
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/search' element={<Search />} />
            <Route path='/concert-list' element={<ConcertList />} />
            <Route path='/concert-detail/:id' element={<ConcertDetail />} />
            <Route path='/review-edit/:id' element={<ReviewEdit />} />
            <Route path='/review-detail/:id' element={<ReviewDetail />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
