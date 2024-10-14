import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./slices/modalSlice";
import { RootState } from "./app/store";
import Modal from "./components/common/Modal/Modal";

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
import SettingsProfile from "./pages/Settings/SettingsProfile";
import SettingsPassword from "./pages/Settings/SettingsPassword";
import ComponentTest from "./pages/ComponentTest/ComponentTest";
import useUser from "./hooks/useUser";

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
  useUser();
  useEffect(() => {
    // getDocs();
  }, []);

  // Modal 팝업
  const dispatch = useDispatch();
  const { isOpen, title, description, buttons } = useSelector(
    (state: RootState) => state.modal
  );
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
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
          <Route path='/settings-profile' element={<SettingsProfile />} />
          <Route path='/settings-password' element={<SettingsPassword />} />
          <Route path='/component-test' element={<ComponentTest />} />
        </Routes>
      </Router>
      <Toaster />
      <Modal
        isOpen={isOpen}
        title={title}
        description={description}
        buttons={buttons}
        onClose={handleClose}
      />
    </>
  );
}

export default App;
