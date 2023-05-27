import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/notificationpages.css";

const NotificationPages = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulasi mendapatkan data notifikasi dari backend/API
    // Ganti kode berikut dengan panggilan API yang sesuai
    setTimeout(() => {
      const notificationsData = [
        { id: 1, message: "Notifikasi 1" },
        { id: 2, message: "Notifikasi 2" },
        { id: 3, message: "Notifikasi 3" }
      ];
      setNotifications(notificationsData);
    }, 1000);
  }, []);

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
                  <Card.Title>Order Status</Card.Title>
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