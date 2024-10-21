import React, { useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import RequestProvider from "./context/RequestContext";
import ToastPortal from "./components/common/ToastPortal/ToastPortal";

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
import useUser from "./hooks/useUser";

function AppHeader() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");
  const isReviewPage = location.pathname.includes("/review");
  const isSearchPage = location.pathname.includes("/search");

  if (isLoginPage || isSearchPage) {
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

  return (
    <>
      <RequestProvider>
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
          </Routes>
        </Router>
      </RequestProvider>
      <ToastPortal />
    </>
  );
}

export default App;
