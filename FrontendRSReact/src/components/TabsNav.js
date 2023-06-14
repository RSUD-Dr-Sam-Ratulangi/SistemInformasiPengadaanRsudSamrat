import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/tabsnav.css";

const TabsNav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ul className="nav nav-pills sticky">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${activeTab === "/" ? "active" : ""}`}
            onClick={() => handleTabClick("/")}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/vendor"
            className={`nav-link ${activeTab === "/vendor" ? "active" : ""}`}
            onClick={() => handleTabClick("/vendor")}
          >
            Request
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/products"
            className={`nav-link ${activeTab === "/products" ? "active" : ""}`}
            onClick={() => handleTabClick("/products")}
          >
            Products
          </Link>
        </li>
        <li className="nav-item dropdown">
          <button className="nav-link dropdown-toggle" onClick={toggleDropdown}>
            Orders
          </button>
          <div
            className={`dropdown-menu${isOpen ? " show" : ""}`}
            aria-labelledby="dropdownMenuButton"
            style={{ position: "fixed", right: "43%", top: "80px", transform: "translateX(50%)" }}
          >
            <Link
              to="/orders"
              className={`dropdown-item ${activeTab === "" ? "active" : ""}`}
              onClick={() => handleTabClick("/orders")}
            >
              PP
            </Link>
            <Link
              to="/orders"
              className={`dropdown-item ${activeTab === "" ? "active" : ""}`}
              onClick={() => handleTabClick("/orders")}
            >
              PPKOM
            </Link>
            <Link
              to="/orders"
              className={`dropdown-item ${activeTab === "" ? "active" : ""}`}
              onClick={() => handleTabClick("/orders")}
            >
              PANPEN
            </Link>
            <Link
              to="/orders"
              className={`dropdown-item ${activeTab === "" ? "active" : ""}`}
              onClick={() => handleTabClick("/orders")}
            >
              KEUANGAN
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <Link
            to="/Vendors"
            className={`nav-link ${activeTab === "/Vendors" ? "active" : ""}`}
            onClick={() => handleTabClick("/Vendors")}
          >
            Vendors
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Payments"
            className={`nav-link ${activeTab === "/Payments" ? "active" : ""}`}
            onClick={() => handleTabClick("/Payments")}
          >
            Payment
          </Link>
        </li>
      </ul>

      <div className="content">{/* Konten halaman utama */}</div>
    </div>
  );
};

export default TabsNav;
