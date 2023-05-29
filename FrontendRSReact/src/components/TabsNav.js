import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/tabsnav.css";

const TabsNav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  return (
    <nav className="nav nav-pills nav-fill sticky">
      <Link
        to="/"
        className={`nav-link ${activeTab === "/" ? "active" : ""}`}
        onClick={() => handleTabClick("/")}
      >
        Dashboard
      </Link>
      <Link
        to="/vendor"
        className={`nav-link ${activeTab === "/vendor" ? "active" : ""}`}
        onClick={() => handleTabClick("/vendor")}
      >
        Analyst Dashboard
      </Link>
      <Link
        to="/products"
        className={`nav-link ${activeTab === "/products" ? "active" : ""}`}
        onClick={() => handleTabClick("/products")}
      >
        Products
      </Link>
      <Link
        to="/orders"
        className={`nav-link ${activeTab === "/orders" ? "active" : ""}`}
        onClick={() => handleTabClick("/orders")}
      >
        Orders
      </Link>
    </nav>
  );
};

export default TabsNav;
