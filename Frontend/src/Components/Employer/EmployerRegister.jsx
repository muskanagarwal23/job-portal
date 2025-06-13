import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EmployerRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 Validations
    if (name.trim().length < 3) {
      return toast.error('Name must be at least 3 characters long');
    }

    if (!emailRegex.test(email)) {
      return toast.error('Invalid email format');
    }

    if (!emailRegex.test(companyEmail)) {
      return toast.error('Invalid company email format');
    }

   

    if (password.length < 6) {
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

      toast.success('Registered successfully');
      navigate('/job-data');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };


  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow border-0 rounded-4">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold text-primary">Employer Registration</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Personal Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your personal email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Company Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your company email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
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
                      {showPassword ? <Visibility/> : <VisibilityOff/> }
                    </Button>

                    </InputGroup>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Register
                    </Button>
                  </div>

                  <p className="mt-3 text-center">
                    Already have a Account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>

                  <p className="mt-2 text-center">
                    Not a Employer?{" "}
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