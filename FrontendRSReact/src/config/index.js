import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Productpages from "../pages/Productpages";
import Dashboard from "../pages/Dashboard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Vendorpages from "../pages/Vendorpages";
import Orderpages from "../pages/Orderpages";
import Notificationpages from "../pages/Notificationpages";
import Profilpages from "../pages/Profilpages";
import SignInpages from "../pages/SignInpages";
import { useSelector } from "react-redux";

const Routers = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Navigation />
      <Routes>
        {!isLoggedIn ? (
          <Route path="/*" element={<Navigate to="/signIn" replace />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Productpages />} />
            <Route path="/vendor" element={<Vendorpages />} />
            <Route path="/orders" element={<Orderpages />} />
            <Route path="/notifications" element={<Notificationpages />} />
            <Route path="/profile" element={<Profilpages />} />
          </>
        )}
        <Route path="/signIn" element={<SignInpages />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routers;
