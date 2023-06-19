import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignIn,
  faBell,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../config/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "../assets/css/navigation.css";
import TabsNav from "./TabsNav";
import logo from "../assets/images/logo.jpg";
import axios from "axios";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [notificationCount, setNotificationCount] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    // setNotificationCount(0);
  };

  const handleProfileClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon profil diklik
  };

  const handleLogoutClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon logout diklik
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    console.log("Berhasil Logout");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/signIn");
  };

  const isSignInPage = location.pathname === "/signIn";

  useEffect(() => {
    getNotificationsCount();

    const handleScroll = () => {
      const sticky = window.pageYOffset > 0;
      setIsSticky(sticky);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function getNotificationsCount() {
    try {
      axios
        .get("http://rsudsamrat.site:8990/api/v1/notifikasi")
        .then((res) => setNotificationCount(res.data.content.length));
    } catch (e) {
      console.log("failed to get notifications. ", e);
    }
  }

  if (isSignInPage) {
    return null;
  }

  return (
    <div>
      <nav className={isSticky ? "sticky" : ""}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <div className="logo-text">
            <span>Smart Samrat Procurement</span>
            <span>RSUD DR SAM RATULANGI TONDANO</span>
          </div>
        </div>

        {!isSignInPage && (
          <div className="navigation-icons">
            {isLoggedIn ? (
              <>
                <Link
                  to="/notifications"
                  className="notification-icon"
                  onClick={handleNotificationClick}
                >
                  <FontAwesomeIcon icon={faBell} />
                  {notificationCount > 0 && (
                    <span className="notification-count">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="profile-icon"
                  onClick={handleProfileClick}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <Link
                  to="/signIn"
                  className="logout-icon"
                  onClick={handleLogoutClick}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </Link>
              </>
            ) : (
              <Link to="/signIn" className="logout-icon">
                <FontAwesomeIcon icon={faSignIn} />
                Login
              </Link>
            )}
            <TabsNav />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
