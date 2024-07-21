
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Gửi thông tin đăng ký đến API
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Chuyển hướng đến trang đăng nhập
        navigate('/login');
      } else {
        console.error('Error signing up:', await response.text());
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Đăng ký</h1>
      <Form onSubmit={handleSignup}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formUsername">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Đăng ký
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
