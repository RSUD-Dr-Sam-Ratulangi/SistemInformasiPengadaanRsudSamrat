import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import "../assets/css/notificationpages.css";

const NotificationPages = () => {
  const [notifications, setNotifications] = useState([]);
  const id = useSelector((state) => state.auth.id);

  useEffect(() => {
    getNotifications();
  }, []);

  function getNotifications() {
    try {
      axios
        .get(`http://rsudsamrat.site:8990/api/v1/notifikasi/receiver/${id}`)
        .then((res) => setNotifications(res.data));
    } catch (e) {
      console.log("failed to get notifications. ", e);
    }
  }

  return (
    <Container>
      <h1 className="mt-4 mb-3">Notification Pages</h1>
      {notifications.length === 0 ? (
        <p>Loading notifications...</p>
      ) : (
        <Row>
          {notifications.map((notification) => (
            <Col key={notification.id} sm={6} md={4} lg={3}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{notification.notificationStatus}</Card.Title>
                  <Card.Text>{notification.message}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NotificationPages;
