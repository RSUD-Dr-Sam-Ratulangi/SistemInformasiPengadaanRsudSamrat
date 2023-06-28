import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../assets/css/notificationpages.css";

const NotificationPages = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    getNotifications();
  }, []);

  function handleCardOnClick(notification) {
    const orderId = notification.message.split(",")[0].trim();
    navigate("/orders", {state: (isNaN(orderId)) ? null : orderId});
  }

  function getNotifications() {
    try {
      axios
        .get(`http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/${id}`)
        .then((res) => {setNotifications(res.data); console.log('res.data', res.data)});
    } catch (e) {
      console.log("failed to get notifications. ", e);
    }
  }

  return (
    <div id="notifications-page">
      {notifications.length === 0 ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="cards-container">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-card"
              onClick={() => handleCardOnClick(notification)}
            >
              <div className="title">{notification.notificationStatus}</div>
              <div className="text">{notification.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPages;
