import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignIn, faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Tambahkan impor untuk faBell
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../config/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "../assets/navigation.css";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [notificationCount, setNotificationCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const handleProfileClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon profil diklik
  };

  const handleLogoutClick = () => {
    // Tambahkan fungsi yang ingin dilakukan saat ikon logout diklik
    dispatch(logout());
    console.log("Berhasil Logout");
    navigate("/signIn");
  };

  const isSignInPage = location.pathname === "/signIn";

  return (
    <nav>
      {isSignInPage ? null : (
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          {isLoggedIn && (
            <div>
              <li>
                <Link to="/vendor">Request Products</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </div>
          )}
        </ul>
      )}
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
                  <span className="notification-count">{notificationCount}</span>
                )}
              </Link>
              <Link
                to="/profile"
                className="profile-icon"
                onClick={handleProfileClick}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <Link to="/signIn" className="logout-icon" onClick={handleLogoutClick}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Link>
            </>
          ) : (
            <Link to="/signIn" className="logout-icon">
              <FontAwesomeIcon icon={faSignIn} />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
