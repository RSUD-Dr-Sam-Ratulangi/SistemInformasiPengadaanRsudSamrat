import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MdNotifications,
  MdPerson,
  MdLogout,
  MdClose,
  MdMenu,
} from "react-icons/md";
import "../assets/css/tabsnav.css";
import logo from "../assets/images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../config/auth/authSlice";
import { updateNotifications } from "../config/notification/notificationSlice";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [comingSoonToolTip, setComingSoonToolTip] = useState("");
  const [comingSoonToolTipPosition, setComingSoonToolTipPosition] = useState({
    top: 0,
    left: 0,
  });

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

  const handleComingSoonMouseOnEnter = (e) => {
    const { pageX, pageY } = e;
    setComingSoonToolTip("Coming soon");
    setComingSoonToolTipPosition({ top: pageY, left: pageX });
  };

  const handleComingSoonMouseOnLeave = () => {
    setComingSoonToolTip("");
    setComingSoonToolTipPosition({ top: 0, left: 0 });
  };

  const isSignInPage = location.pathname === "/signIn";

  useEffect(() => {
    getNotificationsCountFromBackEnd();

    const handleScroll = () => {
      const sticky = window.pageYOffset > 0;
      setIsSticky(sticky);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getNotificationsCount();
  }, [notifications]);

  function getNotificationsCountFromBackEnd() {
    try {
      axios
        // .get(`http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/${id}`)
        .get(`http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/2`)
        .then((res) => {
          const newNotificationCount = res.data.reduce(
            (count, notification) => {
              if (notification.notificationStatus === "UNREAD")
                return count + 1;
              return count;
            },
            0
          );

          setNotificationsCount(newNotificationCount);
          dispatch(updateNotifications(res.data));
        });
    } catch (e) {
      console.log("failed to get notifications. ", e);
    }
  }

  function getNotificationsCount() {
    const newNotificationsCount = notifications.reduce(
      (count, notification) => {
        if (notification.notificationStatus === "UNREAD") return count + 1;
        return count;
      },
      0
    );

    setNotificationsCount(newNotificationsCount);
  }

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

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
          onMouseEnter={
            name === "Request" || name === "Payments"
              ? (e) => handleComingSoonMouseOnEnter(e)
              : null
          }
          onMouseLeave={
            name === "Request" || name === "Payments"
              ? handleComingSoonMouseOnLeave
              : null
          }
        >
          <span
            className="items-center justify-center d-flex"
            style={{ fontSize: "22px" }}
          >
            {name}
          </span>
        </Link>
      </li>
    );
  }

  if (isSignInPage) {
    return null;
  }

  return (
    <div>
      <div className="hidden lg:flex items-center justify-between w-full p-2 border-b border-slate-200">
        <div className="flex items-center justify-start gap-2">
          <img src={logo} alt="Logo" className="w-8" />
          <div className="flex flex-col text-dark">
            <span className="fw-bold">Smart Samrat Procurement</span>
            <span className="text-[#525252] text-xs">
              RSUD DR SAM RATULANGI TONDANO
            </span>
          </div>
        </div>

        <ul className="flex items-center justify-center gap-3 m-0 text-lg">
          {navLink("Home", "")}
          {navLink("Request", "vendor")}
          {navLink("Products", "products")}
          {navLink("Orders", "orders")}
          {navLink("Vendor", "vendors")}
          {navLink("Payments", "payments")}
        </ul>

        {comingSoonToolTip && (
          <div
            style={{
              position: "fixed",
              top: comingSoonToolTipPosition.top + "px",
              left: comingSoonToolTipPosition.left + "px",
              background: "#ccc",
              padding: "5px",
              borderRadius: "3px",
            }}
          >
            {comingSoonToolTip}
          </div>
        )}

        <div className="flex items-center justify-center space-x-2">
          <ul className="flex items-center justify-center gap-2 m-0">
            <li>
              <Link
                to="/notifications"
                className="flex flex-row p-0 no-underline text-primary-1"
                onClick={handleNotificationClick}
              >
                <MdNotifications className="text-2xl" />
                {notificationsCount > 0 && (
                  <span className="no-underline ">{notificationsCount}</span>
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

      <div className="lg:hidden ">
        <div className="flex items-center justify-between w-full p-2 border-b border-slate-200">
          <div className="flex items-center justify-start gap-2">
            <img src={logo} alt="Logo" className="w-8" />
            <div className="flex flex-col text-dark">
              <span className="fw-bold">Smart Samrat Procurement</span>
              <span className="text-[#525252] text-xs">
                RSUD DR SAM RATULANGI TONDANO
              </span>
            </div>
          </div>

          <button
            className="btn btn-ghost text-primary-1 focus:outline-none lg:hidden"
            onClick={handleMenuToggle}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <MdClose className="text-2xl" />
              ) : (
                <MdMenu className="text-2xl" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <ul className="flex flex-col gap-3 px-4 py-2 bg-slate-200 border border-b border-sla">
            {navLink("Home", "")}
            {navLink("Request", "vendor")}
            {navLink("Products", "products")}
            {navLink("Orders", "orders")}
            {navLink("Vendor", "vendor")}
            {navLink("Payments", "payments")}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
