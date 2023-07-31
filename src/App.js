import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import Auth from './Auth/Auth';
import Booking from './Bookings/Booking'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { adminActions, userActions } from "./store";
import UserProfile from "./profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";


function App() {

  const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  // if user or admin login then render the movies 
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login())
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login())
    }

  }, [])

  return (
    <div>
      <Header />
      <section>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />

          {!isUserLoggedIn && !isAdminLoggedIn &&
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          }

          {isUserLoggedIn && !isAdminLoggedIn &&
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          }

         {isAdminLoggedIn && !isUserLoggedIn &&
            <>
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </>}

        </Routes>
      </section>
    </div>
  );
}

export default App;
