
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Xử lý logic đăng nhập ở đây, ví dụ như gửi thông tin đến API
//     try {
//       const response = await fetch('http://localhost:3000/users?email=' + email + '&password=' + password);
//       const data = await response.json();

//       if (data.length > 0) {
//         // Đăng nhập thành công
//         localStorage.setItem('loggedIn', 'true');
//         navigate('/products');
//       } else {
//         console.error('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <h1>Đăng nhập</h1>
//       <Form onSubmit={handleLogin}>
//         <Row className="mb-3">
//           <Col>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Nhập email"
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col>
//             <Form.Group controlId="formPassword">
//               <Form.Label>Mật khẩu</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Nhập mật khẩu"
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button variant="primary" type="submit">
//           Đăng nhập
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users?email=' + email + '&password=' + password);
      const data = await response.json();

      if (data.length > 0) {
        // Đăng nhập thành công
        localStorage.setItem('loggedIn', 'true');
        setSuccess('Đăng nhập thành công!');
        setError(null);
        setTimeout(() => {
          navigate('/products');
        }, 2000); // Chuyển hướng sau 2 giây
      } else {
        setError('Thông tin đăng nhập không chính xác.');
        setSuccess(null);
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi đăng nhập.');
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Đăng nhập</h1>
      <Form onSubmit={handleLogin}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
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
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
