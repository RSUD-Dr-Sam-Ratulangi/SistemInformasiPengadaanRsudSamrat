import React from "react";
// import { Link } from 'react-router-dom';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import dashboardImage from "../assets/statistik.JPG";
import "../assets/navigation.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Ambil nilai isLoggedIn dari state Redux
  const username = useSelector((state) => state.auth.user?.username);
  return (
    <div className="dashboard">
      <Navigation />
      {isLoggedIn && (
        <div>
          <div className="dashboard-links">
            {/* <Link to="/products">Products</Link> */}
            {/* Hapus Link ke halaman Users */}
          </div>
          <h1>Selamat Datang , {username}</h1>
          <p>Statistik Analisis</p>
          <img src={dashboardImage} alt="Dashboard Statistik" />
          <div className="scrollbar-container">{/* Content goes here */}</div>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <p>Please Log in</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
