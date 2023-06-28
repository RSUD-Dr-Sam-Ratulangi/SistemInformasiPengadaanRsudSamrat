import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import "../assets/css/notificationpages.css";

const NotificationPages = () => {
  const [notifications, setNotifications] = useState([]);
  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    getNotifications();
  }, []);

  async function getNotifications() {
    try {
      axios
        .get(`http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/${id}`)
        .then((res) => {
          setNotifications(res.data);
          console.log(res.data);
        });
    } catch (e) {
      console.log("failed to get notifications. ", e);
    }
  }
};

export default NotificationPages;
