
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Register/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Login from './Login/login';
import Products from './DetaiProduct/Products';



function App() {
  return (
    <Router>
      <Container className="mt-4">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
