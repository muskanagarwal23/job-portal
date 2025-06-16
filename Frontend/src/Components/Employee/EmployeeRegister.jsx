import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const validate = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!phone) {
      setError("Phone number is required");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      const payload = {
        name: email.split("@")[0],
        email,
        password,
        phone,
        role: "employee",
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        payload
      );

      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registration successful");
      navigate("/employee-home");
    } catch (err) {
      toast.dismiss();
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
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
            <Card
              className="shadow-lg border-0 rounded-4"
              data-aos="fade-up"
              style={{ background: "#ffffff", backdropFilter: "blur(5px)" }}
            >
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 fw-bold text-primary">
                  Employee Register
                </h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        className="d-flex align-items-center border-left-0"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Register
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <Link
                      to="/forget-password"
                      className="text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="text-center mt-2">
                    Already a user?{" "}
                    <Link
                      to="/employee-login"
                      className="text-decoration-none "
                    >
                      Employee Login
                    </Link>
                  </div>

                  <div className="text-center mt-2">
                    Not an employee?{" "}
                    <Link to="/login" className="text-decoration-none ">
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

export default EmployeeRegister;
