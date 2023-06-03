import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Footer.css";

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const activeTab = window.location.pathname;

  const handleTabClick = (tab) => {
    // Handle tab click logic here
  };

  return (
    <div className="footer">
      {isLoggedIn && (
        <div>
          <div className="footer-buttons">
            <Link
              to="/"
              className="btn btn-light"
              onClick={() => handleTabClick("/")}
            >
              Dashboard
            </Link>
            <Link
              to="/vendor"
              className="btn btn-light"
              onClick={() => handleTabClick("/vendor")}
            >
              Analyst Dashboard
            </Link>
            <Link
              to="/products"
              className="btn btn-light"
              onClick={() => handleTabClick("/products")}
            >
              Products
            </Link>
            <Link
              to="/orders"
              className="btn btn-light"
              onClick={() => handleTabClick("/orders")}
            >
              Orders
            </Link>
          </div>
        </div>
      )}
      <div className="footer-text1">
        <span className="footer-text-bold">Smart Samrat Procurement</span>
        <br />
        <span className="footer-text-small">
          Layanan Informasi Pengadaan Barang & Jasa Rumah Sakit Umum DR Sam
          Ratulangi Tondano
        </span>
      </div>
      <div className="footer-social-icons">
        <a href="https://instagram.com/rsud_samrat_tondano?igshid=OGQ5ZDc2ODk2ZA==">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/PageOfficialRSUDSamRatulangi?mibextid=LQQJ4d">
          <FaFacebook />
        </a>
        <a href="https://rsudsamrat.site/epasien/">
          <FaGlobe />
        </a>
        <a href="mailto:samratulangirsud@gmail.com">
          <FaEnvelope />
        </a>
        <a href="https://goo.gl/maps/dcuTHTNYtmFDfkxA7">
          <FaMapMarkerAlt />
        </a>
      </div>
      <div className="footer-text">
        © 2023 UPTI RSUD DR SAM RATULANGI TONDANO. Hak Cipta Dilindungi
      </div>
    </div>
  );
};

export default Footer;
