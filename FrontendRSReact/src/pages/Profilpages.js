import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "../assets/css/profilpages.css";

export default function Profilepages() {
  const username = JSON.parse(localStorage.getItem('user')).username;
  const role = JSON.parse(localStorage.getItem('user')).role;



  return (
    <Container>
      <h1 className="mt-4 mb-3">Profil</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>{username}</Card.Title>
              <Card.Text>{role}</Card.Text>
            </Card.Body>
          </Card>
          <Button variant="primary">Ubah Profil</Button>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Informasi Pribadi</Card.Title>
              <Card.Text>
                <strong>Nama:</strong> John Doe<br />
                <strong>Email:</strong> johndoe@example.com<br />
                <strong>Alamat:</strong> Jalan Raya No. 123, Jakarta<br />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Alamat Pengiriman</Card.Title>
              <Card.Text>
                <strong>Alamat Utama:</strong> Jalan Raya No. 123, Jakarta<br />
                <strong>Alamat Lainnya:</strong> -<br />
              </Card.Text>
            </Card.Body>
          </Card>
          <Button variant="primary">Ubah Alamat</Button>
        </Col>
      </Row>
    </Container>
  );
};
