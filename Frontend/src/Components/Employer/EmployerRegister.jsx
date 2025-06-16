import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EmployerRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      toast.dismiss();
      return toast.error('Name must be at least 3 characters long');
    }

    if (!emailRegex.test(email)) {
      toast.dismiss();
      return toast.error('Invalid personal email format');
    }

    if (!emailRegex.test(companyEmail)) {
      toast.dismiss();
      return toast.error('Invalid company email format');
    }

    if (password.length < 6) {
      toast.dismiss();
      return toast.error('Password must be at least 6 characters');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        companyEmail,
        password,
        role: 'employer',
      });

      const { user, token } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.dismiss();
      toast.success('Registered successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card
              className="shadow-lg border-0 rounded-4"
              data-aos="fade-up"
              style={{ background: '#ffffff', backdropFilter: 'blur(5px)' }}
            >
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Employer Sign Up
                </h2>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Personal Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="e.g. john@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Company Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="e.g. hr@company.com"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      className="rounded-3"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-start-3"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        className="rounded-end-3 d-flex align-items-center"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="rounded-pill shadow-sm"
                    >
                      Register
                    </Button>
                  </div>

                  <p className="text-center mb-1">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Login
                    </Link>
                  </p>
                  <p className="text-center">
                    Not an employer?{' '}
                    <Link to="/employee-login" className="text-decoration-none">
                      Employee Login
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmployerRegister;
