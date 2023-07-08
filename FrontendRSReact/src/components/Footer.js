import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isSignInPage = location.pathname === "/signIn";
  if (isSignInPage) {
    return null;
  }

  function navLink(name, linkTo) {
    return (
      <Link
        to={`/${linkTo}`}
        className="flex items-center justify-center h-full text-[#D9D9D9] no-underline"
      >
        <span className="items-center justify-center d-flex">{name}</span>
      </Link>
    );
  }

  return (
    <div className="bg-[#000E0A] flex justify-center items-center flex-col py-4 mt-5 w-full">
      <div>
        <ul className="flex gap-2">
          <li>{navLink("Dashboard", "")}</li>
          <li>{navLink("Request", "vendor")}</li>
          <li>{navLink("Products", "products")}</li>
          <li>{navLink("Orders", "orders")}</li>
          <li>{navLink("Vendor", "vendors")}</li>
          <li>{navLink("Payments", "payments")}</li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center mb-3 text-white">
        <span className="font-semibold">Smart Samrat Procurement</span>
        <span>
          Layanan Infrmasi Pengadaan Barang & Jasa Rumah Sakit Umum DR Sam
          Ratulangi Tondano
        </span>
      </div>
      <div className="flex gap-5 mb-3">
        <a
          href="https://instagram.com/rsud_samrat_tondano?igshid=OGQ5ZDc2ODk2ZA=="
          className="text-white"
        >
          <FaInstagram className="scale-125" />
        </a>
        <a
          href="https://www.facebook.com/PageOfficialRSUDSamRatulangi?mibextid=LQQJ4d"
          className="text-white"
        >
          <FaFacebook className="scale-125" />
        </a>
        <a href="https://rsudsamrat.site/epasien/" className="text-white">
          <FaGlobe className="scale-125" />
        </a>
        <a href="mailto:samratulangirsud@gmail.com" className="text-white">
          <FaEnvelope className="scale-125" />
        </a>
        <a href="https://goo.gl/maps/dcuTHTNYtmFDfkxA7" className="text-white">
          <FaMapMarkerAlt className="scale-125" />
        </a>
      </div>
      <hr />
        <div className="w-full pt-3 pb-3 border-t">
          <p className="text-white text-center"><b>About us</b></p>
          <p className="text-white text-center mt-2">Pengembang:</p>
          <div className="opacity-40">
            <p className="text-white text-center">Victor Maukar</p>
            <p className="text-white text-center">Kennie Mandolang, S.T</p>
            <p className="text-white text-center">Zusana Korompis, S.Kom, ACP</p>
            <p className="text-white text-center">Leonard Polandos, S.Kom, LDA</p>
            <p className="text-white text-center">Nariva Wagey, S.Kom, ACP</p>
            <p className="text-white text-center">Gilby Koloay, S.Kom</p>
            <p className="text-white text-center">Yehezkiel Ombuh</p>
          </div>
        </div>
      <hr />
      <div className="flex items-center justify-center w-full pt-3 border-t opacity-40">
        <p className="text-white">
          © 2023 UPTI RSUD DR SAM RATULANGI TONDANO. Hak Cipta Dilindungi
        </p>
      </div>
    </div>
  );
};

export default Footer;
