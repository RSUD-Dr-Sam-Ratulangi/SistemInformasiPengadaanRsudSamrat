import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdNotifications, MdPerson, MdLogout } from "react-icons/md";
import "../assets/css/tabsnav.css";
import logo from "../assets/images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../config/auth/authSlice";

const Navigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [notificationCount, setNotificationCount] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
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

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isSignInPage) {
    return null;
  }

  function navLink(name, linkTo) {
    return (
      <li className="flex items-center justify-center h-full">
        <Link
          to={`/${linkTo}`}
          className={`no-underline h-full flex items-center justify-center ${
            activeTab === `/${linkTo}`
              ? "font-bold text-primary-1 border-b-2 border-primary-1"
              : "text-dark"
          }`}
          onClick={() => handleTabClick(`/${linkTo}`)}
        >
          <span className="items-center justify-center d-flex">{name}</span>
        </Link>
      </li>
    );
  }

  return (
    <div className="relative flex items-center justify-between w-full p-2 border-b border-slate-200">
      <div className="flex items-center justify-start gap-2">
        <img src={logo} alt="Logo" className="w-8" />
        <div className="flex flex-col text-dark">
          <span className=" fw-bold">Smart Samrat Procurement</span>
          <span className="text-[#525252] text-xs">
            RSUD DR SAM RATULANGI TONDANO
          </span>
        </div>
      </div>

      <div className="absolute h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <ul className="flex items-center justify-center h-full gap-3 m-0 text-lg">
          {navLink("Home", "")}
          {navLink("Request", "vendor")}
          {navLink("Products", "products")}
          {navLink("Orders", "orders")}
          {navLink("Vendor", "vendors")}
          {navLink("Payments", "payments")}
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <ul className="flex items-center justify-center gap-2 m-0">
          <li>
            <Link
              to="/notifications"
              className="flex flex-row p-0 no-underline text-primary-1"
              onClick={handleNotificationClick}
            >
              <MdNotifications className="text-2xl" />
              {notificationCount > 0 && (
                <span className="no-underline ">{notificationCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="p-0 text-primary-1"
              onClick={handleProfileClick}
            >
              <MdPerson className="text-2xl" />
            </Link>
          </li>
          <li>
            <Link
              to="/signIn"
              className="p-0 text-primary-1"
              onClick={handleLogoutClick}
            >
              <MdLogout className="text-2xl" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
