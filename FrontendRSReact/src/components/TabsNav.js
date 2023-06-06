import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/tabsnav.css";


const TabsNav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <li className="nav-item">
          <Link
            to="/orders"
            className={`nav-link ${activeTab === "/orders" ? "active" : ""}`}
            onClick={() => handleTabClick("/orders")}
          >
            Orders
          </Link>
          <span className="coming-soon">Coming Soon</span>
        </li>
        <li className="nav-item">
          <Link
            to="/Vendors"
            className={`nav-link ${activeTab === "/Vendors" ? "active" : ""}`}
            onClick={() => handleTabClick("/Vendors")}
          >
            Vendors
          </Link>
          <span className="coming-soon">Coming Soon</span>
        </li>
        <li className="nav-item">
          <Link
            to="/Payments"
            className={`nav-link ${activeTab === "/Payments" ? "active" : ""}`}
            onClick={() => handleTabClick("/Payments")}
          >
            Payment
          </Link>
          <span className="coming-soon">Coming Soon</span>
        </li>
      </ul>

      <div className="content">
        {/* Konten halaman utama */}
      </div>
    </div>
  );
};

export default TabsNav;
