import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error('Invalid email format');
    }

    if (!password || password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const { user, token } = res.data;

      if (user.role !== 'employee') {
        return toast.error('Access denied. Not an employee.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful');
      navigate('/employee-home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow border-0 rounded-4">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold text-primary">Employee Login</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password" }
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button 
                     variant='outline-secondary'
                     onClick={togglePasswordVisibility}
                     className='d-flex align-items-center border-left-0'
                     >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                     </Button>
                     </InputGroup>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Login
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/forget-password" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="text-center mt-2">
                    Create new Account{' '}
                    <Link to="/register" className="text-decoration-none fw-semibold">
                      Register here
                    </Link>
                  </div>

                  <div className="text-center mt-2">
                    Not an employee?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Employer Login
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmployeeLogin;
